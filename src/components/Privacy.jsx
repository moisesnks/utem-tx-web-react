import React from 'react';

const Privacy = () => {
    document.title = 'Aviso de privacidad de Utem Trades';

    const dateUpdate = new Date("2024-06-03 06:59");

    return (
        <div>
            <h1 className="text-3xl font-bold text-left pb-2">Aviso de privacidad de <span className="text-primary">Utem Trades</span></h1>
            <h2>Última actualización: {dateUpdate.toLocaleDateString(
                'es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }
            )}</h2>
            <p className="mt-8 text-left text-lg">
                En este Aviso de privacidad se describe cómo se recopila, procesa
                y protege su información personal a través de los sitios webs
                y aplicaciones móviles de Utem Trades. "Utem Trades" se refiere al
                ecosistema compuesto por los sitios webs de Utem Trades
                (cuyos dominios incluyen, entre otros, <a className="text-primary" href="https://utemtrades.com">utemtrades.com</a>),
                las aplicaciones móviles de Utem, clientes, applets, y otras aplicaciones
                que se desarrollen para ofrecer los servicios de Utem Trades.
            </p>
            <ul className="mt-8 text-left text-lg list-decimal px-4">
                <li className="mb-4">
                    <h2 className="text-2xl font-bold text-left pt-4">Información que recopilamos</h2>
                    <p className="mt-4 text-left text-lg">
                        Recopilamos información personal sobre usted cuando se registra
                        para obtener una cuenta, utiliza los servicios de Utem Trades,
                        visita nuestros sitios webs o aplicaciones móviles, y cuando
                        interactúa con nosotros. Esta información incluye:
                    </p>
                    <table className="w-full mt-4">
                        <thead>
                            <tr>
                                <th className="px-2 py-4 bg-secondary border border-gray-600">¿Qué información personal recopila y procesa?</th>
                                <th className="px-2 py-4 bg-secondary border border-gray-600">¿Por qué Utem Trades procesa esta información?</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-600">
                                    <ul className="list-inside list-disc px-4">
                                        <li>Nombre</li>
                                        <li>Correo electrónico</li>
                                        <li>Número de teléfono</li>
                                        <li>Contraseña</li>
                                    </ul>
                                </td>
                                <td className="border border-gray-600">
                                    <ul className="list-inside list-disc px-4">
                                        <li>Para crear y mantener una cuenta en Utem Trades</li>
                                        <li>Para enviar notificaciones importantes sobre su cuenta</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-600">
                                    <ul className="list-inside list-disc px-4">
                                        <li>Dirección IP</li>
                                        <li>Datos de inicio de sesión, como su correo electrónico, contraseña y ubicación de dispositivo o computadora</li>
                                        <li>Métricas de servicio, como preferencias de configuración, interacciones con las funcionalidades y contenido de los servicios</li>
                                        <li>Versión y zona horaria</li>
                                    </ul>
                                </td>
                                <td className="border border-gray-600">
                                    <ul className="list-inside list-disc px-4">
                                        <li>Para garantizar la seguridad de su cuenta, prevenir fraudes y abusos y cumplir con las leyes y regulaciones aplicables</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-600">
                                    <ul className="list-inside list-disc px-4">
                                        <li>Historial de transacciones</li>
                                        <li>Información obtenida de otras fuentes: podemos procesar información obtenida de otras fuentes, como redes sociales, bases de datos de terceros y otras fuentes públicas</li>
                                    </ul>
                                </td>
                                <td className="border border-gray-600">
                                    <ul className="list-inside list-disc px-4">
                                        <li>Para proporcionarle servicios personalizados y mejorar la calidad de nuestros servicios</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </li>
                <li className="mb-4">
                    <h2 className="text-2xl font-bold text-left pt-4">¿Pueden los niños usar Utem Trades?</h2>
                    <p className="mt-4 text-left text-lg">
                        Utem Trades no permite que ninguna persona menor de 18 años utilice nuestros servicios.
                        Si descubrimos que alguna persona menor de 18 años ha proporcionado información personal
                        a través de nuestros servicios, eliminaremos dicha información.
                    </p>
                </li>
                <li className="mb-4">
                    <h2 className="text-2xl font-bold text-left pt-4">¿Qué sucede con las cookies y otros identificadores?</h2>
                    <p className="mt-4 text-left text-lg">
                        Utem Trades utiliza cookies y otros identificadores para recopilar información sobre su
                        actividad y preferencias en nuestros servicios. Esto nos permite proporcionarle servicios
                        personalizados y mejorar la calidad de nuestros servicios. Puede controlar el uso de cookies
                        a través de la configuración de su navegador.
                    </p>
                </li>
                <li className="mb-4">
                    <h2 className="text-2xl font-bold text-left pt-4">¿Utem Trades comparte mi información personal con terceros?</h2>
                    <p className="mt-4 text-left text-lg">
                        La información personal de nuestros usuarios es una parte importante
                        de nuestro negocio y no vendemos esa información a terceros. Sin embargo,
                        podemos compartir información personal con terceros en las siguientes situaciones:
                    </p>
                    <ul className="list-inside list-disc px-4">
                        <li>Con su consentimiento</li>
                        <li>Para prevenir fraudes y abusos</li>
                        <li>Para cumplir con las leyes y regulaciones aplicables</li>
                        <li>Para proporcionar servicios personalizados y mejorar la calidad de nuestros servicios</li>
                    </ul>
                </li>
                <li className="mb-4">
                    <h2 className="text-2xl font-bold text-left pt-4">¿Cómo protege Utem Trades mi información personal?</h2>
                    <p className="mt-4 text-left text-lg">
                        Utem Trades toma medidas de seguridad para proteger la información personal de nuestros usuarios.
                        Utilizamos tecnologías y procedimientos de seguridad para proteger la información personal de
                        accesos no autorizados, uso indebido o divulgación.
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default Privacy;
