import {createBrowserRouter} from 'react-router-dom';
import Layouts from './layouts/Layouts';
import AuthLayout from './layouts/AuthLayout';
import Inicio from './views/Inicio';
import Login from './views/Login';
import Registro from './views/Registro';
import Ordenes from './views/Ordenes';
import AdminLayout from './layouts/AdminLayout';
import Productos from './views/Productos';
import User from './views/User';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layouts/>,
        children: [
            {
                index: true,
                element: <Inicio/>
            }
        ]
            
    },
    {
        path: '/auth',
        element: <AuthLayout/>,
        children: [
            {
                path: '/auth/login',
                element: <Login/>
            },
            {
                path: '/auth/register',
                element: <Registro/>
            },
            {
                path: '/auth/user',
                element: <User/>
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout/>,
        children: [
            {
                index: true,
                element: <Ordenes/>
            },
            {
                path: '/admin/productos',
                element: <Productos/>
            }
        ]
    },
]);

export default router;