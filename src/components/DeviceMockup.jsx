import React, { useState } from 'react';

const DeviceMockupSwitcher = () => {
    const [activeTab, setActiveTab] = useState('mobile'); // 'desktop' or 'mobile'

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="p-8 w-[32rem] flex flex-col items-center justify-center gap-8">
            <div className="flex items-center justify-center h-[500px]"> {/* Fijar la altura del contenedor */}
                {activeTab === 'desktop' && (
                    <img
                        src="/mockup_desktop.png"
                        alt="Home"
                        className="h-auto border border-secondary rounded-2xl shadow-xl max-w-[600px]"
                    />
                )}
                {activeTab === 'mobile' && (
                    <img
                        src="/mockup_mobile.png"
                        alt="Home"
                        className="h-auto max-w-[400px]"
                    />
                )}
            </div>
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">
                    <li className="me-2">
                        <span
                            onClick={() => handleTabClick('desktop')}
                            className={`cursor-pointer inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'desktop'
                                ? 'text-blue-600 border-blue-600'
                                : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                                }`}
                        >
                            Escritorio
                        </span>
                    </li>
                    <li className="me-2">
                        <span
                            onClick={() => handleTabClick('mobile')}
                            className={`cursor-pointer inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'mobile'
                                ? 'text-blue-600 border-blue-600'
                                : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                                }`}
                        >
                            Móvil
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DeviceMockupSwitcher;
