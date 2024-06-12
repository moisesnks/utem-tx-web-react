import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigation } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Button = ({ type, text, to }) => {
    const classNames = type === 'primary'
        ? 'bg-primary hover:opacity-75 text-black'
        : 'bg-secondary hover:opacity-75 text-white';

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
        <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dark text-white' : 'bg-white text-black'}`}>
            <nav className="bg-gray-800 p-4 flex flex-wrap justify-between items-center">
                <div className="flex justify-between w-full md:w-auto">
                    <Link to="/">
                        <img src="/logo192.svg" alt="Logo" className='cursor-pointer' />
                    </Link>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white md:hidden">
                        <i className="fas fa-bars text-xl"></i>
                    </button>
                </div>
                <ul className={`flex-col md:flex-row md:flex md:space-x-4 items-center w-full md:w-auto ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
                    <li>
                        <Link to="/buy" className="text-white hover:text-primary block md:inline-block">Comprar Cripto</Link>
                    </li>
                    <li>
                        <Link to="/market/overview" className="text-white hover:text-primary block md:inline-block">Mercados</Link>
                    </li>
                </ul>
                <div className={`flex-col md:flex-row md:flex md:space-x-4 items-center w-full md:w-auto ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
                    <Button type="secondary" text="Iniciar sesión" to="/login" />
                    <Button type="primary" text="Registrarse" to="/register" />
                    <button onClick={handleClick} className="text-white">
                        <i className={`fas ${iconClass} text-xl w-8`}></i>
                    </button>
                    <button onClick={() => console.log('click')} className="text-white">
                        <i className="fas fa-file-arrow-down text-xl w-8"></i>
                    </button>
                </div>
            </nav>

            {isLoading ? (
                <Spinner text="Cargando..." />
            ) : (
                <div className='flex flex-grow p-4'>
                    <Outlet />
                </div>
            )}
        </div>
    );
};

export default AppLayout;
