import axios from "axios";
import React, { useEffect, useState } from "react";
import MedicineCard from "../MedicineCard";

const Medicines = () => {
  const [Medicines, setMedicines] = useState([])
  const [FilterdMedcines, setFilterdMedcines] = useState([])
  const [Categories, setCategories] = useState([])
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

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getMedicines(signal)
    return () => { controller.abort(); };
  }, [])
  useEffect(() => {
    setFilterdMedcines(Medicines);
  }, [Medicines])

  return (
    <div className="w-full mx-auto ">
      {/* secon nav */}
      <section className="w-full bg-sky-100  flex flex-row justify-start  items-center fixed font-mono z-50">
        <div className="container   flex flex-row   items-center mx-auto">
          <button className="text-3xl justify-center hover:scale-110 font-extrabold ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" />
            </svg>

          </button>
          
          <div className="w-1 h-20 bg-gray-300 mx-10"></div><span className="flex flex-row">Categories
          </span>
          <div className=" w-full flex flex-row gap-3 items-center overflow-x-auto scrollbar-hide">

            {
              Categories.map((category) => {
                return (
                  <div>
                    <input
                      type="radio"
                      name="category"
                      value={category.category_id}
                      className="hidden peer"
                      id={category.category_id}
                    />
                    <label htmlFor={category.category_id} className="cat_chip " onClick={()=>{
                      setFilterdMedcines(Medicines.filter((medicine)=>medicine.category_id==category.category_id))
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                      </svg>{category.category_name}
                    </label>
                  </div>)
              })
            }
            
          </div>
        </div>

      </section>
      {/* main */}
      <main className="container mx-auto bg-gray-200 max-h-screen h-screen pt-28 flex flex-row flex-wrap">
        {FilterdMedcines &&
          FilterdMedcines.map((medicine) => {
            return <MedicineCard medicine={medicine} key={medicine.medicine_id} />;
          })}
      </main>
    </div>
  );
};

export default Medicines;
