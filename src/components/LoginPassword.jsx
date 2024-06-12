import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function hideEmail(email) {
    const [username, domain] = email.split('@');
    const hiddenUsername = username.slice(0, 2) + '*'.repeat(username.length - 2);
    return `${hiddenUsername}@${domain}`;
}

const LoginPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state;
    document.title = 'Iniciar sesión | Utem Trades';

    const [form, setForm] = useState({
        email: email,
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar si se muestra la contraseña
    const emailHidden = hideEmail(email);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Mostrar los errores después del envío
        setErrors({});
        setIsSubmitted(true);

        // Aquí iría la lógica para enviar el formulario
        console.log(form);

        // Redirigir al usuario a home
        navigate('/');
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="bg-secondary h-fit p-4 rounded-2xl shadow-xl mx-auto my-8 w-96">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <img src="/logo192.svg" alt="Logo" className="mx-auto" />
                <h1 className="text-3xl font-bold text-left pb-2"> Ingresa tu contraseña</h1>
                <span className='text-primary'> {emailHidden} </span>
                <label htmlFor="password" className="text-left font-bold text-sm">
                    Contraseña
                </label>
                <div className="relative border border-gray-600 rounded-lg flex items-center justify-between pr-4">
                    <input autoComplete="off" type={showPassword ? "text" : "password"} name="password" id="password" className="p-2 active:outline-none focus:outline-none  bg-transparent " onChange={handleChange} />
                    <i className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"} inset-y-0 right-0 flex items-center text-sm text-right text-primary cursor-pointer hover:opacity-75`} onClick={togglePasswordVisibility}></i>
                </div>
                {(isSubmitted && errors.email) && <span className="text-red-500 text-sm">{errors.email}</span>}
                <button type="submit" className="bg-primary hover:opacity-75 text-black rounded-lg p-2 font-bold">Iniciar sesión</button>

            </form>
            <Link to="/forgot-password" className="text-primary text-sm block text-center mt-4">¿Olvidaste tu contraseña?</Link>
        </div >
    );
}

export default LoginPassword;
