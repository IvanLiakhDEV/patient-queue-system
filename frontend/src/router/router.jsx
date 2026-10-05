import { createBrowserRouter } from 'react-router';
import { HomePage } from '../pages/home/HomePage.jsx';
export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
]);
