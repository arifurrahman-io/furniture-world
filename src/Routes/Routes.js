import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../layout/DashboardLayout';
import Main from '../layout/Main'
import AddProduct from '../pages/AddProduct/AddProduct';
import Blog from '../pages/Blog/Blog';
import Category from '../pages/Category/Category';
import AllClients from '../pages/Dashboard/AllClients/AllClients';
import AllSellers from '../pages/Dashboard/AllSellers/AllSellers';
import Home from '../pages/Home/Home'
import MyOrders from '../pages/Dashboard/MyOrders/MyOrders';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import MyProducts from '../pages/Dashboard/MyProducts/MyProducts';
import Payment from '../pages/Dashboard/Payment/Payment';

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
            {
                path: '/category/:id',
                element: <Category></Category>,
                loader: ({ params }) => fetch(`https://furniture-world-server.vercel.app/category/${params.id}`)
            }

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
                path: '/dashboard/myproducts',
                element: <MyProducts></MyProducts>
            },
            {
                path: '/dashboard/managesellers',
                element: <AllSellers></AllSellers>

            },
            {
                path: '/dashboard/manageclients',
                element: <AllClients></AllClients>

            },
            {
                path: '/dashboard/addproduct',
                element: <AddProduct></AddProduct>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`https://furniture-world-server.vercel.app/bookings/${params.id}`)
            }
        ]
    }

])

export default router;