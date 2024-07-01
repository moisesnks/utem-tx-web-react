// src/components/Home.js
import React from 'react';
import { useAuth } from '../../context/AuthProvider.jsx';
import GuestView from './HomeInvitados.jsx';
import AuthView from './HomeAuth.jsx';

const Home = () => {

    const { isAuthenticated, user } = useAuth();

    if (isAuthenticated()) {
        return <AuthView />;
    }
    return <GuestView />;
};

export default Home;
