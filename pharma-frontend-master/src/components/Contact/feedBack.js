import React, { useEffect, useState } from 'react'
import axios from 'axios';
const FeedBack = () => {
    const [Feedbacks, setFeedbacks] = useState([])

    const getFeedBack = async (signal) => {
        // Make a GET request to the URL
        axios.post('http://localhost/Pharma/api/contactUs/getContact.php')
            .then(response => {
                // Use the data as needed
                console.log(response.data);
                setFeedbacks(response.data);
            })
            .catch(error => {
                // Handle any errors
                console.log(error);
            })


    };
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        getFeedBack(signal)
        return () => { controller.abort(); };
    }, [])
  return (
    <>
        {
            Feedbacks && Feedbacks.map((item, index) => {
                return (
                    <div className="bg-white h-fit w-full m-4 rounded-lg flex flex-col overflow-hidden relative shadow shadow-stone-800 container mx-auto">
                        <div className="img-container relative">

                        </div>
                        <div className="cart-text px-4  bottom-10">
                            <h6 className="text-xs font-bold">{item.name}</h6>
                            <span>{item.email}</span>
                            <hr />
                            <span className="text-2xl"><code>{item.message}</code></span>
                            <hr />
                            <span className="">{item.contact}</span>
                        </div>
                    </div>
                )
            })
        }
    </>
  )
}

export default FeedBack