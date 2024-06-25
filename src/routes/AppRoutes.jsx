// src/routes/AppRoutes.js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout.jsx';

import { aboutLoader } from '../loaders/aboutLoader.jsx';

import Contact from '../pages/Contact';
import About from '../pages/About';
import Buy from '../pages/Buy';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import MarketDetails from '../pages/MarketDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Verify from '../pages/Verify';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/about', element: <About />, loader: aboutLoader },
            { path: '/contact', element: <Contact /> },
            { path: '/register', element: <Register /> },
            { path: '/login', element: <Login /> },
            { path: "/verify/", element: <Verify /> },
            { path: "/verify/:email/:uid", element: <Verify /> },
            { path: '/terms', element: <Terms /> },
            { path: '/privacy', element: <Privacy /> },
            { path: '*', element: <NotFound /> },
            { path: '/market/:symbol', element: <MarketDetails /> },
            { path: '/buy', element: <Buy /> },
            { path: '/profile', element: <Profile /> }
        ]
    }
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;
