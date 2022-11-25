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
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-[#FCE2DB] text-base-content">

                        <li><Link to='/dashboard'>My Orders</Link></li>
                        {
                            isAdmin &&
                            <>
                                <li><Link to='/dashboard/myproducts'>My Products</Link></li>
                                <li><Link to='/dashboard/addproduct'>Add A Product</Link></li>
                                <li><Link to='/dashboard/managesellers'>All Sellers</Link></li>
                                <li><Link to='/dashboard/manageclients'>All Cleints</Link></li>
                            </>
                        }
                        {
                            isSeller &&
                            <>
                                <li><Link to='/dashboard/myproducts'>My Products</Link></li>
                                <li><Link to='/dashboard/addproduct'>Add A Product</Link></li>
                            </>
                        }

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;