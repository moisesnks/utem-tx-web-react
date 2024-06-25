import React from 'react';

// Arreglo de imágenes alternativas en caso de falla
const fallbackImages = [
    'avatar-svgrepo-com.svg',
    'avatar-svgrepo-com-2.svg'
];

// Función para seleccionar una imagen aleatoria de fallbackImages
const getRandomFallbackImage = () => {
    const randomIndex = Math.floor(Math.random() * fallbackImages.length);
    return fallbackImages[randomIndex];
};

const SocialConnect = ({ users }) => {
    const handleImageError = (e) => {
        e.target.src = getRandomFallbackImage();
    };

    return (
        <div className="flex flex-col gap-4 rounded-2xl shadow-lg bg-zinc-200 dark:bg-gray-800 dark:text-gray-200 drop-shadow-lg w-5/12 h-[48rem] overflow-hidden divide-y divide-gray-200 dark:divide-gray-700">
            <div className="flex items-center justify-between mr-4">
                <h2 className="px-4 mt-4 text-lg font-semibold mb-4">
                    Conecta con otros usuarios
                    <i className="fas fa-users ml-2"></i>
                </h2>
                <button className="bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-900 dark:hover:opacity-75 font-semibold py-1 px-3 rounded">
                    Ver más
                </button>
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto" style={{ maxHeight: 'calc(100% - 4rem)' }}>
                {users.map((user) => (
                    <li key={user.uid} className="dark:hover:bg-gray-900 hover:bg-neutral-300 select-none py-2 px-4 h-20 overflow-hidden">
                        <div className="flex items-center justify-between">
                            <div className="flex-shrink-0 h-14 aspect-square border-2 border-orange-500 dark:border-primary rounded-full shadow-lg drop-shadow-lg">
                                <img
                                    className="h-full w-full object-cover rounded-full pointer-events-none"
                                    src={user.photoURL}
                                    alt={`Avatar de ${user.name}`}
                                    onError={handleImageError}
                                />
                            </div>
                            <div className="ml-4">
                                <div className="font-semibold">{user.name}</div>
                                <div className="text-gray-500 dark:text-gray-400 text-sm truncate w-64">
                                    {user.description}
                                </div>
                            </div>
                            <button className="ml-auto font-semibold py-2 px-4 rounded bg-neutral-300 hover:bg-neutral-400 dark:bg-stone-900 dark:hover:opacity-75">
                                <div className="flex items-center">
                                    Seguir
                                    <i className="fas fa-heart ml-2"></i>
                                </div>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SocialConnect;
