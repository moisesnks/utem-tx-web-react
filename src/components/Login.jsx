import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Button = ({ type, text, onClick, imgUrl }) => {
    const classNames = type === 'primary'
        ? 'bg-primary hover:opacity-75 text-black'
        : 'bg-secondary hover:opacity-75 text-white';

    return (
        <button onClick={onClick} className={`relative rounded-xl px-3 py-2 pl-10 font-bold ${classNames} border border-gray-600 flex items-center justify-center`}>
            {imgUrl && <img src={imgUrl} alt="Icon" className="absolute left-4 w-6 h-6" />}
            <span>{text}</span>
        </button>
    );
}

const Login = () => {
    const navigate = useNavigate();
    document.title = 'Iniciar sesión | Utem Trades';
    const [form, setForm] = useState({
        email: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar el formulario solo después del envío
        const newErrors = {};
        if (!validateEmail(form.email)) {
            newErrors.email = 'Correo electrónico no es válido';
        }

        // Mostrar los errores después del envío
        setErrors(newErrors);
        setIsSubmitted(true);

        // Aquí iría la lógica para enviar el formulario
        console.log(form);

        // Redirigir al usuario a la página de verificación, con el email en el objeto de estado
        navigate('step2', { state: { email: form.email } });
    }


    const handleButtonClick = (e, provider) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(provider);
    }

    return (
        <div className="bg-secondary h-fit p-4 rounded-2xl shadow-xl mx-auto my-8 w-96">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <img src="/logo192.svg" alt="Logo" className="mx-auto" />
                <h1 className="text-3xl font-bold text-left pb-2"> Iniciar sesión</h1>
                <label htmlFor="email" className="text-left font-bold text-sm">
                    Dirección de correo electrónico
                </label>
                <input autoComplete="off" type="email" name="email" id="email" className="p-2 active:outline-none focus:outline-none rounded-lg bg-transparent border border-gray-600" onChange={handleChange} />
                {(isSubmitted && errors.email) && <span className="text-red-500 text-sm">{errors.email}</span>}
                <button type="submit" className="bg-primary hover:opacity-75 text-black rounded-lg p-2 font-bold">Iniciar sesión</button>
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">o</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                {/* Botones para continuar con Google o Github */}
                <Button type="secondary" text="Continuar con Google" imgUrl="/google.svg" onClick={(e) => handleButtonClick(e, 'Google')} />
                <Button type="secondary" text="Continuar con Github" imgUrl="/github.svg" onClick={(e) => handleButtonClick(e, 'Github')} />
            </form>
            <Link to="/register" className="text-primary hover:opacity-75 text-center block mt-4">¿No tienes una cuenta? Regístrate</Link>
        </div >
    );
}

export default Login;
