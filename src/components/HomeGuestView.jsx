import CryptoList from './CryptoList.jsx';
import Welcome from './Welcome.jsx';
import DeviceMockup from './DeviceMockup.jsx';
import TradingAppPromo from './TradingAppPromo.jsx';
import FaqAccordion from './FaqAccordion.jsx';

const Guest = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex-grow flex flex-col align-center justify-center align-center gap-8 p-8">
                < div className="p-8 flex flex-row flex-wrap gap-8 flex-grow t-18 justify-around flex-wrap" >
                    <Welcome />
                    <CryptoList />
                </div >

                <div className="p-8 flex flex-row flex-wrap gap-8 flex-grow t-18 justify-around flex-wrap">
                    <DeviceMockup />
                    <TradingAppPromo />
                    <FaqAccordion />
                </div>

            </div >
            <div className="footer flex flex-row justify-center items-center bg-secondary text-white p-4 mx-[-1rem] gap-8" >
                <p>&copy; 2024 Utem TX. Todos los derechos reservados.</p>
            </div>
        </div >
    );
}

export default Guest;