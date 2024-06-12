// src/routes/AppRoutes.js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout.jsx';
import Home from '../components/Home.jsx';
import About from '../components/About.jsx';
import Contact from '../components/Contact.jsx';
import NotFound from '../components/NotFound.jsx';
import ErrorBoundary from '../components/ErrorBoundary.jsx';
import { aboutLoader } from '../loaders/aboutLoader.jsx';
import Register from '../components/Register.jsx';
import Login from '../components/Login.jsx';
import Terms from '../components/Terms.jsx';
import Privacy from '../components/Privacy.jsx';
import Verify from '../components/Verify.jsx';
import LoginPassword from '../components/LoginPassword.jsx';
import MarketPage from '../components/MarketPage.jsx';
import TradingView from '../components/TradingView.jsx';

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/about',
                element: <About />,
                loader: aboutLoader
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/login/step2',
                element: <LoginPassword />
            },
            {
                path: '/verify',
                element: <Verify />
            },
            {
                path: '/terms',
                element: <Terms />
            },
            {
                path: '/privacy',
                element: <Privacy />
            },
            {
                path: '*',
                element: <NotFound />
            },
            {
                path: '/market/:symbol',
                element: <MarketPage />
            }
        ]
    }
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;
