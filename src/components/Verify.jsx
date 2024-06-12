import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Modal from './Modal.jsx';

const Verify = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { email: emailParam, uid: uidParam } = useParams();

    // Expresión regular para validar un correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailParam ? emailRegex.test(emailParam) : false;
    const isUidValid = uidParam ? uidParam.length > 0 : false;

    // Obtener valores de location.state o de los parámetros de la URL
    const email = location.state?.email || (isEmailValid ? emailParam : null);
    const uid = location.state?.uid || (isUidValid ? uidParam : null);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = e.target.verificationCode.value;
        console.log(verificationCode);
        // Aquí iría la lógica para enviar el formulario
        // Redirigir al usuario a la página de inicio
        await verifyCode(verificationCode);


    }

    // función para hacer la solicitud al backend para que verifique el código de verificación
    const verifyCode = async (verificationCode) => {
        // método post que requiere en el body el uid y el código de verificación
        const response = await fetch("https://backend-test-sepia.vercel.app/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ uid, verificationCode }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        // response es un texto simple Usuario verificado correctamente
        const data = await response.text();

        console.log("Verification successful", data);

        // Si todo salió ok, navegaremos a la siguiente vista: :/login
        // le pasamos en el state el email 
        navigate("/login", { state: { email } });


    };

    return (
        email && uid ? (
            <div className="bg-secondary h-fit p-4 rounded-2xl shadow-xl mx-auto my-8 w-96">
                <h1 className="text-3xl font-bold text-left pb-2">Verifica tu correo electrónico</h1>
                <p className="text-sm">Ingresa el código de verificación de 6 dígitos enviado a <a href={`mailto:${email}`} className="text-primary"> {email} </a>. El código es válido durante 30 minutos.</p>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <label htmlFor="verificationCode" className="text-left font-bold text-sm">Código de verificación</label>
                    <div className="relative flex border border-gray-600 rounded-lg">
                        <input
                            autoComplete="off"
                            type="text"
                            id="verificationCode"
                            className="relative p-2 pr-2 active:outline-none focus:outline-none bg-transparent"
                            maxLength={6}
                        />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-sm text-right text-primary cursor-pointer hover:opacity-75">
                            Reenviar código
                        </span>
                    </div>
                    <button type="submit" className="bg-primary hover:opacity-75 text-black rounded-lg p-2 font-bold">Verificar</button>
                    <span className="text-sm text-primary cursor-pointer hover:opacity-75" onClick={() => setModalIsOpen(true)}>¿No recibiste el código?</span>
                </form>
                <Modal isOpen={modalIsOpen} onClose={closeModal}>
                    <img src="/mail.svg" alt="Logo" className="mx-auto h-32 w-32" />
                    <h1 className="text-2xl font-bold mb-4">¿No recibiste el código de verificación por email?</h1>
                    <p className="mb-4">El código de verificación por email fue enviado a tu correo. Si no recibes el código después de varios intentos, prueba lo siguiente:</p>
                    <ol className="list-decimal pl-6 max-h-32 overflow-y-auto">
                        <li>Verifica si está en tu correo basura/spam.</li>
                        <li>Asegúrate de que tu dirección de correo electrónico sea
                            <a href={`mailto:${email}`} className="text-primary"> {email} </a>
                        </li>
                        <li>El mensaje puede retrasarse algunos minutos. Inténtalo de nuevo en 20 minutos.</li>
                        <li>Configura una lista blanca de direcciones de correo electrónico. Cómo configurar listas blancas de correo electrónico.</li>
                    </ol>
                </Modal>
            </div>
        ) : (
            <div className="bg-secondary h-fit p-4 rounded-2xl shadow-xl mx-auto my-8 w-96">
                <h1 className="text-3xl font-bold text-left pb-2">No se ha proporcionado un correo electrónico y/o uid válido</h1>
                <p className="text-sm">No se ha proporcionado una dirección de correo electrónico y/o uid válido. Por favor, vuelve a la página de registro para proporcionar la información correcta.</p>
                <button onClick={() => navigate("/register")} className="bg-primary hover:opacity-75 text-black rounded-lg p-2 font-bold">Volver al registro</button>
            </div>
        )
    );
}

export default Verify;
