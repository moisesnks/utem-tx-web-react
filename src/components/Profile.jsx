import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import Perfil from "./Perfil.jsx";
import Dashboard from "./Dashboard.jsx";
import Configuracion from "./Configuracion.jsx";
import Contactos from "./Contactos.jsx";

const Profile = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("dashboard");

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/");
        }
    }, [isAuthenticated]);


    const renderSection = () => {
        switch (activeSection) {
            case "perfil":
                return <Perfil />;
            case "dashboard":
                return <Dashboard user={user} />;
            case "configuracion":
                return <Configuracion />;
            case "contactos":
                return <Contactos />;
            default:
                return <Dashboard user={user} />;
        }
    };

    const iconClass = (sectionName) => {
        return `${activeSection === sectionName ? "text-orange-500" : "text-gray-400 dark:text-gray-400"}`;
    };

    return (
        <div className="flex flex-row h-full w-full ">
            <div className="border-r border-gray-200 dark:border-gray-700">
                <ul className="flex flex-col text-sm font-medium text-left text-gray-500 dark:text-gray-400">
                    <li className="mb-2">
                        <a
                            href="#"
                            className={`inline-flex items-center justify-start p-4 border-l-2 transition-colors duration-200 ${activeSection === "perfil" ? " border-orange-500 dark:text-orange-500" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                } rounded-l-lg group`}
                            onClick={() => setActiveSection("perfil")}
                        >
                            <i className={`fas fa-user-circle fa-fw ${iconClass("perfil")}`} aria-hidden="true"></i>
                            <span className="ml-2">Perfil</span>
                        </a>
                    </li>
                    <li className="mb-2">
                        <a
                            href="#"
                            className={`inline-flex items-center justify-start p-4 border-l-2 transition-colors duration-200 ${activeSection === "dashboard" ? " border-orange-500 dark:text-orange-500" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                } rounded-l-lg group`}
                            onClick={() => setActiveSection("dashboard")}
                        >
                            <i className={`fas fa-home fa-fw ${iconClass("dashboard")}`} aria-hidden="true"></i>
                            <span className="ml-2">Dashboard</span>
                        </a>
                    </li>
                    <li className="mb-2">
                        <a
                            href="#"
                            className={`inline-flex items-center justify-start p-4 border-l-2 transition-colors duration-200 ${activeSection === "configuracion" ? " border-orange-500 dark:text-orange-500" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                } rounded-l-lg group`}
                            onClick={() => setActiveSection("configuracion")}
                        >
                            <i className={`fas fa-cog fa-fw ${iconClass("configuracion")}`} aria-hidden="true"></i>
                            <span className="ml-2">Configuración</span>
                        </a>
                    </li>
                    <li className="mb-2">
                        <a
                            href="#"
                            className={`inline-flex items-center justify-start p-4 border-l-2 transition-colors duration-200 ${activeSection === "contactos" ? " border-orange-500 dark:text-orange-500" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                } rounded-l-lg group`}
                            onClick={() => setActiveSection("contactos")}
                        >
                            <i className={`fas fa-address-book fa-fw ${iconClass("contactos")}`} aria-hidden="true"></i>
                            <span className="ml-2">Contactos</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="flex flex-grow p-4">
                {renderSection()}
            </div>
        </div>
    );
};

export default Profile;
