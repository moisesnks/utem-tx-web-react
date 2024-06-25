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

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedToken && storedUser) {
            // Si hay un token y usuario almacenados, establecer en el estado
            setToken(storedToken);
            setUser(storedUser);
        }
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (!storedToken || storedToken === 'undefined') {
            // Si no hay token almacenado o es 'undefined', limpiar el estado y el almacenamiento local
            setUser(null);
            setToken(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return;
        }

        // Realizar la solicitud para validar el token
        fetch('http://localhost:8081/validate-token', {
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
                // Actualizar el estado del usuario con la información obtenida del token validado
                const userFromToken = {
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
                // En caso de error al validar el token, limpiar el estado y el almacenamiento local
                setUser(null);
                setToken(null);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            });
    }, [token]);


    const login = async (formData) => {
        setLoading(true);
        setError(null);
        setMessage(null); // Nuevo estado para el mensaje del servidor
        try {
            const response = await fetch('http://localhost:8081/login', {
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
            setToken(newToken); // Almacenar el nuevo token en el estado

            // Obtener y almacenar el usuario desde la respuesta
            const userFromToken = {
                email: responseData.data.email,
                uid: responseData.data.uid,
                verified: responseData.data.emailVerified,
                role: responseData.data.role,
                photoURL: responseData.data.photoURL
            };
            setUser(userFromToken);
            localStorage.setItem('user', JSON.stringify(userFromToken));

            // Setear el mensaje de éxito
            setMessage("Inicio de sesión exitoso");

            setLoading(false);
            return true;
        } catch (error) {
            setLoading(false);
            setError(error.message);

            // Setear el mensaje de error desde el error capturado
            setMessage(error.message);

            console.error('Error:', error);
            return false;
        }
    };

    const register = async (formData) => {
        setLoading(true);
        setError(null);
        setMessage(null); // Nuevo estado para el mensaje del servidor
        try {
            const response = await fetch('http://localhost:8081/register', {
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

            // Obtener y almacenar el usuario desde la respuesta
            const userFromResponse = {
                email: data.data.email,
                uid: data.data.uid
            };
            setUser(userFromResponse);
            localStorage.setItem('user', JSON.stringify(userFromResponse));

            // Setear el mensaje del servidor en el estado
            setMessage(data.message);

            return {
                user: userFromResponse,
                message: data.message, // Incluir el mensaje del servidor en la respuesta
            };
        } catch (error) {
            setLoading(false);
            setError(error.message);
            setMessage(null); // Limpiar el mensaje en caso de error
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
            const response = await fetch('http://localhost:8081/verify-code', {
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


    const isAuthenticated = () => {
        return user && token ? true : false; // Revisar tanto el usuario como el token
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, verify, isAuthenticated, loading, error, message }}>
            {children}
        </AuthContext.Provider>
    );
};
