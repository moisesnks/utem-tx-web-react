import React, { useState } from 'react';
import CriptosPopulares from './CriptosPopulares.jsx';
import ComprarVender from './ComprarVender.jsx';

import popularMockup from '../../mockups/popular.js';


const BuyPage = () => {
    return (
        <div className=" w-full flex flex-grow flex-row gap-20 justify-between mx-auto max-w-screen-xl">
            <div className=" mt-10 flex flex-col flex-wrap gap-8  w-3/6 px-4 py-2">
                <h1 className="text-6xl font-bold ">
                    Comprar cripto
                </h1>
                <CriptosPopulares criptos={popularMockup} />

            </div>

            <div className=" mt-10  w-3/6 px-4 py-2">
                <ComprarVender />
            </div>
        </div>
    );
};

export default BuyPage;
