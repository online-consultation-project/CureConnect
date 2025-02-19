import React, { useState } from "react";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { Button, Card, Collapse } from "@mui/material";
import { Link } from "react-router-dom";

const jobListings = [
  {
    title: "Digital Marketing Executive",
    urgent: true,
    experience: "0-2 Years in Digital Marketing",
    responsibilities: [
      "Develop and execute marketing campaigns via social media and email.",
      "Optimize SEO and manage paid advertising.",
      "Analyze campaign performance and improve outreach strategies.",
    ],
    qualification: "BBA, MBA, or any degree specialization.",
  },
  {
    title: "Business Development Executive",
    urgent: true,
    experience: "0-2 Years in IT Sales & Marketing.",
    responsibilities: [
      "Develop and execute targeted outreach campaigns via phone, email, and social media.",
      "Proficiency in handling CRM software.",
      "Understand client needs and suggest appropriate IT solutions and services.",
      "Hands-on experience with multiple sales techniques, including cold calling and emailing.",
    ],
    qualification:
      "BBA, MBA, or any degree specialization. Freshers can apply.",
  },
  {
    title: "Software Engineer",
    urgent: false,
    experience: "1-3 Years in Software Development.",
    responsibilities: [
      "Develop and maintain web applications using React and Node.js.",
      "Collaborate with teams to define and implement new features.",
      "Optimize applications for speed and scalability.",
    ],
    qualification:
      "B.Tech, MCA, or equivalent experience in software development.",
  },
];

const JobListings = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#E8EAF0]">
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h2 className="text-4xl py-6 font-bold text-center mb-6">
          Current Openings !!!
        </h2>
        {jobListings.map((job, index) => (
          <Card key={index} className="mb-4 p-6 bg-white rounded-lg shadow-md">
            {/* Job Title & Apply Button */}
            <div className="flex justify-between items-center">
              <div>
                {job.urgent && (
                  <p className="text-red-600 font-bold">** URGENT HIRING **</p>
                )}
                <h3 className="text-xl font-bold text-blue-900">{job.title}</h3>
              </div>
              {/* Link to job details with dynamic index */}
              <Link to={`job/${index}`}>
                <Button
                  variant="contained"
                  color="primary"
                  className="bg-blue-700 text-white hover:bg-blue-800"
                >
                  APPLY NOW
                </Button>
              </Link>
            </div>

            {/* Job Description Toggle */}
            <div className="mt-4 border-t pt-2 flex justify-between items-center">
              <p className="text-lg font-semibold">Job Description</p>
              <button
                onClick={() => toggleOpen(index)}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
              >
                {openIndex === index ? <ExpandLess /> : <ExpandMore />}
              </button>
            </div>

            {/* Collapsible Job Details */}
            <Collapse in={openIndex === index}>
              <div className="mt-2 text-gray-700">
                <p>
                  <strong>Experience:</strong> {job.experience}
                </p>
                <p className="mt-2 font-semibold">Responsibilities:</p>
                <ul className="list-disc list-inside">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
                <p className="mt-2 font-semibold">Qualification:</p>
                <p>{job.qualification}</p>
              </div>
            </Collapse>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobListings;
