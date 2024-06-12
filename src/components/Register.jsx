import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Button = ({ type, text, onClick, imgUrl }) => {
    const classNames =
        type === "primary"
            ? "bg-primary hover:opacity-75 text-black"
            : "bg-secondary hover:opacity-75 text-white";

    return (
        <button
            onClick={onClick}
            className={`relative rounded-xl px-3 py-2 pl-10 font-bold ${classNames} border border-gray-600 flex items-center justify-center`}
        >
            {imgUrl && (
                <img src={imgUrl} alt="Icon" className="absolute left-4 w-6 h-6" />
            )}
            <span>{text}</span>
        </button>
    );
};

const Register = () => {
    const navigate = useNavigate();
    document.title = "Crear una cuenta gratis | Utem Trades";
    const [form, setForm] = useState({
        email: "",
        password: "", // Added password to the form state
    });

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [shouldSubmit, setShouldSubmit] = useState(false); // New state to trigger useEffect

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar el formulario solo después del envío
        const newErrors = {};
        if (!validateEmail(form.email)) {
            newErrors.email = "Correo electrónico no es válido";
        }

        // Mostrar los errores después del envío
        setErrors(newErrors);
        setIsSubmitted(true);

        // Si hay errores, no enviar el formulario
        if (Object.keys(newErrors).length > 0 || !termsAccepted) {
            return;
        }

        // Llamar a RegisterOnBackend();
        console.log(form);
        RegisterOnBackend(form);

    };

    const RegisterOnBackend = async (form) => {
        try {
            const response = await fetch("https://backend-test-sepia.vercel.app/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Registration successful", data);

            // Si todo salió ok, navegaremos a la siguiente vista: :/verify
            navigate("/verify", { state: { email: data.email, uid: data.uid } });

        } catch (error) {
            console.error("Error registering:", error);
        }
    };



    const handleCheckboxChange = (e) => {
        setTermsAccepted(e.target.checked);
        setIsSubmitDisabled(!e.target.checked);
    };

    const handleButtonClick = (e, provider) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(provider);
    };

    return (
        <div className="bg-secondary h-fit p-4 rounded-2xl shadow-xl mx-auto my-8 w-96">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <img src="/logo192.svg" alt="Logo" className="mx-auto" />
                <h1 className="text-3xl font-bold text-left pb-2">
                    Te damos la bienvenida a{" "}
                    <span className="text-primary"> Utem Trades </span>
                </h1>
                <label htmlFor="email" className="text-left font-bold text-sm">
                    Dirección de correo electrónico
                </label>
                <input
                    autoComplete="off"
                    type="email"
                    name="email"
                    id="email"
                    className="p-2 active:outline-none focus:outline-none rounded-lg bg-transparent border border-gray-600"
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
                    onChange={handleChange}
                />

                {isSubmitted && errors.email && (
                    <span className="text-red-500 text-sm">{errors.email}</span>
                )}
                <div className="flex gap-2">
                    <label
                        htmlFor="terms"
                        className="relative cursor-pointer flex items-center"
                    >
                        <input
                            type="checkbox"
                            id="terms"
                            name="terms"
                            className="w-10 h-10 cursor-pointer"
                            onChange={handleCheckboxChange}
                        />
                        <span className="ml-2 text-sm">
                            Al crear una cuenta, acepto los{" "}
                            <Link
                                to="/terms"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-primary text-sm"
                            >
                                Términos de servicio
                            </Link>{" "}
                            y la{" "}
                            <Link
                                to="/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-primary text-sm"
                            >
                                Política de privacidad
                            </Link>{" "}
                            de Utem Trades.
                        </span>
                    </label>
                </div>
                <button
                    type="submit"
                    className="bg-primary hover:opacity-75 text-black rounded-lg p-2 font-bold disabled:bg-disabled disabled:cursor-not-allowed"
                    disabled={isSubmitDisabled}
                >
                    Siguiente
                </button>
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">o</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                {/* Botones para continuar con Google o Github */}
                <Button
                    type="secondary"
                    text="Continuar con Google"
                    imgUrl="/google.svg"
                    onClick={(e) => handleButtonClick(e, "Google")}
                />
                <Button
                    type="secondary"
                    text="Continuar con Github"
                    imgUrl="/github.svg"
                    onClick={(e) => handleButtonClick(e, "Github")}
                />
            </form>
        </div>
    );
};

export default Register;
