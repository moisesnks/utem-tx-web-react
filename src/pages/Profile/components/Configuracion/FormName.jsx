import React from "react";
import Loading from "@components/Loading";

const FormName = ({ handleSubmitDisplayName, loading }) => {
    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSubmitDisplayName(event);
    };

    const loadingContent = () => {
        return <Loading text="Cargando..." />;
    };

    const formContent = () => {
        return (
            <>
                <input
                    type="text"
                    name="displayName"
                    className="dark:border-none border border-gray-400 dark:bg-gray-700 w-full sm:w-2/3 md:w-1/2 p-2 sm:p-3 md:p-4 rounded-lg"
                    placeholder="Escribe tu nuevo nombre de usuario"
                    autoComplete="off"
                />
                <button
                    className="bg-blue-500 p-2 sm:p-3 md:p-4 rounded-lg w-full sm:w-auto hover:opacity-75"
                    type="submit"
                >
                    Cambiar
                </button>
            </>
        )
    };

    return (
        <form className="w-full flex flex-col sm:flex-row gap-2 mt-4" onSubmit={handleFormSubmit}>
            {loading ? loadingContent() : formContent()}
        </form>
    );
};

export default FormName;
