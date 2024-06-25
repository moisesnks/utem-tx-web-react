import React from 'react';

const TradingAppPromo = () => {
    const handleAppLinkClick = (platform) => {
        // Aquí podrías agregar la lógica para redirigir a las tiendas de aplicaciones (iOS y Android)
        if (platform === 'iOS') {
            window.location.href = 'https://example.com/ios-app-link'; // Reemplaza con el enlace real de la App Store
        } else if (platform === 'Android') {
            window.location.href = 'https://example.com/android-app-link'; // Reemplaza con el enlace real de Google Play Store
        }
    };

    return (
        <div className="flex flex-col p-8 w-[54rem] justify-center align-center gap-8">
            <span className="text-4xl font-bold mb-8">
                Haz trading sobre la marcha. <br />
                En cualquier lugar <br /> y momento.
            </span>
            <div className="flex flex-row gap-4">
                <img src="/qr-inprogress.png" alt="QR" className="h-fit w-80 border rounded-2xl p-2 border-gray-300 dark:border-gray-700 shadow-lg drop-shadow-lg dark:bg-light-dark" />
                <div className="flex flex-col align-center justify-center gap-4">
                    <span className="text-lg">
                        Nuestra app está en construcción por ahora, por eso no tenemos un QR disponible.
                    </span>
                    <span className="text-lg">
                        Pero pronto estará disponible para <br />
                        <span
                            className="text-lg text-primary-light dark:text-primary cursor-pointer hover:opacity-75"
                            onClick={() => handleAppLinkClick('iOS')}
                        >
                            iOS
                        </span>{' '}
                        y{' '}
                        <span
                            className="text-lg text-primary-light dark:text-primary cursor-pointer hover:opacity-75"
                            onClick={() => handleAppLinkClick('Android')}
                        >
                            Android
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TradingAppPromo;
