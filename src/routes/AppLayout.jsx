import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Loading from '../components/Loading';

const AppLayout = () => {
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';
    const { isAuthenticated, logout } = useAuth();

    // Estado para el tema
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // Estado para controlar el menú móvil
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    return (
        <div className={`flex-grow min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light-dark text-black'} `}>
            <nav className="dark:bg-secondary bg-gray-300 p-4 flex flex-wrap  items-center justify-between">
                {/* Wrapper del logo y los links  */}
                <div className="flex gap-md">
                    {/* Logo de UtemTX */}
                    <div className="flex justify-between w-full md:w-auto">
                        <Link to="/">
                            <img src="/logo192.svg" alt="Logo" className='cursor-pointer' />
                        </Link>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white md:hidden">
                            <i className="fas fa-bars text-xl"></i>
                        </button>
                    </div>
                    {/* Links */}
                    <ul className={`flex-col md:mx-4 md:flex-row md:flex md:space-x-4 items-center w-full md:w-auto ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
                        <li>
                            <Link to="/buy" className=" font-bold hover:text-primary-light dark:hover:text-primary block md:inline-block">Comprar Cripto</Link>
                        </li>
                        <li>
                            <Link to="/market" className=" font-bold hover:text-primary-light dark:hover:text-primary block md:inline-block">Mercados</Link>
                        </li>
                    </ul>
                </div>
                {/* Botones de inicio de sesión y registro */}
                <div className={`flex-col md:flex-row md:flex md:space-x-4 items-center w-full md:w-auto ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
                    {!isAuthenticated() ? (
                        <>
                            <Link
                                to="/login"
                                className="rounded px-2 py-1 font-bold bg-primary-light hover:bg-primary-lighthover dark:hover:opacity-75 dark:bg-primary dark:bg-primary-lighthover dark:text-gray-900"
                            >
                                <i className="fas fa-sign-in-alt"></i> Iniciar sesión
                            </Link>
                            <Link
                                to="/register"
                                className="rounded px-2 py-1 font-bold bg-secondary-light hover:bg-secondary-lighthover dark:hover:opacity-75 dark:bg-secondary dark:bg-secondary-lighthover dark:text-gray-900"
                            >
                                <i className="fas fa-user-plus"></i> Registrarse
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/profile"
                                className="rounded px-2 py-1 font-bold bg-primary-light hover:bg-primary-lighthover dark:hover:opacity-75 dark:bg-primary dark:bg-primary-lighthover dark:text-gray-900">
                                < i className="fas fa-user" > </i> Perfil
                            </Link>
                            <button
                                onClick={logout}
                                className="rounded px-2 py-1 font-bold bg-danger hover:bg-danger-dark dark:text-gray-900">
                                <i className="fas fa-sign-out-alt"></i> Cerrar sesión
                            </button>
                        </>
                    )
                    }
                    <button onClick={handleClick} className="dark:text-primary text-primary-light">
                        <i className={`fas ${iconClass} text-xl w-8`}></i>
                    </button>
                    <button onClick={() => console.log('click')} className="text-gray-500">
                        <i className="fas fa-file-arrow-down text-xl w-8"></i>
                    </button>
                </div>
            </nav>

            {isLoading ? (
                <Loading />
            ) : (
                <div className='min-h-screen flex flex-col flex-grow p-4 overflow-x-hidden relative'>
                    <div className="mb-12">
                        <Outlet />
                    </div>
                    <div className="absolute bottom-0 w-full footer flex flex-row justify-center items-center bg-gray-300 dark:bg-secondary  p-4 mx-[-1rem] gap-8" >
                        <p>&copy; 2024 Utem TX. Todos los derechos reservados.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppLayout;
