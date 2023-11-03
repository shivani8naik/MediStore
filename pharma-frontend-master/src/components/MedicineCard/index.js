import axios from 'axios'
import React, { useEffect, useState } from 'react'

const MedicineCard = ( {medicine} ) => {
    const addToCart = () => {
        try {
            if (localStorage.getItem("user_id")) {
                axios.post("http://localhost/Pharma/api/medicine/addToCart.php", {
                    user_id: localStorage.getItem("user_id"),
                    medicine_id: medicine.medicine_id
                }).then(res => {
                    console.log(res);
                    alert(`Added to cart ${medicine.name}`)
                })
            } else {
                window.location = "/SignIn"
            }

        } catch (error) {

        }

    }
    return (
        <div className="bg-white h-64 w-52 m-4 rounded-lg flex flex-col overflow-hidden relative shadow-lg shadow-stone-700">
            <div className="img-container relative">
                <img alt='.' src={`data:image/png;base64,${medicine.image}`} className=" mx-auto h-32 sticky top-0  " />

            </div>
            <div className="cart-text px-4  bottom-10">
                <h6 className="text-xs font-bold">{medicine.name}</h6>
                <span>Rs.{medicine.price}</span>
            </div>
            <button onClick={addToCart} className=" absolute bottom-0 w-full bg-sky-500 text-white transition-transform  hover:scale-125 hover:-translate-y-1">Add to Cart</button>
        </div>
    )
}

export default MedicineCard