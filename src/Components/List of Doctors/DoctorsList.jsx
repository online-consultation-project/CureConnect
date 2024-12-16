import React, { useState } from "react";
import Filter from "./Filter";
import DoctorCard from "./DoctorCard";
import { TbFilterMinus, TbFilterPlus } from "react-icons/tb";
import HeadPart from "../heroSection/HeadPart";

const Doctors = () => {
  const allDoctors = [
    {
      image:
        "https://doccure.dreamstechnologies.com/react/template/210634dca875b5880520.jpg",
      docName: "Dr. Darren Elder",
      qualification: "MDS - Periodontology and Oral Implantology, BDS",
      gender: "Male",
      role: "Dentist",
      availableHours: 2,
      availability: ["Today", "Tomorrow"],
      fees: 400,
      
      location: "Anna Nagar",
    },
    {
      image:
        "https://doccure.dreamstechnologies.com/react/template/bc4e8d916b11472fc805.jpg",
      docName: "Dr. Deborah Angel",
      qualification: "MBBS, MD - General Medicine, DNB - Cardiology",
      gender: "Female",
      role: "Cardiology",
      availableHours: 6,
      availability: ["Tomorrow"],
      fees: 800,
      location: "Tamabaram",
    },
    {
      image:
        "https://doccure.dreamstechnologies.com/react/template/9cdf0ed08dfc33e5e94b.jpg",
      docName: "Dr. Sofia Brient",
      qualification: "MBBS, MS - General Surgery, MCh - Urology",
      gender: "Female",
      role: "Urology",
      availableHours: 24,
      availability: ["Today", "Next 7 Days"],
      fees: 1500,
      location: "Avadi",
    },
  ];

  const [filteredDoctors, setFilteredDoctors] = useState(allDoctors);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false); // State to toggle filter width

  const applyFilters = (filters) => {
    const { gender, availability, feeRange, date } = filters;

    const filtered = allDoctors.filter((doctor) => {
      const matchesGender = gender ? doctor.gender === gender : true;
      const matchesAvailability = availability.length
        ? availability.some((a) => doctor.availability.includes(a))
        : true;
      const matchesFee =
        feeRange && doctor.fees
          ? doctor.fees >= feeRange[0] && doctor.fees <= feeRange[1]
          : true;
      const matchesDate = date ? doctor.availableDates.includes(date) : true;

      return matchesGender && matchesAvailability && matchesFee && matchesDate;
    });

    setFilteredDoctors(filtered);
  };

  return (
    <>
      <div>
        <HeadPart heading={"Doctors"} />
      </div>

      <div className="main w-full h-screen py-5 flex">
        <div
          className={`transition-all duration-300 ${
            isFilterCollapsed ? "w-[50px]" : "lg:w-[25%]"
          } h-screen sticky top-0 border-r-2  rounded-lg p-4`}
        >
          <button
            className="w-full text-black text-xl text-center p-1 rounded-md  "
            onClick={() => setIsFilterCollapsed(!isFilterCollapsed)}
          >
            {isFilterCollapsed ? <TbFilterPlus /> : <TbFilterMinus />}
          </button>

          {!isFilterCollapsed && <Filter onApplyFilters={applyFilters} />}
        </div>

        <div
          className={`transition-all duration-300 ${
            isFilterCollapsed ? "w-full" : "lg:w-[75%]"
          } h-screen overflow-y-auto p-4 space-y-4`}
        >
          {filteredDoctors.map((doctor, index) => (
            <DoctorCard key={index} {...doctor} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Doctors;
