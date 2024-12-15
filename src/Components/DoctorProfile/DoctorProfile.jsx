import React from "react";
import { BiLike } from "react-icons/bi";
import { FaRegMoneyBillAlt, FaTooth } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";
import HeadPart from "../heroSection/HeadPart";
import DocNav from "./DoctorInfo/DocNav";

const DoctorProfile = () => {
  return (
    <>
      <div>
        <HeadPart />
      </div>

      <div className="relative w-full h-auto flex flex-col items-center justify-start px-5 lg:px-6">
        {/* Doctor Details Section */}
        <div className="w-full relative border border-gray-300 rounded-md flex flex-col lg:flex-row items-center p-6 gap-6 mt-10 shadow-md">
          {/* Doctor Image */}
          <div className="img-con w-[160px] md:w-[200px] h-[160px] md:h-[200px] flex justify-center items-center shadow-md shadow-slate-600 rounded-md">
            <img
              src="https://doccure.dreamstechnologies.com/react/template/210634dca875b5880520.jpg"
              alt="Doctor"
              className="object-cover w-full h-full rounded-md"
            />
          </div>

          {/* Doctor Details */}
          <div className="details-con flex-1 space-y-4 text-center lg:text-left">
            <h1 className="text-2xl font-medium">Dr. Darren Elder</h1>
            <p className="text-lg text-gray-700">
              MDS - Periodontology and Oral Implantology, BDS
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-2 text-blue-800">
              <FaTooth />
              <h3 className="text-lg">Dentist</h3>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-1 text-yellow-500">
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoIosStarHalf />
              <p className="text-sm text-gray-600">(72 Reviews)</p>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-600">
              <FaMapLocationDot />
              <p>Anna Nagar, Chennai</p>
            </div>
            <div className="flex justify-center lg:justify-start gap-2 flex-wrap">
              {Array(4)
                .fill(
                  "https://doccure.dreamstechnologies.com/react/template/1eb95d47909144cd3761.jpg"
                )
                .map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] rounded-lg"
                    alt={`Clinic ${index + 1}`}
                  />
                ))}
            </div>
          </div>

          {/* Doctor Extra Details */}
          <div className="details2-con flex flex-col items-center lg:items-start gap-4">
            <div className="like flex items-center gap-2">
              <BiLike />
              <p className="text-sm">98% (Positive)</p>
            </div>
            <div className="feedback flex items-center gap-2">
              <IoChatbubbleEllipsesOutline />
              <p className="text-sm">17 feedback</p>
            </div>
            <div className="fee flex items-center gap-2">
              <FaRegMoneyBillAlt />
              <p className="text-sm">Rs: 300 - 500</p>
            </div>
            <div className="btn-con w-full py-6">
              <Link to={"avaliableslot"}>
                <button className="w-full bg-[#0E82FD] hover:scale-105 transition ease-in-out duration-500 text-white py-2 px-6 rounded-md">
                  Book Appointment
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full px-5 lg:px-6 mt-10">
        <DocNav />
      </div>

      {/* Outlet for Nested Routes */}
      <Outlet />
    </>
  );
};

export default DoctorProfile;
