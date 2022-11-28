import React from 'react';
import img from '../../../assets/wood.jpg';

const TipsOfWood = () => {
    return (
        <div className='my-40 md:mx-5'>
            <h2 className='text-4xl font-bold text-center mb-12'>Way to find good wood for furniture</h2>
            <div className='md:flex'>
                <div className='w-full md:w-1/2'>
                    <img src={img} alt="" className='mask mask-hexagon' />
                </div>
                <div className='w-full md:w-1/2 my-auto'>
                    <ul className='text-justify text-md'>
                        <li className='list-item list-inside shadow-md p-3 bg-orange-100 my-3 rounded-md'>
                            Look for solid wood. If a store claims that a piece of furniture is solid wood, that means that it only contains wood. Solid wood tends to be more durable, though it is usually more expensive.
                        </li>
                        <li className='list-item list-inside shadow-md p-3 bg-orange-100 my-3 rounded-md'>
                            Expect nine layers or more if you choose plywood. Plywood can be pretty solid and last a good amount of time, as long as it contains enough layers. You should be able to count layers on an exposed side.
                        </li>
                        <li className='list-item list-inside shadow-md p-3 bg-orange-100 my-3 rounded-md'>
                            Look for veneer. Veneer is when a cheaper wood is covered with a thin layer of higher quality wood. It's not as good a quality as solid wood, but solid, beautiful pieces can be made out of veneer.
                        </li>
                        <li className='list-item list-inside shadow-md p-3 bg-orange-100 my-3 rounded-md'>
                            Know your woods. Each type of wood has something different to bring to the table. Some woods are cheap and plentiful, while others will stand the test of time more readily.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TipsOfWood;