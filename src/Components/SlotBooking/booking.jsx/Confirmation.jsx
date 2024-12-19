import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import bgImage from "../../../assets/pngwing.com (2).png";
const Confirmation = () => {


  const handleGoHome = () => {
    const navigate = useNavigate();
    navigate('/'); 
  };

  return (
    <>
    <div className="border-2 border-gray-300 shadow-md  mt-12 mb-10 sm:ml-10 sm:mr-10 md:ml-20 md:mr-20 lg:ml-96 lg:mr-96 pt-10 pb-10 pl-2 pr-2">
    <div className="text-center">
      <div className="flex justify-center">
        <img src={bgImage} height="60px" width="60px" alt="tick" />
      </div>

      <h1 className="font-bold text-2xl leading-10 sm:text-xl md:text-2xl lg:text-3xl mt-4">
        Appointment booked Successfully!
      </h1>
      <p className="text-base sm:text-sm md:text-base lg:text-lg mt-4">
        Appointment booked with{" "}
        <span className="font-bold">Dr. Darren Elder</span>
        <br />
        on <span className="font-bold">12 Nov 2023 5:00PM to 6:00PM</span>
        <br />
      </p>
      <button className="border rounded-md bg-green-500 text-white font-bold pl-4 pr-4 pt-2 pb-2 mt-7 text-base sm:text-sm md:text-base lg:text-lg">
        View Invoice
      </button>
    </div>
    
    <Outlet/>
   
  </div>
  <div className='px-9' >
  <button onClick={handleGoHome}  className=' hover:text-blue-600 '>Go to Homepage</button>
  </div>
  </>
  );
};

export default Confirmation;
