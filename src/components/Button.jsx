import React from 'react';

const Button = ({ type, text, onClick, imgUrl }) => {
    const classNames = type === 'primary'
        ? 'bg-primary hover:opacity-75 text-black'
        : 'bg-secondary hover:opacity-75 text-white';

    return (
        <button onClick={onClick} className={`relative rounded-xl px-3 py-2 pl-10 font-bold ${classNames} border border-gray-600 flex items-center justify-center`}>
            {imgUrl && <img src={imgUrl} alt="Icon" className="absolute left-4 w-6 h-6" />}
            <span>{text}</span>
        </button>
    );
}

export default Button;