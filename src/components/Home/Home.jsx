// src/components/Home.js
import React from 'react';
import { useAuth } from '../../context/AuthProvider.jsx';
import GuestView from './HomeGuestView.jsx';

const Home = () => {

    const { isAuthenticated, user } = useAuth();

    if (isAuthenticated()) {
        return (
            <div>

                <h1>Bienvenido a la página de inicio {user.email} </h1>
                <p>Esta es la página de inicio de la aplicación</p>
            </div>
        );
    }

    return <GuestView />;


};

export default Home;
