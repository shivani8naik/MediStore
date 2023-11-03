import axios from 'axios';
import React from 'react'
import { useState, useEffect } from "react";

function AdminLogin() {
    const [Formdata, setFormdata] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormdata({
            ...Formdata,
            [e.target.id]: e.target.value
        })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // react code to send post request to backend
        let newForm = new FormData()
        newForm.append("email", Formdata.email)
        newForm.append("password", Formdata.password)


        console.log(Formdata);
        axios.post("http://localhost/Pharma/api/admin/adminlogin.php", newForm)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    localStorage.setItem("user_id", res.data.user_id)
                    localStorage.setItem("isSeller", res.data.isSeller)
                    alert("logged in");
                    window.location = "/a/dashboard"
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" required type="email" placeholder="Email" value={Formdata.email} onChange={handleChange} />
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" required type="password" placeholder="Password" value={Formdata.password} onChange={handleChange} />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign In</button>

                    </div>
                </form>
            </div>
        </>
    )
}

export default AdminLogin