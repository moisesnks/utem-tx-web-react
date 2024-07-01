import React from "react";
import { useAuth } from "@context/AuthProvider";
import AvatarEditor from "./AvatarEditor.jsx";
import FormName from "./FormName.jsx";
import FormPassword from "./FormPassword.jsx";
import Loading from "@components/Loading";

const Configuracion = () => {
    const { user, updateUserProfile, changePassword, loading } = useAuth();
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

    // Función para convertir data URL a Blob
    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
            uintArray[i] = byteString.charCodeAt(i);
        }

        return new Blob([arrayBuffer], { type: mimeString });
    };

    const handleSubmitAvatar = (dataURL) => {
        if (dataURL) {
            // Crear FormData y agregar la imagen convertida
            const formData = new FormData();
            const blob = dataURItoBlob(dataURL); // Función para convertir data URL a Blob
            formData.append('file', blob, 'profile.jpg'); // 'profile.jpg' es el nombre del archivo opcional

            // Llamar a updateUserProfile con el FormData que contiene la imagen
            updateUserProfile({ photoURL: formData });
        }
    };

    const handleSubmitPassword = (e) => {
        e.preventDefault();
        const newPassword = e.target.elements.password.value;
        // crear el objeto {password: newPassword}
        changePassword({ password: newPassword });
    };

    if (loading) {
        return <Loading text="Cargando..." />;
    }

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
                    <FormName handleSubmitDisplayName={handleSubmitDisplayName} loading={loading} />

                </div>
                <div className="flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl shadow-lg bg-zinc-200 dark:bg-gray-800 dark:text-gray-200 drop-shadow-lg relative z-50 ">
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
                        <AvatarEditor onConfirm={handleSubmitAvatar} />
                    </div>
                </div>
                <div className="flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl shadow-lg bg-zinc-200 dark:bg-gray-800 dark:text-gray-200 drop-shadow-lg ">
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
                            <FormPassword handleSubmitPassword={handleSubmitPassword} loading={loading} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Configuracion;
