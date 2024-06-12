// src/loaders/aboutLoader.js
export const aboutLoader = async () => {
    // Simulando la carga de datos de 1.5 segundos
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
        info: 'This is the about page',
    }
};
