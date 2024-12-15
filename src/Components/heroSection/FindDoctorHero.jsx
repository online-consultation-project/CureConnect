import React from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const FindDoctorHeroSection = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/medicine-blue-background-flat-lay_23-2149341573.jpg?uid=R162567627&ga=GA1.1.884605993.1731922461&semt=ais_hybrid')`,
      }}
    >
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-black text-center">
        Search Doctor, Make an Appointment
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-black text-center mb-6 sm:mb-8">
        Discover the best doctors, clinics & hospitals near you.
      </p>

      {/* Search Inputs and Button */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-4xl mb-6">
        {/* First Input with Location Icon */}
        <div className="relative flex-1 min-w-[200px] mb-4 sm:mb-0">
          <div className="absolute inset-y-0 left-3 flex items-center">
            <FiMapPin className="text-black text-lg sm:text-xl md:text-2xl stroke-current stroke-2" />
          </div>
          <input
            type="text"
            placeholder="Search Location"
            className="w-full p-3 pl-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
        </div>

        <div className="relative flex-1 min-w-[250px] mb-4 sm:mb-0">
          <div className="absolute inset-y-0 left-3 flex items-center">
            <FiSearch className="text-black text-lg sm:text-xl md:text-2xl stroke-current stroke-2" />
          </div>
          <input
            type="text"
            placeholder="Search Doctors, Clinics, Hospitals, Diseases Etc"
            className="w-full p-3 pl-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
        </div>

        {/* Search Button */}
        <div className="flex-shrink-0 mb-4 sm:mb-0">
          <button className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 text-white text-lg sm:text-xl md:text-2xl rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 flex justify-center items-center">
          <Link to={"doctors"}>
          <FiSearch className="text-white" />
          </Link>  
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-4xl">
        {/* First Input with Location Icon */}
        <div className=" flex-1 min-w-[200px] mt-0">
          <div className=" inset-y-0 left-3 flex items-center">
            <span className="text-sm font-thin text-gray-500 ">
              Based on your Location
            </span>
          </div>
        </div>

        <div className=" flex-1 min-w-[250px] mt-0">
          <div className=" inset-y-0 left-3 flex items-center">
            <span className="text-sm font-thin text-gray-500">
              Ex: Dental or Sugar Check up etc
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindDoctorHeroSection;
