import React from 'react';

const Noticias = ({ noticias }) => {
    return (
        <div className="flex flex-col gap-4 rounded-2xl shadow-lg bg-zinc-200 dark:bg-gray-800 dark:text-gray-200 drop-shadow-lg w-5/12 h-[48rem] overflow-hidden divide-y divide-gray-200 dark:divide-gray-700">
            <div className="flex items-center justify-between mr-4">
                <h2 className="px-4 mt-4 text-lg font-semibold mb-4">Noticias
                    <i className="fas fa-newspaper ml-2"></i>
                </h2>
                <button className="bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-900 dark:hover:opacity-75 font-semibold py-1 px-3 rounded">
                    Ver más
                </button>
            </div>
            <div className="overflow-y-auto flex flex-col gap-4 ">
                {noticias.map((noticia, index) => (
                    <div className="dark:hover:bg-gray-900 hover:bg-neutral-300 hover:cursor-pointer flex flex-row items-center mx-auto pl-4" key={index}>
                        <div className="flex-shrink-0 h-14 aspect-square border-2 border-orange-500 dark:border-primary rounded-full shadow-lg drop-shadow-lg">
                            <img
                                className="h-full w-full object-cover rounded-full pointer-events-none"
                                src={noticia.autor.photoURL}
                                alt={noticia.autor.nombre}
                                onError={
                                    (e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/utemtrades.svg';
                                    }
                                } />
                        </div>
                        <div className="py-2 px-4 mb-4">
                            <div className="flex items-center justify-between mb-2 w-full">
                                <h3 className="text-lg font-semibold w-[22rem] line-clamp-2 dark:text-primary">
                                    {noticia.titulo}
                                </h3>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {noticia.fecha}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3">
                                {noticia.contenido}
                            </p>
                            <span className="text-gray-600 dark:text-gray-400">@{noticia.autor.nombre}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Noticias;
