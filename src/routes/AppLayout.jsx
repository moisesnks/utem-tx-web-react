import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Loading from '../components/Loading';

const Button = ({ type, text, to }) => {
    // switch para definir las clases de los botones
    let classNames = '';
    switch (type) {
        case 'primary':
            classNames = 'bg-primary hover:bg-primary-dark dark:text-gray-900';
            break;
        case 'secondary':
            classNames = 'bg-secondary hover:bg-secondary-dark dark:text-white';
            break;
        case 'danger':
            classNames = 'bg-danger hover:bg-danger-dark dark:text-gray-900';
            break;
        default:
            classNames = 'bg-primary hover:bg-primary-dark dark:text-gray-900 ';
    }
    return (
        <Link to={to}>
            <button className={`rounded px-2 py-1 font-bold ${classNames}`}>
                {text}
            </button>
        </Link>
    );
}

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
        <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dark text-white' : 'bg-gray-200 text-black'}`}>
            <nav className="bg-gray-800 p-4 flex flex-wrap  items-center justify-between">
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
                            <Link to="/buy" className="text-white hover:text-primary block md:inline-block">Comprar Cripto</Link>
                        </li>
                        <li>
                            <Link to="/market" className="text-white hover:text-primary block md:inline-block">Mercados</Link>
                        </li>
                    </ul>
                </div>
                {/* Botones de inicio de sesión y registro */}
                <div className={`flex-col md:flex-row md:flex md:space-x-4 items-center w-full md:w-auto ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
                    {!isAuthenticated() ? (
                        <>
                            <Button type="secondary" text="Iniciar sesión" to="/login" />
                            <Button type="primary" text="Registrarse" to="/register" />
                        </>
                    ) : (
                        <>
                            <Button type="primary" text="Perfil" to="/profile" />
                            <button onClick={logout} className="rounded px-2 py-1 font-bold bg-danger hover:bg-danger-dark dark:text-gray-900">Cerrar sesión</button>
                        </>
                    )
                    }
                    <button onClick={handleClick} className="text-white">
                        <i className={`fas ${iconClass} text-xl w-8`}></i>
                    </button>
                    <button onClick={() => console.log('click')} className="text-white">
                        <i className="fas fa-file-arrow-down text-xl w-8"></i>
                    </button>
                </div>
            </nav>

            {isLoading ? (
                <Loading />
            ) : (
                <div className='flex flex-grow p-4 overflow-x-hidden'>
                    <Outlet />
                </div>
            )}
        </div>
    );
};

export default AppLayout;
