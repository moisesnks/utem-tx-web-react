import React from "react";
import './Spinner.css';

const Spinner = ({ text }) => {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
            <p>{text}</p>
        </div>
    );
}

export default Spinner;
