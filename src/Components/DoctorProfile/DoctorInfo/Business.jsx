import React from "react";

const Business = () => {
  return (
    <div className="flex justify-center items-center text-black">
      <div className="container mx-auto w-full sm:w-[85%] p-6">
        <div className="rounded-lg overflow-hidden border border-gray-300 shadow-md">
          <div className="flex justify-between items-center px-4 py-2">
            <div className="flex flex-col sm:items-center">
              <span className="font-bold text-lg py-5">Today</span>
              <span className="text-sm mt-2 sm:mt-0">5 Nov 2019</span>
            </div>
            <span className="text-green-400 font-semibold">Open Now</span>
          </div>
          
          {[ 
            { day: "Monday", time: "07:00 AM - 09:00 PM" },
            { day: "Tuesday", time: "07:00 AM - 09:00 PM" },
            { day: "Wednesday", time: "07:00 AM - 09:00 PM" },
            { day: "Thursday", time: "07:00 AM - 09:00 PM" },
            { day: "Friday", time: "07:00 AM - 09:00 PM" },
            { day: "Saturday", time: "07:00 AM - 09:00 PM" },
            { day: "Sunday", time: "Closed", closed: true },
          ].map(({ day, time, closed }, index) => (
            <div
              key={index}
              className={`flex justify-between px-4 py-2 items-center ${
                closed ? "bg-red-100" : ""
              }`}
            >
              <span>{day}</span>
              <span
                className={`font-semibold ${
                  closed ? "text-red-600" : "text-black"
                }`}
              >
                {time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Business;
