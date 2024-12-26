import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

const CheckAppointmentNav = () => {
  const location = useLocation();
  const userId = localStorage.getItem("userId");

  const navItems = [
    { name: "Offline Appointment", path: `/checkappointment/${userId}` },
    { name: "Online Appointment", path: `/checkappointment/${userId}onlineappointments` },
  ];

  return (
    <nav className="w-full h-auto shadow-md px-5 py-4 shadow-slate-300 flex flex-row flex-wrap justify-around items-center">
      {/* Navigation for larger screens */}
      <div className="flex w-full flex-wrap justify-around max-lg:hidden">
        {navItems.map((item, index) => (
          <Link to={item.path} key={index}>
            <span
              className={`py-2 font-bold px-2 ${
                item.path === location.pathname
                  ? `bg-gradient-to-r from-blue-900 to-blue-500 text-white hover:border-none rounded`
                  : `bg-white text-black`
              } hover:border-b-[3px] transition-all duration-150 border-blue-400`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile menu icon */}
      <IoMenu className="text-2xl cursor-pointer lg:hidden" />
    </nav>
  );
};

export default CheckAppointmentNav;