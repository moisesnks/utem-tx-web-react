import React, { useState } from 'react';

const FaqAccordion = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqData = [
        {
            question: '¿Qué es un exchange de criptomonedas?',
            answer: 'Un exchange de criptomonedas es como un mercado digital donde puedes comprar y vender activos digitales como Bitcoin, Ethereum y Tether. ¡Binance, por ejemplo, es el más grande del mundo en volumen de comercio!',
        },
        {
            question: '¿Qué es UTEM TX?',
            answer: 'UTEM TX es una plataforma creada por estudiantes de ingeniería informática de la UTEM. Estamos desarrollando una experiencia innovadora para aprender sobre criptomonedas y trading.',
        },
        {
            question: '¿Cómo comprar en UTEM TX?',
            answer: 'En UTEM TX, simulamos compras para enseñarte cómo funciona el mercado de criptomonedas. No estamos conectados a servicios reales, pero puedes practicar con mercados públicos y gráficos en tiempo real.',
        },
        {
            question: '¿Cómo seguir los precios de las criptos?',
            answer: 'Puedes seguir los precios de las criptomonedas usando sitios como CoinMarketCap y TradingView. ¡Mantente al día con las últimas noticias y tendencias!',
        },
        {
            question: '¿Cómo hacer trading?',
            answer: 'El trading de criptomonedas implica comprar y vender activos digitales para obtener ganancias basadas en sus fluctuaciones de precios. ¡Es emocionante y puede ser lucrativo!',
        },
        {
            question: '¿Cómo obtener ganancias?',
            answer: 'Para ganar dinero con el trading de criptomonedas, puedes aprovechar las fluctuaciones de precios comprando bajo y vendiendo alto. También puedes explorar estrategias avanzadas como el trading de margen y el arbitraje.',
        },
    ];

    return (
        <div className="mt-16 flex flex-grow flex-col mx-auto">
            <h2 className="text-3xl font-semibold mb-8 text-center">
                Preguntas frecuentes</h2>
            {faqData.map((item, index) => (
                <div key={index} className="mb-4">
                    <button
                        className="w-full flex justify-between items-center  p-4 rounded-lg focus:outline-none"
                        onClick={() => toggleAccordion(index)}
                    >
                        <div className="flex flex-row flex-grow align-center text-lg dark:hover:text-primary dark:hover:bg-secondary p-4 hover:text-secondary hover:bg-primary-dark rounded-lg">
                            <span className='bg-gray-500 text-secondary h-8 w-8 aspect-square rounded-lg flex items-center justify-center mr-4'>{index + 1}</span>
                            <span className="">{item.question}</span>
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-6 w-6 transition-transform transform ${activeIndex === index ? 'rotate-180' : 'rotate-0'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    {activeIndex === index && (
                        <div className=" p-4 rounded-b-lg">
                            <p className="text-base">{item.answer}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FaqAccordion;
