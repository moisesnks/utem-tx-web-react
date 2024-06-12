import React from 'react';

const Terms = () => {
    document.title = 'Condiciones de Uso de Utem Trades';
    const dateUpdate = new Date("2024-06-03 06:59");
    return (
        <div>
            <h1 className="text-3xl font-bold text-left pb-2">Condiciones de Uso de <span className="text-primary">Utem Trades</span></h1>
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
                Estas Condiciones de Uso de Utem Trades se establecen entre usted (en adelante, "usted" o "su") y los operadores
                de Utem Trades (tal como se define a continuación) y rigen el uso de los sitios web, aplicaciones móviles y otros
                servicios ofrecidos por Utem Trades. Al utilizar los Servicios, usted acepta estas Condiciones de Uso y nuestra
                Política de Privacidad. Si no está de acuerdo con estas Condiciones de Uso o nuestra Política de Privacidad, no
                debe utilizar los Servicios.
            </p>
            <p className="mt-8 text-left text-lg">
                Utem Trades se reserva el derecho de modificar estas Condiciones de Uso en cualquier momento y sin previo aviso.
                Cualquier modificación entrará en vigencia inmediatamente después de su publicación en los Servicios. Es su
                responsabilidad revisar periódicamente estas Condiciones de Uso para estar al tanto de las modificaciones. El
                uso continuado de los Servicios después de la publicación de modificaciones constituirá su aceptación de dichas
                modificaciones.
            </p>
            <p className="mt-8 text-left text-lg">
                Utem Trades se compromete a proteger su privacidad y a cumplir con las leyes y regulaciones aplicables en materia
                de protección de datos. Nuestra Política de Privacidad describe cómo recopilamos, utilizamos y compartimos su
                información personal cuando utiliza nuestros Servicios. Al utilizar los Servicios, usted acepta nuestra Política
                de Privacidad y nos autoriza a recopilar, utilizar y compartir su información personal de acuerdo con dicha
                política.
            </p>
            <p className="mt-8 text-left text-lg">
                Utem Trades se esfuerza por proporcionar información precisa y actualizada en los Servicios. Sin embargo, no
                garantizamos la exactitud, integridad o actualidad de la información proporcionada. El uso de la información
                proporcionada en los Servicios es bajo su propio riesgo. Utem Trades no será responsable de ninguna pérdida o
                daño derivado del uso de la información proporcionada en los Servicios.
            </p>
            <p className="mt-8 text-left text-lg">
                Utem Trades se reserva el derecho de suspender o cancelar su acceso a los Servicios en cualquier momento y por
                cualquier motivo, sin previo aviso. Usted acepta que Utem Trades no será responsable ante usted ni ante ningún
                tercero por cualquier suspensión o cancelación de su acceso a los Servicios.
            </p>
            <ol className="mt-8 text-left text-lg list-alpha px-8">
                <li>Elemento falso 1</li>
                <li>Elemento falso 2</li>
                <li>Elemento falso 3</li>
            </ol>
        </div>
    );
}

export default Terms;
