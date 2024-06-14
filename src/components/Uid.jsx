import React, { useState } from "react";

const Uid = ({ uid }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(uid).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        });
    };

    return (
        <div className="flex flex-col gap-[.1rem] flex-wrap">
            <span className="text-md font-medium text-black dark:text-gray-400 flex items-center gap-2">
                User ID
            </span>
            <span className="text-sm font-semibold text-gray-500 dark:text-white flex items-center gap-2">
                {uid}
                <i
                    className={`fas fa-copy text-lg cursor-pointer ${copied ? "text-green-500" : "text-neutral-800 dark:text-gray-400"}`}
                    aria-hidden="true"
                    onClick={handleCopy}
                    title="Copy to clipboard"
                ></i>
            </span>
            {copied && <span className="text-xs text-green-500 dark:text-green-400">Copied!</span>}
        </div>
    );
}

export default Uid;
