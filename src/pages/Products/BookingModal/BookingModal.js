import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import toast from 'react-hot-toast';


const BookingModal = ({ selectedProduct, setSelectedProduct }) => {

    const { user } = useContext(AuthContext);


    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const price = form.price.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const location = form.location.value;

        //sending data to db
        const booking = {
            productName: selectedProduct.name,
            image: selectedProduct.image,
            price,
            buyer: name,
            email,
            phone,
            location
        }

        fetch('https://furniture-world-server.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setSelectedProduct(null);
                    toast.success('Booking Confirmed');
                }
                else {
                    toast.error(data.message);
                }
            })



    }


    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{selectedProduct?.name}</h3>
                    <form onSubmit={handleBooking} className='grid gap-4 grid-cols-1 mt-10'>
                        <input name='price' type="text" disabled value={selectedProduct?.price} className="input w-full input-bordered" />
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