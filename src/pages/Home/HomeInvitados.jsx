import CryptoList from './components/CryptoList.jsx';
import Welcome from './components/Welcome.jsx';
import DeviceMockup from './components/DeviceMockup.jsx';
import TradingAppPromo from './components/TradingAppPromo.jsx';
import FaqAccordion from './components/FaqAccordion.jsx';

const Guest = () => {
    return (
        <div className="flex flex-col ">
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

        </div >
    );
}

export default Guest;