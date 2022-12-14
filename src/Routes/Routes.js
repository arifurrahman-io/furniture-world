import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../layout/DashboardLayout';
import Main from '../layout/Main'
import AddProduct from '../pages/AddProduct/AddProduct';
import Blog from '../pages/Blog/Blog';
import Category from '../pages/Category/Category';
import AllClients from '../pages/Dashboard/AllClients/AllClients';
import AllSellers from '../pages/Dashboard/AllSellers/AllSellers';
import MyOrders from '../pages/Dashboard/MyOrders/MyOrders';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import MyProducts from '../pages/Dashboard/MyProducts/MyProducts';
import Payment from '../pages/Dashboard/Payment/Payment';
import AdminRoute from './AdminRoute/AdminRoute';
import SellerRoute from './SellerRoute/SellerRoute';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Wishlist from '../pages/Dashboard/Wishlist/Wishlist';
import Home from '../pages/Home/Home/Home';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import BlogPage from '../pages/Blog/BlogPage';
import Dashboard from '../pages/Dashboard/Dashboard/Dashboard';

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
                path: '/blogpage/:id',
                element: <BlogPage></BlogPage>,
                loader: ({ params }) => fetch(`https://furniture-world-server.vercel.app/blogpage/${params.id}`)
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
                element: <PrivateRoute><Category></Category></PrivateRoute>,
                loader: ({ params }) => fetch(`https://furniture-world-server.vercel.app/category/${params.id}`)
            },
            {
                path: '*',
                element: <ErrorPage></ErrorPage>
            }

        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/myorders',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/myproducts',
                element: <SellerRoute> <MyProducts></MyProducts> </SellerRoute>
            },
            {
                path: '/dashboard/managesellers',
                element: <AdminRoute><AllSellers></AllSellers></AdminRoute>

            },
            {
                path: '/dashboard/manageclients',
                element: <AdminRoute><AllClients></AllClients></AdminRoute>

            },
            {
                path: '/dashboard/mywishlist',
                element: <Wishlist></Wishlist>

            },
            {
                path: '/dashboard/addproduct',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
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