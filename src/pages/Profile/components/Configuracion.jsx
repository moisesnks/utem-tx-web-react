import React from "react";
import { useAuth } from "../../../context/AuthProvider";

const Configuracion = () => {
    const { user, updateUserProfile } = useAuth();
    const displayName = user?.displayName ?? "";
    const uid = user?.uid ?? "default-uid";
    const verified = user?.verified ?? false;
    const photoURL = user?.photoURL ?? "";
    const role = user?.role ?? "guest";
    const followers = user?.followers ?? 0;
    const following = user?.following ?? 0;
    const name = displayName || `Anonymus-User-${uid.slice(0, 6)}`;

    const handleSubmitDisplayName = (e) => {
        e.preventDefault();
        const newDisplayName = e.target.elements.displayName.value;
        updateUserProfile({ displayName: newDisplayName });
    };

    const handleSubmitAvatar = (e) => {
        e.preventDefault();
        const file = e.target.elements.avatar.files[0];
        const formData = new FormData();
        formData.append('avatar', file);

        // Realiza la solicitud al backend para actualizar el avatar
        fetch("/api/update-avatar", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${user.token}`,
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    updateUserProfile({ photoURL: data.photoURL });
                } else {
                    console.error(data.message);
                }
            })
            .catch(error => console.error("Error updating avatar:", error));
    };

    const handleSubmitPassword = (e) => {
        e.preventDefault();
        const newPassword = e.target.elements.password.value;

        // Realiza la solicitud al backend para actualizar la contraseña
        fetch("/api/update-password", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: newPassword }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log("Password updated successfully");
                } else {
                    console.error(data.message);
                }
            })
            .catch(error => console.error("Error updating password:", error));
    };

    return (
        <div className="flex flex-col w-full h-screen pr-8">
            <div className="w-full h-fit flex flex-col gap-4">
                <div className="flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl shadow-lg bg-zinc-200 dark:bg-gray-800 dark:text-gray-200 drop-shadow-lg">
                    <span className="text-xl sm:text-2xl font-bold text-left mb-2">
                        Profile
                    </span>
                    <div className="flex flex-row flex-wrap gap-1 items-center text-sm sm:text-base">
                        <span className="font-bold text-left">
                            Nickname
                        </span>
                        <span className="text-gray-800 font-normal text-left bg-blue-400 dark:bg-gray-600 p-1 sm:p-2 rounded-lg">
                            {name}
                        </span>
                    </div>
                    <span className="text-gray-800 text-xs sm:text-sm mt-2 max-h-20 overflow-y-auto">
                        Escoge un nombre customizado como nombre de usuario para tu perfil. Nombres reales o nombres que puedan ser ofensivos serán eliminados.
                    </span>
                    {/* Sección para cambiar el nombre */}
                    <form className="w-full flex flex-row flex-wrap gap-1 mt-2" onSubmit={handleSubmitDisplayName}>
                        <input
                            type="text"
                            name="displayName"
                            className="dark:border-none border border-gray-400 dark:bg-gray-700 w-full sm:w-2/3 md:w-1/2 p-2 sm:p-3 md:p-4 rounded-lg"
                            placeholder="Escribe tu nuevo nombre de usuario"
                        />
                        <button
                            className="bg-blue-500 p-2 sm:p-3 md:p-4 rounded-lg w-full sm:w-auto hover:opacity-75"
                            type="submit"
                        >
                            Cambiar
                        </button>
                    </form>
                </div>
                <div className="flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl shadow-lg bg-zinc-200 dark:bg-gray-800 dark:text-gray-200 drop-shadow-lg">
                    <span className="text-xl sm:text-2xl font-bold text-left mb-2">
                        Avatar
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <img
                            src={photoURL}
                            alt="Profile"
                            className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full dark:bg-gray-700 shadow-sm bg-gray-300 drop-shadow-lg"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/avatar-svgrepo-com.svg";
                            }}
                        />
                        <div className="flex flex-col">
                            {/* Si no tiene avatar mostrar un mensaje */}
                            <span className="text-gray-400 text-xs sm:text-sm mt-2 sm:mt-0">
                                Sube una imagen para tu perfil. Las imágenes ofensivas serán eliminadas.
                            </span>
                            {/* Sección para cambiar el avatar */}
                            <form className="w-full flex flex-col sm:flex-row gap-2 mt-4" onSubmit={handleSubmitAvatar}>
                                <input
                                    type="file"
                                    name="avatar"
                                    className="bg-gray-700 p-2 sm:p-3 md:p-4 rounded-lg w-full sm:w-auto"
                                />
                                <button
                                    className="bg-blue-500 p-2 sm:p-3 md:p-4 rounded-lg w-full sm:w-auto"
                                    type="submit"
                                >
                                    Cambiar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl shadow-lg bg-zinc-200 dark:bg-gray-800 dark:text-gray-200 drop-shadow-lg">
                    <span className="text-xl sm:text-2xl font-bold text-left mb-2">
                        Contraseña
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex flex-col">
                            <span className="text-gray-400 text-xs sm:text-sm mt-2 sm:mt-0">
                                Cambia tu contraseña por seguridad. Usa al menos 8 caracteres.
                            </span>
                            {/* Mostrar un mensaje de ayuda para la contraseña */}
                            <span className="text-gray-400 text-xs sm:text-sm mt-2 sm:mt-0">
                                <span className="text-red-500">La contraseña debe tener al menos:</span>
                                <ul className="list-disc list-inside">
                                    <li>8 caracteres</li>
                                    <li>1 letra mayúscula</li>
                                    <li>1 letra minúscula</li>
                                    <li>1 número</li>
                                </ul>
                            </span>
                            {/* Sección para cambiar la contraseña */}
                            <form className="w-full flex flex-col sm:flex-row gap-2 mt-4" onSubmit={handleSubmitPassword}>
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Configuracion;
