// HowItWorks.js
import React from "react";

const HowItWorks = () => {
  return (
    <div className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          How it works
        </h2>

        {/* Steps Section */}
        <div className="flex flex-col md:flex-row items-center justify-between md:space-x-8 mb-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <img
                src="https://via.placeholder.com/32"
                alt="Step 1 Icon"
              />
            </div>
            <p className="text-gray-700">
              Select a specialty or symptom
            </p>
          </div>
          <div className="w-16 h-[1px] bg-gray-300 hidden md:block"></div>
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <img
                src="https://via.placeholder.com/32"
                alt="Step 2 Icon"
              />
            </div>
            <p className="text-gray-700">
              Audio/video call with a verified doctor
            </p>
          </div>
          <div className="w-16 h-[1px] bg-gray-300 hidden md:block"></div>
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <img
                src="https://via.placeholder.com/32"
                alt="Step 3 Icon"
              />
            </div>
            <p className="text-gray-700">
              Get a digital prescription & a free follow-up
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 bg-gray-800 text-white py-6 text-center">
          {/* Stat 1 */}
          <div className="border-b md:border-b-0 md:border-r border-gray-600 px-6 py-4">
            <h3 className="text-2xl font-semibold">2,00,000+</h3>
            <p className="text-gray-300">Happy Users</p>
          </div>
          {/* Stat 2 */}
          <div className="border-b md:border-b-0 md:border-r border-gray-600 px-6 py-4">
            <h3 className="text-2xl font-semibold">20,000+</h3>
            <p className="text-gray-300">Verified Doctors</p>
          </div>
          {/* Stat 3 */}
          <div className="border-b md:border-b-0 md:border-r border-gray-600 px-6 py-4">
            <h3 className="text-2xl font-semibold">25+</h3>
            <p className="text-gray-300">Specialities</p>
          </div>
          {/* Stat 4 */}
          <div className="px-6 py-4">
            <h3 className="text-2xl font-semibold">4.5 / 5</h3>
            <p className="text-gray-300">App Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
