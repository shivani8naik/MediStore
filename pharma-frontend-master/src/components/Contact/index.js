import React from 'react'
import axios from 'axios';
import { useState, useEffect } from "react";

function Contact() {
    const [Formdata, setFormdata] = useState({
        email: "",
        name: "",
        contact: "",
        message: ""
    })

    const handleChange = (e) => {
        setFormdata({
            ...Formdata,
            [e.target.id]: e.target.value
        })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        let newForm = new FormData()
        newForm.append("email", Formdata.email)     
        newForm.append("name", Formdata.name)
        newForm.append("contact", Formdata.contact)
        newForm.append("message", Formdata.message)




        console.log(Formdata);
        axios.post("http://localhost/Pharma/api/contactUs/index.php", newForm)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    alert(res.data);
                    window.location = "/"
                }
                else {
                    alert("Error", res.data)
                }
            }
            ).catch(err =>{
                console.log(err);
                alert("Invalid Credentials");
            })
    };
    useEffect(() => {


    }, [])

    return (
        <>
            <div className="w-full bg-[url('./img/banner2.jpg')] h-screen mt-1">
                <hr />
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto max-w-lg mt-36" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold " htmlFor="email">Email</label>
                        <input className="shadow appearance-none border rounded mb-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" required type="email" placeholder="Email" value={Formdata.email} onChange={handleChange} />
                       
                        <label className="block text-gray-700 text-sm font-bold " htmlFor="name">Name</label>
                        <input className="shadow appearance-none border rounded mb-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" required type="text" placeholder="Name" value={Formdata.name} onChange={handleChange} />
                        
                        
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">Contact Number</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="contact" required type="number" placeholder="Contact Number" value={Formdata.contact} onChange={handleChange} />
                        <br />
                        <br />
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Type your message here</label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message"  type="text" placeholder="Message" value={Formdata.msg} onChange={handleChange}  />
                    </div>
                    <div className="flex items-center justify-end">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Contact