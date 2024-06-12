// src/components/Home.js

import CryptoList from './CryptoList.jsx';

const Guess = () => {
    return (
        <div className="p-8 flex flex-row flex-wrap gap-8 flex-grow">
            <div className="flex flex-col">
                <h1 className="text-7xl font-bold mb-8"> Compra <span className="text-primary">Bitcoin</span> fácil y seguro</h1>
                <div className="flex flex-row items-center">
                    {/* Input para correo electrónico */}
                    <input
                        type="email" placeholder="Ingresa tu correo electrónico"
                        className="w-72 p-2 rounded-lg border border-gray-600 active:outline-none focus:outline-none bg-transparent" />
                    {/* Botón para continuar */}
                    <button className="bg-primary text-black p-2 rounded-lg font-bold ml-2">Continuar</button>
                </div>
                <div className="flex flex-row items-center mt-2 gap-8" >
                    <div className="flex flex-col mt-4">
                        <span className="text-sm text-gray-500">
                            O regístrate con </span>
                        <div className="flex gap-2 mt-2">
                            <button className="bg-transparent text-black p-2 rounded-lg font-bold border border-gray-600 hover:bg-gray-600">
                                <img src="/google.svg" alt="Google" className="w-8" />
                            </button>
                            <button className="bg-transparent text-black p-2 rounded-lg font-bold border border-gray-600 hover:bg-gray-600">
                                <img src="/github.svg" alt="Github" className="w-8" />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col mt-4">
                        <span className="text-sm text-gray-500">
                            Descargar aplicación </span>
                        <div className="flex gap-2 mt-2">
                            <button className="bg-transparent text-black p-2 rounded-lg font-bold border border-gray-600 hover:bg-gray-600">
                                <img src="/utemtrades.svg" alt="Utem Trades" className="w-8" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <CryptoList />
        </div>
    );
}


const Home = () => {

    return (
        <Guess />

    );
};

export default Home;
