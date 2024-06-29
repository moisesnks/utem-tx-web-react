import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const server = 'http://localhost:8081';

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(storedUser);
        }
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (!storedToken || storedToken === 'undefined') {
            setUser(null);
            setToken(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return;
        }

        fetch(`${server}/validate-token`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${storedToken}`
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Token inválido');
                }
            })
            .then(data => {
                const userFromToken = {
                    displayName: data.data.displayName,
                    email: data.data.email,
                    uid: data.data.uid,
                    verified: data.data.emailVerified,
                    role: data.data.role,
                    photoURL: data.data.photoURL
                };
                setUser(userFromToken);
                localStorage.setItem('user', JSON.stringify(userFromToken));
            })
            .catch(error => {
                console.error('Error:', error);
                setUser(null);
                setToken(null);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            });
    }, [token, server]);

    const fetchUser = async () => {
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            const storedToken = localStorage.getItem('token');
            if (!storedToken) {
                throw new Error('No token found');
            }
            const response = await fetch(`${server}/validate-token`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Invalid token');
            }

            const data = await response.json();
            const userFromToken = {
                displayName: data.data.displayName,
                email: data.data.email,
                uid: data.data.uid,
                verified: data.data.emailVerified,
                role: data.data.role,
                photoURL: data.data.photoURL
            };
            setUser(userFromToken);
            localStorage.setItem('user', JSON.stringify(userFromToken));
            console.log("Se ha actualizado el usuario", userFromToken);
        } catch (error) {
            console.error('Error:', error);
            setUser(null);
            setToken(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    };


    const login = async (formData) => {
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            const response = await fetch(`${server}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || `Error: ${response.statusText}`);
            }

            const responseData = await response.json();
            const newToken = responseData.data.token;

            localStorage.setItem('token', newToken);
            setToken(newToken);

            const userFromToken = {
                displayName: responseData.data.displayName,
                email: responseData.data.email,
                uid: responseData.data.uid,
                verified: responseData.data.emailVerified,
                role: responseData.data.role,
                photoURL: responseData.data.photoURL
            };
            setUser(userFromToken);
            localStorage.setItem('user', JSON.stringify(userFromToken));

            setMessage("Inicio de sesión exitoso");

            setLoading(false);
            return true;
        } catch (error) {
            setLoading(false);
            setError(error.message);
            setMessage(error.message);
            console.error('Error:', error);
            return false;
        }
    };

    const register = async (formData) => {
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            const response = await fetch(`${server}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            setLoading(false);

            if (!response.ok) {
                throw new Error(data.message || `Error: ${response.statusText}`);
            }

            const userFromResponse = {
                email: data.data.email,
                uid: data.data.uid
            };
            setUser(userFromResponse);
            localStorage.setItem('user', JSON.stringify(userFromResponse));

            setMessage(data.message);

            return {
                user: userFromResponse,
                message: data.message,
            };
        } catch (error) {
            setLoading(false);
            setError(error.message);
            setMessage(null);
            console.error('Error:', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    const verify = async (uid, verificationCode) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${server}/verify-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uid, verificationCode }),
            });

            const data = await response.json();
            setLoading(false);

            if (!response.ok) {
                throw new Error(data.message || `Error: ${response.statusText}`);
            }

            return data.message;
        } catch (error) {
            setLoading(false);
            setError(error.message);
            console.error('Error:', error);
            throw error;
        }
    };

    const updateUserProfile = async (profileData) => {
        setLoading(true);
        setError(null);
        try {
            let endpoint = '';
            let method = '';
            let body;

            if (profileData.displayName || profileData.rut || profileData.birthdate) {
                endpoint = `${server}/update`;
                method = 'PATCH';
                body = JSON.stringify(profileData);
            } else if (profileData.photoURL) {
                endpoint = `${server}/upload-photo`;
                method = 'POST';
                body = profileData.photoURL;
            } else {
                throw new Error('No valid profile data provided');
            }

            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...(method === 'PATCH' && { 'Content-Type': 'application/json' })
                },
                body: body,
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || `Error: ${response.statusText}`);
            }

            const responseData = await response.json();
            setMessage(responseData.message);
            await fetchUser();
            return true;
        } catch (error) {
            setLoading(false);
            setError(error.message);
            console.error('Error:', error);
            return false;
        }
    };


    const changePassword = async (newPassword) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${server}/change-password`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword }),
            });

            const data = await response.json();
            setLoading(false);

            if (!response.ok) {
                throw new Error(data.message || `Error: ${response.statusText}`);
            }

            return data.message;
        } catch (error) {
            setLoading(false);
            setError(error.message);
            console.error('Error:', error);
            throw error;
        }
    };

    const forgotPassword = async (email) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${server}/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            setLoading(false);

            if (!response.ok) {
                throw new Error(data.message || `Error: ${response.statusText}`);
            }

            return data.message;
        } catch (error) {
            setLoading(false);
            setError(error.message);
            console.error('Error:', error);
            throw error;
        }
    };

    const resendCode = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${server}/resend-code`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            setLoading(false);

            if (!response.ok) {
                throw new Error(data.message || `Error: ${response.statusText}`);
            }

            return data.message;
        } catch (error) {
            setLoading(false);
            setError(error.message);
            console.error('Error:', error);
            throw error;
        }
    };

    const isAuthenticated = () => {
        return user && token ? true : false;
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            register,
            logout,
            verify,
            isAuthenticated,
            updateUserProfile,
            changePassword,
            forgotPassword,
            fetchUser,
            resendCode,
            loading,
            error,
            message
        }}>
            {children}
        </AuthContext.Provider>
    );
};
