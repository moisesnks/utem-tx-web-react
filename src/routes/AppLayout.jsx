import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Loading from '../components/Loading';
import { useMediaQuery } from "@utils/helpers";


const AppLayout = () => {
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';
    const { isAuthenticated, logout, message, error } = useAuth();

    // Estado para el tema
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // Estado para controlar el menú móvil
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isMobile = useMediaQuery('(max-width: 768px)');

    useEffect(() => {
        if (!isMobile) {
            setIsMenuOpen(false);
        } else {
            setIsMenuOpen(true);
        }
    }, [isMobile]);


    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    function handleClick() {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    let iconClass = theme === 'dark' ? 'fa-sun' : 'fa-moon';

    console.log('Mensaje:', message);
    console.log('Error:', error);


    return (
        <div className={`flex-grow min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light-dark text-black'} `}>
            <nav className="dark:bg-secondary bg-gray-300 p-4 flex flex-wrap  items-center gap-8 justify-between">
                {/* Wrapper del logo y los links  */}
                <div className="flex-col md:flex-row md:flex gap-md items-center w-full md:w-auto">
                    {/* Logo de UtemTX */}
                    <div className="flex justify-between w-full">
                        <Link to="/">
                            <img src="/logo192.svg" alt="Logo" className='cursor-pointer' />
                        </Link>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white md:hidden">
                            <i className="fas fa-bars text-xl"></i>
                        </button>
                    </div>
                </div>

                {/* Botones de inicio de sesión y registro */}
                <div className={`flex-grow flex gap-2 flex ${isMenuOpen ? ' flex-col hidden' : 'flex-col md:flex-row items-center justify-between'} `}>
                    {/* Links */}
                    <ul className={` w-full flex gap-2 ${isMenuOpen ? ' flex-col mb-8' : 'flex-col md:flex-row'}`}>
                        <li>
                            <Link to="/buy"
                                className="px-2 py-1  rounded-lg font-bold hover:text-primary-light dark:hover:text-primary block md:inline-block bg-zinc-200 dark:bg-gray-800 dark:text-gray-200"
                            >
                                Comprar Cripto
                            </Link>
                        </li>
                        <li>
                            <Link to="/market"
                                className="px-2 py-1  rounded-lg font-bold hover:text-primary-light dark:hover:text-primary block md:inline-block bg-zinc-200 dark:bg-gray-800 dark:text-gray-200"
                            >Mercados</Link>
                        </li>
                    </ul>

                    <div className={`flex gap-4 flex-col md:flex-row items-center ${isMobile ? 'w-max' : 'w-auto'}`}>

                        {!isAuthenticated() ? (
                            <div className="w-full flex gap-2 items-center">
                                <Link
                                    to="/login"
                                    className={`${isMobile ? 'w-full' : 'w-auto'} flex flex-row gap-2 items-center rounded text-left px-2 py-1 font-bold bg-primary-light hover:bg-primary-lighthover dark:hover:opacity-75 dark:bg-primary dark:bg-primary-lighthover dark:text-gray-900`}
                                >
                                    <i className="fas fa-sign-in-alt"></i>
                                    <span className="inline-block">Login</span>
                                </Link>
                                <Link
                                    to="/register"
                                    className={`${isMobile ? 'w-full' : 'w-auto'} flex flex-row gap-2 items-center rounded text-left px-2 py-1 font-bold bg-secondary-light hover:bg-secondary-lighthover dark:hover:opacity-75 dark:bg-secondary dark:bg-secondary-lighthover dark:text-gray-900`}
                                >
                                    <i className="fas fa-user-plus"></i>
                                    <span className="inline-block">Registrarse</span>
                                </Link>
                            </div>
                        ) : (
                            <div className="w-full flex gap-2 items-center">
                                <Link
                                    to="/profile"
                                    className={`${isMobile ? 'w-full' : 'w-auto'} flex flex-row gap-2 items-center rounded text-left px-2 py-1 font-bold bg-primary-light hover:bg-primary-lighthover dark:hover:opacity-75 dark:bg-primary dark:bg-primary-lighthover dark:text-gray-900`}
                                >
                                    < i className="fas fa-user" > </i>
                                    <span className="inline-block">Perfil</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    className={`${isMobile ? 'w-full' : 'w-auto'} flex flex-row gap-2 items-center rounded text-left px-2 py-1 font-bold bg-danger hover:bg-danger-dark dark:text-gray-900`}>
                                    <i className="fas fa-sign-out-alt"></i>
                                    <span className="inline-block">Salir</span>
                                </button>
                            </div>
                        )
                        }
                        <div className="flex gap-2">
                            <button onClick={handleClick}
                                className={`text-left px-2 py-1 bg-zinc-200 dark:bg-gray-800 dark:text-gray-200 rounded-lg font-bold hover:text-primary-light dark:hover:text-primary ${isMenuOpen ? 'mt-8' : ''}`}
                            >
                                <span className={`lg:hidden {isMenuOpen ? 'hidden' : 'block'}`}>
                                    Cambiar tema
                                </span>
                                <i className={`mx-2 px-2 py-1 bg-zinc-300 dark:bg-gray-800 dark:text-gray-200 rounded-lg fas ${iconClass} text-xl w-8`}></i>
                            </button>
                            <button onClick={() => console.log('click')}
                                className={`text-left px-2 py-1 bg-zinc-200 dark:bg-gray-800 dark:text-gray-200 rounded-lg font-bold hover:text-primary-light dark:hover:text-primary ${isMenuOpen ? '' : ''}`}
                            >
                                <span className={`lg:hidden {isMenuOpen ? 'hidden' : 'block'}`}>
                                    Descargar App
                                </span>
                                <i className="mx-2 px-2 py-1 bg-zinc-300 dark:bg-gray-800 dark:text-gray-200 rounded-lg fas fa-file-arrow-down text-xl w-8"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {isLoading ? (
                <Loading />
            ) : (

                <div className="flex flex-col gap-2">
                    <div className='min-h-screen flex flex-col overflow-x-hidden relative'>
                        <Outlet />
                    </div>
                    <footer className="w-full footer flex flex-row justify-center items-center bg-gray-300 dark:bg-secondary p-4 gap-8">
                        <p>&copy; 2024 Utem TX. Todos los derechos reservados.</p>
                    </footer>
                </div>

            )}
        </div>
    );
};

export default AppLayout;
