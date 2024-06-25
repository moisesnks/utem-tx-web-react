import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import { useAuth } from '../../context/AuthProvider.jsx';
import Loading from '../../components/Loading.jsx';
import Snackbar from '../../components/Snackbar.jsx';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, loading, isAuthenticated, error, message } = useAuth(); // Obtener error y message desde el contexto
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/');
        }
    }, [isAuthenticated()]);

    document.title = 'Iniciar sesión | Utem Trades';

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false); // Estado para controlar la visibilidad del Snackbar
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Mensaje a mostrar en el Snackbar
    const [snackbarError, setSnackbarError] = useState(false); // Para determinar si el Snackbar es de error

    useEffect(() => {
        if (location.state?.email) {
            setForm(prevForm => ({
                ...prevForm,
                email: location.state.email
            }));
        }
    }, [location.state?.email]);

    useEffect(() => {
        if (error) {
            setSnackbarMessage(error);
            setSnackbarError(true);
            setSnackbarOpen(true);
        } else if (message) {
            setSnackbarMessage(message);
            setSnackbarError(false);
            setSnackbarOpen(true);
        } else {
            // reiniciar el estado del Snackbar
            setSnackbarMessage('');
            setSnackbarError(false);
            setSnackbarOpen(false);
        }
    }, [error, message]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginSuccessful = await login(form);
        if (loginSuccessful) {
            navigate('/', { state: { email: form.email } });
        } else {
        }
    }

    const handleButtonClick = (e, provider) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(provider);
    }

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    }

    const loadingContent = () => {
        return (
            <Loading text="Iniciando sesión" />
        )
    }

    const renderContent = () => {
        return (
            <>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <img src="/logo192.svg" alt="Logo" className="mx-auto" />
                    <h1 className="text-3xl font-bold text-left pb-2">Iniciar sesión</h1>
                    <div className="relative flex flex-grow w-full">
                        <label
                            htmlFor="email"
                            className="w-fit text-left font-bold text-sm absolute top-0 left-0 -mt-2 ml-2 bg-light dark:bg-secondary px-2 text-xs text-gray-700 dark:text-gray-300"
                        >
                            Correo electrónico
                        </label>
                        <input
                            autoComplete="off"
                            type="email"
                            name="email"
                            id="email"
                            className=" w-full p-2 active:outline-none focus:outline-none rounded-lg bg-transparent border border-gray-600"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="relative">
                        <label
                            htmlFor="password"
                            className="z-20 w-fit text-left font-bold text-sm absolute top-0 left-0 -mt-2 ml-2 bg-light dark:bg-secondary px-2 text-xs text-gray-700 dark:text-gray-300"
                        >
                            Contraseña
                        </label>
                        <input
                            autoComplete="off"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            className="relative w-full p-2 active:outline-none focus:outline-none rounded-lg bg-transparent border border-gray-600"
                            value={form.password}
                            onChange={handleChange}
                        />
                        <i className={`absolute top-1/2 transform -translate-y-1/2 right-0 mr-4 cursor-pointer fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                            onClick={() => setShowPassword(!showPassword)}
                        ></i>
                    </div>

                    <button type="submit" className="bg-orange-500 dark:bg-primary hover:opacity-75 text-black rounded-lg p-2 font-bold">Iniciar sesión</button>
                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-gray-500">o</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    {/* Botones para continuar con Google o Github */}
                    <Button type="secondary" text="Continuar con Google" imgUrl="/google.svg" onClick={(e) => handleButtonClick(e, 'Google')} />
                    <Button type="secondary" text="Continuar con Github" imgUrl="/github.svg" onClick={(e) => handleButtonClick(e, 'Github')} />
                </form>
                <Link to="/register" className="text-orange-500 font-bold dark:text-primary hover:opacity-75 text-center block mt-4">¿No tienes una cuenta? Regístrate</Link>
            </>
        )
    }

    return (
        <div className="bg-light dark:bg-secondary p-4 rounded-2xl shadow-xl mx-auto my-8 w-96 h-[40rem]">
            {loading ? loadingContent() : renderContent()}
            <Snackbar isOpen={snackbarOpen} message={snackbarMessage} isError={snackbarError} onClose={handleCloseSnackbar} />
        </div >
    );
}

export default Login;
