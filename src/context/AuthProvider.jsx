import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null); // Nuevo estado para almacenar el token
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken === 'undefined') {
            localStorage.removeItem('token');
        } else if (storedToken) {
            setToken(storedToken); // Almacenar el token en el estado
            fetch('https://backend-test-sepia.vercel.app/validateToken', {
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
                    setUser({ email: data.user.email, uid: data.user.uid, verified: data.user.emailVerified, role: data.user.role });
                })
                .catch(error => {
                    console.error('Error:', error);
                    setUser(null);
                    setToken(null);
                    localStorage.removeItem('token');
                });
        } else {
            setUser(null);
        }
    }, [token]);

    const login = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://backend-test-sepia.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || `Error: ${response.statusText}`);
            }

            const newToken = data.token;
            localStorage.setItem('token', newToken);
            setToken(newToken); // Almacenar el nuevo token en el estado
            setUser({ email: formData.email, uid: data.uid });
            setLoading(false);
            return true;
        } catch (error) {
            setLoading(false);
            setError(error.message);
            console.error('Error:', error);
            return false;
        }
    };

    const register = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://backend-test-sepia.vercel.app/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || `Error: ${response.statusText}`);
            }

            setUser({ email: data.email, uid: data.uid });
            setLoading(false);
            return {
                user: { email: data.email, uid: data.uid },
            }
        } catch (error) {
            setLoading(false);
            setError(error.message);
            console.error('Error:', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null); // Limpiar el token del estado
        setUser(null);
    };

    const verify = async (uid, verificationCode) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://backend-test-sepia.vercel.app/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uid, verificationCode }),
            });

            const data = await response.text();
            if (!response.ok) {
                throw new Error(data || `Error: ${response.statusText}`);
            }
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            setError(error.message);
            console.error('Error:', error);
            throw error;
        }
    };

    const isAuthenticated = () => {
        return user && token ? true : false; // Revisar tanto el usuario como el token
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, verify, isAuthenticated, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};
