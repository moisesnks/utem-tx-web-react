import React from "react";
import Loading from "@components/Loading";

const FormPassword = ({ handleSubmitPassword, loading }) => {
    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSubmitPassword(event);
    };

    const loadingContent = () => {
        return <Loading text="Cargando..." />;
    };

    const formContent = (loading) => {
        return (
            <>
                <input
                    type="password"
                    name="password"
                    className="bg-gray-700 p-2 sm:p-3 md:p-4 rounded-lg w-full sm:w-auto"
                    placeholder="Escribe tu nueva contraseña"
                />
                <button
                    className="bg-blue-500 p-2 sm:p-3 md:p-4 rounded-lg w-full sm:w-auto"
                    type="submit"
                >
                    Cambiar
                </button>
            </>
        )
    };

    return (
        <form className="w-full flex flex-col sm:flex-row gap-2 mt-4" onSubmit={handleFormSubmit}>
            {loading ? loadingContent() : formContent(loading)}
        </form>
    );
};

export default FormPassword;
