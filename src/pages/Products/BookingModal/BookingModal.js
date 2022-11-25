import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';


const BookingModal = ({ selectedProduct }) => {

    const { user } = useContext(AuthContext);


    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{selectedProduct?.name}</h3>
                    <form className='grid gap-4 grid-cols-1 mt-10'>
                        <input type="text" disabled value={selectedProduct?.price} className="input w-full input-bordered" />
                        <input name='name' type="text" defaultValue={user?.displayName} disabled placeholder='Your Name' className="input w-full input-bordered" />
                        <input name='email' type="email" defaultValue={user?.email} disabled placeholder='Your Email' className="input w-full input-bordered" />
                        <input name='phone' type="text" placeholder='Your Phone Number' className="input w-full input-bordered" />
                        <input name='location' type="text" placeholder='Your Location' className="input w-full input-bordered" />
                        <br />
                        <input className='btn btn-accent  text-white w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;