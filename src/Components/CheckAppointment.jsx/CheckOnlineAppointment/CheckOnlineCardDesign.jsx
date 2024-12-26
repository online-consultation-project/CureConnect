

import React from "react";
import { MdAddCall, MdOutlineAttachEmail } from "react-icons/md";
import { IoMdTime } from "react-icons/io";

const CheckOnlineCardDesign = ({ appointment }) => {
  if (!appointment) {
    return <div className="text-red-500">Error: Appointment data is missing</div>;
  }
 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 items-center bg-white p-4 rounded-lg shadow-md mb-4 gap-y-4 gap-x-6">
      {/* Name Section */}
      <div className="text-start">
        <h4 className="font-semibold text-base">{appointment.name || "No Name"}</h4>
      </div>

      {/* Consultation Section */}
      <div className="text-center">
        <p className="font-medium text-gray-600">Consultation:</p>
        <p className="text-gray-950">{appointment.patientConsult || "Not Specified"}</p>
      </div>

      {/* Doctor Section */}
      <div className="text-center">
        <p className="font-medium text-gray-600">Doctor Name:</p>
        <p className="text-gray-950">{appointment.doctorFirstName || "Not Specified"}</p>
      </div>

      {/* Contact Info */}
      <div className="text-center">
        {/* <div className="flex items-center justify-center gap-2">
          <MdOutlineAttachEmail />
          <p className="text-gray-600 break-all text-sm">{appointment.email || "No Email"}</p>
        </div> */}
        <div className="flex items-center justify-center gap-2">
          <MdAddCall />
          <p className="text-gray-600 text-sm">{appointment.phone || "No Phone"}</p>
        </div>
      </div>

      {/* Gender and Age */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2">
          <p className="font-medium text-gray-600">Gender:</p>
          <p className="text-gray-600">{appointment.gender || "Unknown"}</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="font-medium text-gray-600">Age:</p>
          <p className="text-gray-600">{appointment.age || "N/A"}</p>
        </div>
      </div>

      {/* Appointment Type and Date */}
      <div className="text-center">
        <p className="text-base font-sm">{appointment.type || "No Type"}</p>
        <div className="flex items-center justify-center gap-2">
          <IoMdTime className="text-sm" />
          <p className="text-gray-600">{appointment.date || "No Date"}</p>
        </div>
      </div>

    </div>
  );
};

export default CheckOnlineCardDesign;
