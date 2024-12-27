import React from "react";
import { MdAddCall } from "react-icons/md";
import { IoMdTime } from "react-icons/io";

const CheckOfflineCardDesign = ({ appointments }) => {
  if (!appointments) {
    return <div className="text-red-500">Error: Appointment data is missing</div>;
  }

  // Format the date properly
  const formattedDate = new Date(appointments.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex flex-col sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {/* Name Section */}
      <div className="text-start">
        <h4 className="font-semibold text-base">{appointments.name || "No Name"}</h4>
      </div>

      {/* Consultation Section */}
      <div className="text-center">
        <p className="font-medium text-gray-600">Consultation:</p>
        <p className="text-gray-950">{appointments.patientConsult || "Not Specified"}</p>
      </div>

      {/* Doctor Section */}
      <div className="text-center">
        <p className="font-medium text-gray-600">Doctor Name:</p>
        <p className="text-gray-950">{appointments.doctorFirstName || "Not Specified"}</p>
      </div>

      {/* Contact Info */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2">
          <MdAddCall />
          <p className="text-gray-600 text-sm">{appointments.phone || "No Phone"}</p>
        </div>
      </div>

      {/* Gender and Age */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2">
          <p className="font-medium text-gray-600">Gender:</p>
          <p className="text-gray-600">{appointments.gender || "Unknown"}</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="font-medium text-gray-600">Age:</p>
          <p className="text-gray-600">{appointments.age || "N/A"}</p>
        </div>
      </div>

      {/* Appointment Type and Date */}
      <div className="text-center">
        <p className="text-base font-sm">{appointments.type || "No Type"}</p>
        <div className="flex items-center justify-center gap-2">
          <IoMdTime className="text-sm" />
          <p className="text-gray-600">{formattedDate || "No Date"}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckOfflineCardDesign;
