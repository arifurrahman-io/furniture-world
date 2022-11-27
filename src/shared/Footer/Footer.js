import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
            <div className="grid grid-flow-col gap-4">
                <Link className="link link-hover">About Us</Link>
                <Link className="link link-hover">Contact</Link>
                <Link className="link link-hover">Privacy Policy</Link>
                <Link className="link link-hover">Terms & Conditions</Link>
            </div>
            <div>
                <p>Copyright © 2022 - All right reserved by Furniture World Ltd</p>
            </div>
        </footer>
    );
};

export default Footer;