import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Perfil from "./components/Perfil.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Configuracion from "./components/Configuracion.jsx";
import Contactos from "./components/Contactos.jsx";

const Profile = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("dashboard");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div className="flex flex-row h-full w-full relative">
            {/* Botón para abrir el menú en dispositivos móviles */}
            <button
                className="lg:hidden p-4 z-50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <i className="fas fa-bars fa-fw text-gray-500 dark:text-gray-400" aria-hidden="true"></i>
            </button>
            {/* Backdrop para cerrar el menú al hacer clic fuera */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsMenuOpen(false)}
                ></div>
            )}
            {/* Menú lateral */}
            <div className={` lg:static fixed inset-y-0 left-0 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 z-50 `}>
                <ul className="flex flex-col text-sm font-medium text-left text-gray-500 dark:text-gray-400 h-full p-4 lg:p-0 lg:relative lg:h-auto">
                    <li className="mb-2">
                        <a
                            href="#"
                            className={`inline-flex items-center justify-start p-4 border-l-2 transition-colors duration-200 ${activeSection === "perfil" ? " border-orange-500 dark:text-orange-500" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                } rounded-l-lg group`}
                            onClick={() => { setActiveSection("perfil"); setIsMenuOpen(false); }}
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
                            onClick={() => { setActiveSection("dashboard"); setIsMenuOpen(false); }}
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
                            onClick={() => { setActiveSection("configuracion"); setIsMenuOpen(false); }}
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
                            onClick={() => { setActiveSection("contactos"); setIsMenuOpen(false); }}
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
