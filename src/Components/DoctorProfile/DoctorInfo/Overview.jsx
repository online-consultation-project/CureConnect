import React from "react";

function Overview({ name, about, education, work, services }) {
  return (
    <div className="bg-white w-full  rounded-lg p-6 mb-6 border-2 shadow-md shadow-slate-400 border-gray-300 ">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{name}</h2>
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">About Me</h3>
      <p className="text-gray-600 mb-6">{about}</p>

      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Education</h3>
      <ul className="mb-6 space-y-2">
        {education.map((edu, i) => (
          <li key={i} className="flex text-gray-600">
            <span className="w-4 h-4 rounded-full bg-blue-200 border border-blue-600 mr-4"></span>
            <span>
              <b>{edu.degree}</b>, {edu.university} <i>({edu.year})</i>
            </span>
          </li>
        ))}
      </ul>

      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Work & Experience</h3>
      <ul className="mb-6 space-y-2">
        {work.map((job, i) => (
          <li key={i} className="flex text-gray-600">
            <span className="w-4 h-4 rounded-full bg-blue-200 border border-blue-600 mr-4"></span>
            <span>
              <b>{job.role}</b> <i>({job.years})</i>
            </span>
          </li>
        ))}
      </ul>

      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Services</h3>
      <div className="grid grid-cols-2 gap-4">
        {services.map((s, i) => (
          <div key={i} className="flex items-center text-gray-600">
            <span className="w-4 h-4 rounded-full bg-blue-200 border border-blue-600 mr-4"></span>
            <span>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Overview;
