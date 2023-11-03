import React from 'react'
import axios from 'axios';
import { useState, useEffect } from "react";

function SignUp() {
    const [Formdata, setFormdata] = useState({
        email: "",
        password: "",
        name: "",
        gender: "",
        address: "",
        age: "",
        contact: ""
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
        newForm.append("password", Formdata.password)
        newForm.append("name", Formdata.name)
        newForm.append("gender", Formdata.gender)
        newForm.append("age", Formdata.age)
        newForm.append("contact", Formdata.contact)
        newForm.append("address", Formdata.address)




        console.log(Formdata);
        axios.post("http://localhost/Pharma/api/user/signup.php", newForm)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    alert(res.data);
                    window.location = "/SignIn"
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
            <div className="w-full bg-cover bg-[url('./img/banner2.jpg')]  h-screen mt-1">
                <hr />
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto max-w-lg mt-36" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold " htmlFor="email">Email</label>
                        <input className="shadow appearance-none border rounded mb-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" required type="email" placeholder="Email" value={Formdata.email} onChange={handleChange} />
                        <label className="block text-gray-700 text-sm font-bold " htmlFor="password">Password</label>
                        <input className="shadow appearance-none border rounded mb-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" required type="password" placeholder="Password" value={Formdata.password} onChange={handleChange} />
                        <label className="block text-gray-700 text-sm font-bold " htmlFor="name">Name</label>
                        <input className="shadow appearance-none border rounded mb-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" required type="text" placeholder="Name" value={Formdata.name} onChange={handleChange} />
                        <div className="flex w-full items-center justify-between my-2 ">
                            <label className=" text-gray-700 text-sm font-bold " htmlFor="age">Age
                            </label>
                            <input className="shadow appearance-none border rounded mb-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="age" required type="number" placeholder="Age" value={Formdata.age} onChange={handleChange} />
                            <label className=" text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Gender
                            </label>
                            <select name="gender" id="gender" className=" text-gray-700 text-sm font-bold mb-2" >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        
                        <br />
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">Contact Number</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="contact" required type="number" placeholder="Contact Number" value={Formdata.contact} onChange={handleChange} />
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" required type="text" placeholder="Address" value={Formdata.address} onChange={handleChange} />
                    </div>
                    <div className="flex items-center justify-end">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp