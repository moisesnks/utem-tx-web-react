import React from "react";

const Role = ({ role }) => {
    return (
        <div className="flex flex-col gap-[.1rem] flex-wrap">
            <span className="text-md font-medium text-black dark:text-gray-400 flex items-center gap-2">
                Role
            </span>
            <span className="text-sm font-semibold text-gray-500 dark:text-white flex items-center gap-2">
                {role}
            </span>
        </div>
    )
}

export default Role;
