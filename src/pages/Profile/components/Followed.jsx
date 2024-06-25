import React from "react";

const Followed = ({ following }) => {
    return (
        <div className="flex flex-col gap-[.1rem] flex-wrap">
            <span className="text-md font-medium text-black dark:text-gray-400 flex items-center gap-2">
                Siguiendo
            </span>
            <span className="text-sm font-semibold text-gray-500 dark:text-white flex items-center gap-2">
                {following}
            </span>
        </div>
    )
}

export default Followed;
