import React from 'react';
import { BiLike } from "react-icons/bi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const DoctorCard = ({ 
  image, 
  docName, 
  qualification, 
  roleIcon, 
  role, 
  review, 
  location, 
  sImg1, 
  sImg2, 
  sImg3, 
  sImg4, 
  likes, 
  feedback, 
  fees 
}) => {
  return (
    <div className="doc-con w-full h-auto border-2 border-gray-300 rounded-md flex flex-col lg:flex-row justify-evenly items-center p-4 gap-4 shadow-md shadow-slate-400">
      <div className="img-con w-[150px] lg:w-[200px] h-[100px] lg:h-[200px] flex justify-center items-center p-2 shadow-md shadow-slate-600">
        <img
          src={image}
          alt="Doctor"
          className="object-fill w-full h-full rounded-md"
        />
      </div>

      <div className="details-con flex-1 space-y-3 text-center lg:text-left">
        <h1 className="text-2xl font-medium">{docName}</h1>
        <p className="text-lg text-gray-700">{qualification}</p>
        <div className="icon flex items-center justify-center lg:justify-start gap-2 text-blue-800">
          {roleIcon}
          <h3 className="text-lg">{role}</h3>
        </div>
        <div className="flex items-center justify-center lg:justify-start gap-1 text-yellow-500">
          <IoIosStar />
          <IoIosStar />
          <IoIosStar />
          <IoIosStar />
          <IoIosStarHalf />
          <p className="text-sm text-gray-600">({review} Reviews)</p>
        </div>
        <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-600">
          <FaMapLocationDot />
          <p>{location}</p>
        </div>
        <div className="img-con flex justify-center lg:justify-start gap-2">
          {[sImg1, sImg2, sImg3, sImg4].map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Clinic Image ${index + 1}`}
              className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] rounded-lg"
            />
          ))}
        </div>
      </div>

      <div className="details2-con flex flex-col items-center lg:items-start gap-4">
        <div className="like flex items-center gap-2">
          <BiLike />
          <p className="text-sm">{likes} (Positive)</p>
        </div>
        <div className="feedback flex items-center gap-2">
          <IoChatbubbleEllipsesOutline />
          <p className="text-sm">{feedback} feedback</p>
        </div>
        <div className="fee flex items-center gap-2">
          <FaRegMoneyBillAlt />
          <p className="text-sm">Rs: {fees}</p>
        </div>
        <div className="btn-con flex flex-col gap-2 w-full">
         <Link to={"/cureconnect/doctorProfile"}>
         <button className="w-full bg-[#0E82FD] hover:scale-105 transition ease-in-out duration-500  text-white py-2 px-12 rounded-md">
            View Profile
          </button>
         </Link>
         
          <button className="w-full bg-[#017516] hover:scale-105 transition ease-in-out duration-500 text-white py-2 px-12 rounded-md">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
