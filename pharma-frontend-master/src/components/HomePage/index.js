import React from 'react'

function HomePage() {
  return (
    <>
      <div className="bg-[url('./img/banner2.jpg')] h-screen bg-no-repeat bg-cover">
        <div className="bg-black bg-opacity-50 h-full ">
          <div className="container mx-auto h-full flex flex-col  items-center pt-96">
            <h1 className="text-5xl font-bold text-white">MediStore</h1>
            <p className="text-2xl text-white">Your one stop shop for all your medical needs</p>
            {/* <button className="bg-blue-400  hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mt-14 border border-gray-400 rounded shadow">Shop here</button> */}
          </div>
        </div>




      </div>

    </>
  );
}

export default HomePage