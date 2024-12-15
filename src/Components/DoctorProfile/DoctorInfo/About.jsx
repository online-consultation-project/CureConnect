import React, { useState } from "react";
import Overview from "./Overview";

const About = () => {
  const doctors = [
    {
      name: "Dr. John Doe",
      about: "An experienced cardiologist specializing in heart health and treatment.",
      education: [
        { degree: "MBBS", university: "Harvard University", year: "2010" },
        { degree: "MD - Cardiology", university: "Stanford University", year: "2014" },
      ],
      work: [
        { role: "Senior Cardiologist", years: "2015-2023" },
        { role: "Resident Doctor", years: "2010-2015" },
      ],
      services: ["Heart Surgery", "ECG Analysis", "Stress Test"],
    },
    {
      name: "Dr. Jane Smith",
      about: "A skilled dermatologist providing advanced skincare treatments.",
      education: [
        { degree: "MBBS", university: "Johns Hopkins University", year: "2012" },
        { degree: "MD - Dermatology", university: "Yale University", year: "2016" },
      ],
      work: [
        { role: "Lead Dermatologist", years: "2016-2023" },
      ],
      services: ["Acne Treatment", "Skin Biopsy", "Laser Therapy"],
    },
    // Add more doctors as needed
  ];

  // State to track the currently selected doctor
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);

  return (
    <div className="container mx-auto p-6 w-[85%]">
      {/* List of Doctors */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Our Doctors</h1>
        <ul className="space-y-2">
          {doctors.map((doctor, index) => (
            <li
              key={index}
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setSelectedDoctor(doctor)} // Update state with selected doctor
            >
              {doctor.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Doctor Details (Overview) */}
      <Overview
        name={selectedDoctor.name}
        about={selectedDoctor.about}
        education={selectedDoctor.education}
        work={selectedDoctor.work}
        services={selectedDoctor.services}
      />
    </div>
  );
};

export default About;
