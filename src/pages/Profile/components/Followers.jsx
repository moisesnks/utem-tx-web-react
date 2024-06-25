import React from "react";

const Followers = ({ followers }) => {

    const handleClick = () => {
        console.log('Element clicked');
    };

    return (
        <div className="flex flex-col gap-[.1rem] flex-wrap">
            <span className="text-md font-medium text-black dark:text-gray-400 flex items-center gap-2">
                Seguidores
            </span>
            <span
                className="text-sm font-semibold text-gray-500 dark:text-white flex items-center gap-2 translate-y-1 cursor-pointer" // Aplica translate-y-1
                onClick={handleClick} // Añade el controlador de click
            >
                {followers}
                <i className="fas fa-chevron-right text-lg text-neutral-800 dark:text-gray-400" aria-hidden="true"></i>
            </span>
        </div>
    );
};

export default Followers;