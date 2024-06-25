import React from "react";
const Name = ({ name, verified }) => {
    return (
        <div className="ml-4  pr-4  dark:border-gray-700 ">
            <h2 className="text-xl font-semibold">{name}</h2>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <i className={`fas fa-${verified ? "check-circle" : "times-circle"} text-lg ${verified ? "text-green-500" : "text-red-500"}`} aria-hidden="true"></i>
                {verified ? "Verificado" : "No verificado"}
            </span>
        </div>
    );
}

export default Name;