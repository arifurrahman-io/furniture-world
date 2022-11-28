import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import { Link, Outlet } from 'react-router-dom';
import NaveBar from '../shared/Navebar/Navebar';
import useSeller from '../hooks/useSeller';

const DashboardLayout = () => {

    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);

    return (
        <div>
            <NaveBar></NaveBar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content px-10 py-10">
                    <Outlet></Outlet>
                </div>
                <ul className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <div className="menu bg-[#E6E6FA] p-4 w-80 text-base-content">

                        <div className='px-4'>
                            {
                                user?.photoURL &&
                                <img src={user.photoURL} alt="" className='w-20 rounded-3xl' />
                            }
                            <h4 className='text-lg font-bold'>Wecome {user.displayName}</h4>
                        </div>
                        {
                            !isAdmin && !isSeller &&
                            <>
                                <li><Link to='/dashboard/myorders'>My Orders</Link></li>
                                <li><Link to='/dashboard/mywishlist'>My Wishlist</Link></li>
                            </>
                        }
                        {
                            isAdmin &&
                            <>
                                <li><Link to='/dashboard/managesellers'>All Sellers</Link></li>
                                <li><Link to='/dashboard/manageclients'>All Buyers</Link></li>

                            </>
                        }
                        {
                            isSeller &&
                            <>
                                <li><Link to='/dashboard/myproducts'>My Products</Link></li>
                                <li><Link to='/dashboard/addproduct'>Add A Product</Link></li>
                            </>
                        }

                    </div>

                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;