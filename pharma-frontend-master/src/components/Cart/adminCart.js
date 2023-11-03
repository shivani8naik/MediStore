import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const AdminCart = () => {
    const [Users, setUsers] = useState([])
    const [Cart, setCart] = useState([])
    const [FilterUsers, setFilterUsers] = useState([])
    useEffect(() => {
        setFilterUsers(Users);
    }, [Users])

    const getCart = async (signal) => {
        // Make a GET request to the URL
        let id = localStorage.getItem("user_id")
        console.log(id)
        axios.get('http://localhost/Pharma/api/cart/adminCart.php')
            .then(response => {
                // Use the data as needed
                console.log(response.data);
                setUsers(response.data);
            })
            .catch(error => {
                // Handle any errors
                console.log(error);
            })


    };
    const ChangeStatus = async (cart, change) => {
        console.log(cart)
        axios.post('http://localhost/Pharma/api/cart/updateStatus.php', {
            cart_id: cart,
            status: change
        })
            .then(response => {
                alert(response.data.message)
                const controller = new AbortController();
                const signal = controller.signal;
                getCart(signal)
            })
            .catch(error => {
                // Handle any errors
                console.log(error);
            })


    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        getCart(signal)
        return () => { controller.abort(); };
    }, [])


    return (
        <div className="container mx-auto pb-10 pt-10">
            <div className="container mx-auto pb-10 flex gap-2">
                <div>
                    <input
                        type="radio"
                        name="category"
                        value="All"
                        className="hidden peer"
                        id="All"
                    />
                    <label htmlFor="All" className="cat_chip " onClick={() => {
                        setFilterUsers(Users)
                    }}>
                        All
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="category"
                        value="Processing"
                        className="hidden peer"
                        id="Processing"
                    />
                    <label htmlFor="Processing" className="cat_chip " onClick={() => {
                        setFilterUsers(Users.filter((user) => user.status === "Processing"))
                    }}>
                        Processing
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="category"
                        value="Shipped"
                        className="hidden peer"
                        id="Shipped"
                    />
                    <label htmlFor="Shipped" className="cat_chip " onClick={() => {
                        setFilterUsers(Users.filter((user) => user.status === "Shipped"))
                    }}>
                        Shipped
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="category"
                        value="Delivered"
                        className="hidden peer"
                        id="Delivered"
                    />
                    <label htmlFor="Delivered" className="cat_chip " onClick={() => {
                        setFilterUsers(Users.filter((user) => user.status === "Delivered"))
                    }}>
                        Delivered
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="category"
                        value="Cancelled"
                        className="hidden peer"
                        id="Cancelled"
                    />
                    <label htmlFor="Cancelled" className="cat_chip " onClick={() => {
                        setFilterUsers(Users.filter((user) => user.status === "Cancelled"))
                    }}>
                        Cancelled
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="category"
                        value="Pending"
                        className="hidden peer"
                        id="Pending"
                    />
                    <label htmlFor="Pending" className="cat_chip " onClick={() => {
                        setFilterUsers(Users.filter((user) => user.status === "Pending"))
                    }}>
                        Pending
                    </label>
                </div>
            </div>

            <div>
                {FilterUsers &&
                    FilterUsers.map((user) => {
                        return (
                            <div key={user.cart_id} className="bg-white w-100 m-4 rounded-lg flex flex-col  flex-wrap overflow-hidden relative shadow shadow-stone-700">
                                <div className=" px-4 block w-full">
                                    <br />
                                    <span>Cart: {user.cart_id}</span>
                                    <br />
                                    <h6 className="text-2xl font-bold">{user.name}</h6>
                                    <hr />
                                    <span><b>₹{user.total}</b></span>
                                    <br />
                                    <span>date: {user.order_date}</span>
                                    <br />
                                    <span className="text-green-600 font-bold text-lg">{user.ispaid ? "Paid" : "Not Paid"}</span>

                                </div>
                                <div className="flex flex-row">
                                    {
                                    user.medicines.map((item) => {
                                        return (
                                            <div key={item.medicine_id} className="bg-white w-100 m-4 rounded-lg flex flex-row items-center overflow-hidden relative shadow shadow-stone-700">
                                                <div className="img-container relative">
                                                    <img alt='.' src={`data:image/png;base64,${item.image}`} className=" h-32 sticky top-0  " />
                                                </div>
                                                <div className="cart-text px-4  bottom-10">
                                                    <h6 className="text-xs font-bold">{item.medicine_name}</h6>
                                                    <span>₹{item.price}</span>
                                                    <br />
                                                    <span>Quantity{item.quantity}</span>
                                                    <div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                </div>
                                
                                <br />
                                <div className=" px-4 block w-fit gap-2">
                                    <h6 className="text-xs font-bold">Address</h6>
                                    <span>
                                        <code>{user.address}</code></span>
                                    <br />
                                    <span>{user.status}</span>
                                    <br />
                                    <div className="flex flex-row pb-2 gap-2">

                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => {
                                            ChangeStatus(user.cart_id, "Processing")
                                        }}>Processing</button>

                                        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg" onClick={() => {
                                            ChangeStatus(user.cart_id, "Shipped")
                                        }}>Shipped</button>


                                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={() => {
                                            ChangeStatus(user.cart_id, "Delivered")
                                        }}>Delivered</button>
                                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => {
                                            ChangeStatus(user.cart_id, "Cancelled")
                                        }}>Cancel</button>


                                    </div>
                                </div>
                            </div>
                        )
                    })
                }





            </div>

        </div>
    )
}
