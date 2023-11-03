import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AdminCart } from '../Cart/adminCart'
import FeedBack from '../Contact/feedBack'

const Dashboard = () => {

    const [Medicines, setMedicines] = useState([])
    const [Categories, setCategories] = useState([])

    const [MedicineInput, setMedicineInput] = useState({
        medicine_id: "",
        medicine_name: "",
        category_id: "",
        price: "",
        image: ""
    })
    const [CategoriesInput, setCategoriesInput] = useState({
        category_id: "",
        category_name: "",
    })
    const getMedicines = async (signal) => {
        // Make a GET request to the URL
        axios.get('http://localhost/Pharma/api/categories/', { signal: signal })
            .then(response => {
                // Use the data as needed
                console.log(response.data);
                setCategories(response.data);
            }).then(axios.get('http://localhost/Pharma/api/medicine/', { signal: signal })
                .then(response => {
                    // Use the data as needed
                    console.log(response.data);
                    setMedicines(response.data);
                })
                .catch(error => {
                    // Handle any errors
                    console.log(error);
                }))


    };

    const MedicineAdd = () => {
        const formData = new FormData();
        formData.append('medicine_name', MedicineInput.medicine_name);
        formData.append('category_id', MedicineInput.category_id);
        formData.append('price', MedicineInput.price);
        if (MedicineInput.image)
            formData.append('image', MedicineInput.image);
        if (MedicineInput.medicine_id)
            formData.append('medicine_id', MedicineInput.medicine_id);
        axios.post('http://localhost/Pharma/api/admin/addMedicine.php', formData)
            .then(response => {
                console.log(response.data);
                if (response.data.success) {
                    alert("Added")
                    window.location.reload();
                }

            })
            .catch(error => {
                // Handle any errors
                console.log(error);
            })
    }
    const CategoriesAdd = () => {
        const formData = new FormData();
        formData.append('category_name', CategoriesInput.category_name);
        if (CategoriesInput.category_id)
            formData.append('category_id', CategoriesInput.category_id);
        axios.post('http://localhost/Pharma/api/admin/addCategory.php', formData)
            .then(response => {
                console.log(response.data);
                if (response.data.success) {
                    alert("Added")
                    window.location.reload();
                }

            })
            .catch(error => {
                // Handle any errors
                console.log(error);
            })
    }
    const DeleteMedicine = () => {
        const formData = new FormData();
        formData.append('medicine_id', MedicineInput.medicine_id);
        axios.post('http://localhost/Pharma/api/admin/deleteMedicine.php', formData)
            .then(response => {
                console.log(response);
                if (response.data.success) {
                    alert("Deleted")
                    window.location.reload();
                }

            })
            .catch(error => {
                // Handle any errors
                console.log(error);
            })
    }
    const DeleteCategory = () => {
        const formData = new FormData();
        formData.append('category_id', CategoriesInput.category_id);
        axios.post('http://localhost/Pharma/api/admin/deleteCategory.php', formData)
            .then(response => {
                console.log(response);
                if (response.data.success) {
                    alert("Deleted")
                    window.location.reload();
                }

            })
            .catch(error => {
                // Handle any errors
                console.log(error);
            })
    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        getMedicines(signal)
        return () => { controller.abort(); };
    }, [])


    return (
        <div className="container bg-gray-100 mx-auto text-center pb-10">
            <h1 className="text-2xl" >Dashboard</h1>
            <h3 className="block w-full bg-gray-500">Categories</h3>
            <div className="flex flex-row flex-wrap p-3 items-center justify-center">
                <div className="edit-categories flex flex-col w-fit gap-2 ">
                    {/* add categories */}
                    <input type="text" placeholder="Enter Category Name" value={CategoriesInput.category_name} onChange={(e) => {
                        setCategoriesInput({
                            ...CategoriesInput,
                            category_name: e.target.value
                        })
                    }} />
                    <input type="text" placeholder="Enter Category Id" disabled value={CategoriesInput.category_id} onChange={(e) => {
                        setCategoriesInput({
                            ...CategoriesInput,
                            category_id: e.target.value
                        })
                    }} />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={CategoriesAdd}>
                        Add
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={DeleteCategory}>
                        Delete
                    </button>
                </div>
                <div className="categories flex flex-row flex-wrap w-fit mx-auto my-4">
                    {
                        Categories.map((category) => {
                            return (
                                <>
                                    <div htmlFor={category.category_id} className="cat_chip " key={`catid${category.category_id}`} onClick={() => {
                                        setCategoriesInput({
                                            category_name: category.category_name,
                                            category_id: category.category_id
                                        })
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                                        </svg>{category.category_name}
                                    </div>
                                </>)
                        })
                    }
                </div>
                <div className="w-screen flex flex-col items-center justify-center">
                    <h3 className="block w-full bg-gray-200 text-2xl items-center">Medicines</h3>
                    <div className="medicine-input flex flex-wrap mt-5 w-fit flex-col gap-2 items-center  justify-center">
                        <input type="text" placeholder="Enter medicine id" disabled value={MedicineInput.medicine_id} onChange={(e) => {
                            setMedicineInput({
                                ...MedicineInput,
                                medicine_id: e.target.value
                            })
                        }} />
                        <input type="text" placeholder="Enter Medicine Name" value={MedicineInput.medicine_name} onChange={(e) => {
                            setMedicineInput({
                                ...MedicineInput,
                                medicine_name: e.target.value
                            })
                        }} />
                        <input type="number" required placeholder="Enter Medicine Price" value={MedicineInput.price} onChange={(e) => {
                            setMedicineInput({
                                ...MedicineInput,
                                price: e.target.value
                            })
                        }} />
                        <select name="category" id="category" value={MedicineInput.category_id} onChange={(e) => {
                            setMedicineInput({
                                ...MedicineInput,
                                category_id: e.target.value
                            })
                        }}>
                            <option value="">Select Category</option>
                            {
                                Categories.map((category) => {
                                    return (
                                        <option key={`cat${category.category_id}`} value={category.category_id}>{category.category_name}</option>
                                    )
                                })
                            }
                        </select>



                        <input type="file" placeholder="Enter Medicine Image" onChange={(e) => {
                            setMedicineInput({
                                ...MedicineInput,
                                image: e.target.files[0]
                            })
                        }} />

                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto w-full" onClick={MedicineAdd}>
                            Add
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-auto w-full" onClick={DeleteMedicine}>
                            Delete
                        </button>



                    </div>
                </div>
                <main className="container mx-auto bg-gray-200 max-h-screen h-full flex flex-row flex-wrap">
                    {Medicines &&
                        Medicines.map((medicine) => {
                            return (
                                <div key={`med${medicine.medicine_id}`} className="bg-white h-64 w-52 m-4 rounded-lg flex flex-col overflow-hidden relative shadow-lg shadow-stone-700">
                                    <div className="img-container relative">
                                        <img alt='.' src={`data:image/png;base64,${medicine.image}`} className=" mx-auto h-32 sticky top-0  " />

                                    </div>
                                    <div className="cart-text px-4  bottom-10">
                                        <h6 className="text-xs font-bold">{medicine.name}</h6>
                                        <span>${medicine.price}</span>
                                    </div>
                                    <button onClick={() => {
                                        setMedicineInput({
                                            medicine_id: medicine.medicine_id,
                                            medicine_name: medicine.name,
                                            category_id: medicine.category_id,
                                            price: medicine.price,
                                            image: medicine.image
                                        })



                                    }} className=" absolute bottom-0 w-full bg-sky-500 text-white transition-transform  hover:scale-125 hover:-translate-y-1">Select</button>
                                </div>
                            )

                        })}
                </main>
            </div>

        </div>
    )
}

export default Dashboard