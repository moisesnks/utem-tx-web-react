import React from "react";

const Avatar = ({ photoURL }) => {
    const defaultURL = "/avatar-svgrepo-com.svg";
    return (
        <div className="flex justify-center sm:justify-start">
            <img
                className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full dark:bg-gray-700 shadow-sm bg-gray-300 drop-shadow-lg"
                src={photoURL || defaultURL}
                alt="Avatar"
            />
        </div>
    );
};

export default Avatar;
