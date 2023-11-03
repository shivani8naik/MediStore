import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const Cart = () => {
    const [Cart, setCart] = useState([])

    const getCart = async (signal) => {
        // Make a GET request to the URL
        let id = localStorage.getItem("user_id")
        console.log(id)
        axios.post('http://localhost/Pharma/api/cart/', {
            user_id: id,
        })
            .then(response => {
                // Use the data as needed
                console.log(response.data);
                setCart(response.data);
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
    const addToCart = (item) => {
        axios.post("http://localhost/Pharma/api/medicine/addToCart.php", {
            user_id: localStorage.getItem("user_id"),
            medicine_id: item.medicine_id
        }).then(res => {
            console.log(res);
            alert(`Added to cart ${item.medicine_name}`)
            const controller = new AbortController();
            const signal = controller.signal;
            getCart(signal)
        })
    }
    const removeFromCart = (item) => {
        axios.post("http://localhost/Pharma/api/medicine/removeFromCart.php", {
            user_id: localStorage.getItem("user_id"),
            medicine_id: item.medicine_id
        }).then(res => {
            console.log(res);
            alert(`Removed from cart ${item.medicine_name}`)
            const controller = new AbortController();
            const signal = controller.signal;
            getCart(signal)
        })
    }

    const pay = () => {
        axios.post("http://localhost/Pharma/api/cart/pay.php", {
            user_id: localStorage.getItem("user_id"),
        }).then(res => {
            console.log(res);
            alert(`Payment Successful`)
            // reload
            const controller = new AbortController();
            const signal = controller.signal;
            getCart(signal)
            
        })
    }


    return (
        <div className="container mx-auto">
            <div className=" bg-gray-50 ">
                {
                    Cart.map((Item) => {
                        return (
                            <>
                                <div className="flex flex-wrap  mt-10 bg-slate-300" key={Item.cart_id}>
                                    <div className="block  w-full">
                                        <h1 className="text-2xl font-bold text-gray-800">Cart ID: {Item.cart_id}</h1>
                                        <h1 className="text-2xl font-bold text-gray-800">Total Price: {Item.total}</h1>
                                        <h1 className="text-2xl font-bold text-gray-800">Status: {Item.status}</h1>
                                        <h1 className="text-2xl font-bold text-gray-800">order_date: {Item.order_date}</h1>
                                        <h1 className="text-2xl font-bold text-gray-800">Is Paid: {Item.ispaid == 1 ? "Yes" : "No"}</h1>
                                        {
                                            Item.ispaid == 1 ? "" : <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={() => pay()}>Pay</button>
                                        }

                                    </div>
                                    {
                                        Item.medicines.map((item) => {
                                            return (<div key={item.medicine_id} className={`bg-white ${Item.ispaid == 1 ? "bg-green-300" : ""} w-100 m-4 rounded-lg flex flex-row items-center overflow-hidden relative shadow-lg shadow-stone-700`}>
                                                <div className="img-container relative">
                                                    <img alt='.' src={`data:image/png;base64,${item.image}`} className=" h-32 sticky top-0  " />
                                                </div>
                                                <div className="cart-text px-4  bottom-10">
                                                    <h6 className="text-xs font-bold">{item.medicine_name}</h6>
                                                    <span>Rs.{item.price}</span>
                                                    <div>
                                                        <button className=" w-5 mx-2 bottom-0 bg-gray-200 text-black transition-transform  hover:scale-125 hover:-translate-y-1" onClick={() => {
                                                            removeFromCart(item)
                                                        }}>-</button>
                                                        <span className=" w-5 mx-2 bottom-0  bg-gray-200 text-black">{item.quantity}</span>
                                                        <button className=" w-5 mx-2 bottom-0  bg-gray-200 text-black transition-transform  hover:scale-125 hover:-translate-y-1" onClick={() => {
                                                            addToCart(item);
                                                        }}>+</button>

                                                    </div>
                                                </div>
                                            </div>)
                                        })
                                    }
                                </div>
                            </>


                        )
                    })
                }
                {/* <button className="p-3 bg-green-600 mx-auto" onClick={pay}>Pay</button> */}


            </div>

        </div>
    )
}
