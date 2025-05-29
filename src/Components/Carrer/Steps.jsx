import React from "react";
import aptitudeIcon from "../../assets/Aptitude.png";
import technicalIcon from "../../assets/Technical-round.png";
import hrIcon from "../../assets/HR.png";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function HiringProcess() {
  return (
    <>
      <div className="relative max-md:h-screen flex  max-sm:pt-20  flex-col items-center  px-4  sm:px-8 md:px-16">
        <div className="relative flex items-center justify-center w-full">
          {/* Dashed line - hidden on sm and md screens */}
          <svg
            className="absolute w-[80%] h-10 top-1/2 -translate-y-1/2 z-0 max-md:hidden lg:block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
          >
            <path
              d="M0 10 Q25 5, 50 10 T100 10"
              fill="transparent"
              stroke="gray"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
          </svg>

          {/* Steps */}
          <div className="w-full flex flex-col sm:flex-row items-center sm:py-12 justify-evenly  max-md:space-y-24 sm:space-x-8">
            {/* Aptitude Step */}
            <div className="relative flex flex-col items-center z-10 mx-6 sm:mx-0">
              <div className="w-full h-24 flex items-center justify-center ">
                <img
                  src={aptitudeIcon}
                  alt="Aptitude"
                  className="w-20 h-20 max-md:w-48 max-md:h-48 md:w-52 md:h-52 max-w-full"
                />
              </div>
              <p className="mt-4 text-base sm:text-lg md:text-xl py-1 font-semibold text-gray-700">
                Aptitude
              </p>
            </div>

            {/* Technical Step */}
            <div className="relative flex flex-col items-center z-10 mx-6 sm:mx-0">
              <div className="w-full h-24 flex items-center justify-center">
                <img
                  src={technicalIcon}
                  alt="Technical"
                  className="w-20 h-20 max-md:w-48 max-md:h-48 md:w-52 md:h-52 max-w-full"
                />
              </div>
              <p className="mt-4 text-base sm:text-lg md:text-xl py-1 font-semibold text-gray-700">
                Technical
              </p>
            </div>

            {/* HR Step */}
            <div className="relative flex flex-col items-center z-10 mx-6 sm:mx-0">
              <div className="w-full h-24 flex items-center justify-center">
                <img
                  src={hrIcon}
                  alt="HR"
                  className="w-20 h-20 max-md:w-48 max-md:h-48 md:w-52 md:h-52 max-w-full"
                />
              </div>
              <p className="mt-4 text-base sm:text-lg md:text-xl py-1 font-semibold text-gray-700">
                HR
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-sm:pt-20  flex items-center max-md:mt-9 ">
        <div className="bg-blue-100 h-52 max-md:h-[300px] rounded-2xl p-6 flex flex-col  md:flex-row items-center max-md:justify-evenly justify-between max-w-6xl mx-auto">
          <h2 className="text-lg sm:text-xl md:text-2xl px-2 lg:text-3xl font-semibold text-black">
            Ready To Embark On Your{" "}
            <span className="text-blue-600">Professional</span> Journey?
          </h2>
          <div className="flex max-md:flex-col gap-4 mt-4 md:mt-0">
            <button className="bg-blue-700   text-white px-6 py-2  max-md:rounded-md rounded-full flex items-center max-md:flex-row gap-2 text-xs sm:text-sm md:text-base font-medium shadow-md hover:bg-blue-800 transition">
              <FaWhatsapp className="text-2xl max-md:text-2xl" />
              WHATSAPP YOUR RESUME TO HR
            </button>
            <button className="bg-blue-700  text-white px-6 py-2  max-md:rounded-md rounded-full flex items-center max-md:flex-row gap-2 text-xs sm:text-sm md:text-base font-medium shadow-md hover:bg-blue-800 transition">
              <FaEnvelope className="text-2xl max-md:text-2xl" />
              EMAIL YOUR RESUME TO HR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
