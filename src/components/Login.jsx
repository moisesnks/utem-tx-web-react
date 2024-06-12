import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

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
    const location = useLocation();

    document.title = 'Iniciar sesión | Utem Trades';

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (location.state?.email) {
            setForm(prevForm => ({
                ...prevForm,
                email: location.state.email
            }));
        }
    }, [location.state?.email]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar el formulario solo después del envío
        const newErrors = {};
        if (!validateEmail(form.email)) {
            newErrors.email = 'Correo electrónico no es válido';
        }

        // Mostrar los errores después del envío
        setErrors(newErrors);
        setIsSubmitted(true);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        // Aquí iría la lógica para enviar el formulario
        const loginSuccessful = await loginOnBackend(form);
        if (loginSuccessful) {
            navigate('/', { state: { email: form.email } });
        } else {
            // Manejar errores de inicio de sesión aquí
        }
    }

    const loginOnBackend = async (form) => {
        console.log(form);
        try {
            const response = await fetch('https://backend-test-sepia.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (response.status === 200) {
                const data = await response.json();
                const token = data.token;

                localStorage.setItem('token', token);
                console.log(token);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };

    const handleButtonClick = (e, provider) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(provider);
    }

    return (
        <div className="bg-secondary h-fit p-4 rounded-2xl shadow-xl mx-auto my-8 w-96">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <img src="/logo192.svg" alt="Logo" className="mx-auto" />
                <h1 className="text-3xl font-bold text-left pb-2">Iniciar sesión</h1>
                <label htmlFor="email" className="text-left font-bold text-sm">
                    Dirección de correo electrónico
                </label>
                <input
                    autoComplete="off"
                    type="email"
                    name="email"
                    id="email"
                    className="p-2 active:outline-none focus:outline-none rounded-lg bg-transparent border border-gray-600"
                    value={form.email}
                    onChange={handleChange}
                />
                <label htmlFor="password" className="text-left font-bold text-sm">
                    Contraseña
                </label>
                <input
                    autoComplete="off"
                    type="password"
                    name="password"
                    id="password"
                    className="p-2 active:outline-none focus:outline-none rounded-lg bg-transparent border border-gray-600"
                    value={form.password}
                    onChange={handleChange}
                />
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
