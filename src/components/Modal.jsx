import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 w-96 mx-auto">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-primary-light dark:bg-secondary p-8 rounded-lg z-50 relative flex flex-col place-items-center">
                <button className="absolute top-0 right-0 m-4" onClick={onClose}>
                    <svg className="w-6 h-6 text-gray-500 hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                {children}
                <button className="bg-primary text-black font-bold text-lg rounded-lg py-2 px-4 mt-4" onClick={onClose}>Entendido</button>
            </div>
        </div>
    );
}

export default Modal;
