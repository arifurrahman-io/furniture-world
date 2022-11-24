import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../layout/DashboardLayout';
import Main from '../layout/Main'
import AddProduct from '../pages/AddProduct/AddProduct';
import Blog from '../pages/Blog/Blog';
import Home from '../pages/Home/Home'
import MyOrders from '../pages/MyOrders/MyOrders';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/signin',
                element: <SignIn></SignIn>
            },

        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '/dashboard',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/addproduct',
                element: <AddProduct></AddProduct>
            }
        ]
    }

])

export default router;