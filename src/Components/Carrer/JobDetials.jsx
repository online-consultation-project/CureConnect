import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { MdOutlineEmail, MdLink } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

const JobDetails = () => {
  // Get the job ID from the URL parameters
  const { id } = useParams();

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div
        className="relative w-full bg-cover bg-center h-64 flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/1600x900/?office')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="text-center text-white relative z-10">
          <p className="text-lg font-semibold">Cure Connect | Full time</p>
          <h1 className="text-3xl font-bold">
            Full Stack Developer (0.6 months - 1 year)
          </h1>
          <p className="mt-2">Coimbatore, India | Posted on 01/23/2025</p>

          {/* Buttons */}
          <div className="mt-4 flex justify-center gap-4">
            {/* Dynamically link to the form page using the job id */}
            <Link to={`/career/job/${id}/form`}>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                I'm interested
              </button>
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="mt-4 flex justify-center gap-4 text-white">
            <FaFacebookF className="cursor-pointer hover:text-gray- text-xl" />
            <FaTwitter className="cursor-pointer hover:text-gray- text-xl" />
            <FaLinkedinIn className="cursor-pointer hover:text-gray- text-xl" />
            <FaWhatsapp className="cursor-pointer hover:text-gray- text-xl" />
            <MdOutlineEmail className="cursor-pointer hover:text-gray- text-xl" />
            <MdLink className="cursor-pointer hover:text-gray- text-xl" />
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 p-6">
        {/* Left Section */}
        <div className="md:w-2/3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">About Us</h2>
            <p className="mt-2 text-gray-600">
              We offer end-to-end services for Zoho Products, including
              Consulting, Implementation, Development, Integration, Deployment,
              Training, and Support. Our company has been a pioneer in the IT
              services industry, helping businesses streamline their operations
              and improve efficiency through automation. We pride ourselves on
              delivering high-quality solutions that not only meet our clients'
              needs but also exceed their expectations.
            </p>
            <p className="mt-2 text-gray-600">
              Our team of experts specializes in understanding the specific
              requirements of each client and providing tailored solutions that
              align with their business goals. We work with clients across
              various industries, including healthcare, finance, education, and
              retail.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-2xl font-semibold">Job Description</h2>
            <p className="mt-2 text-gray-600">
              We are looking for a passionate and enthusiastic{" "}
              <strong>Full Stack Developer</strong> to join our dynamic team.
              The ideal candidate will be responsible for building and
              maintaining web applications that are scalable, efficient, and
              user-friendly.
            </p>
            <h3 className="mt-4 font-semibold">Key Responsibilities:</h3>
            <ul className="list-disc pl-6">
              <li>
                Collaborate with designers and front-end developers to implement
                intuitive and responsive user interfaces using HTML, CSS, and
                JavaScript.
              </li>
              <li>
                Develop and maintain web applications using frameworks like
                React, Angular, and Node.js.
              </li>
              <li>
                Design and implement database schemas using SQL and NoSQL
                databases (e.g., MongoDB, MySQL).
              </li>
              <li>
                Ensure cross-browser compatibility and optimize web applications
                for maximum speed and scalability.
              </li>
              <li>
                Write clean, reusable, and efficient code while following
                industry best practices.
              </li>
              <li>
                Implement security and data protection features within the
                application to safeguard user information.
              </li>
              <li>
                Work closely with the product team to understand the
                requirements and deliver solutions in a timely manner.
              </li>
              <li>
                Continuously improve your skills and knowledge in new
                technologies and methodologies.
              </li>
            </ul>
            <h3 className="mt-4 font-semibold">Qualifications:</h3>
            <ul className="list-disc pl-6">
              <li>
                Bachelor's degree in Computer Science or related field, or
                equivalent work experience.
              </li>
              <li>
                Proven experience as a Full Stack Developer with knowledge of
                web development frameworks (React, Angular, Node.js).
              </li>
              <li>
                Strong proficiency in JavaScript, HTML5, CSS3, and web
                standards.
              </li>
              <li>
                Experience with backend technologies such as Node.js, Express,
                and RESTful APIs.
              </li>
              <li>Familiarity with version control tools such as Git.</li>
              <li>
                Excellent problem-solving skills and the ability to work under
                pressure in a fast-paced environment.
              </li>
            </ul>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="md:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Job Information</h2>
            <div className="mt-4 text-gray-700">
              <p>
                <strong>Date Opened:</strong> 01/23/2025
              </p>
              <p className="mt-2">
                <strong>Job Type:</strong> Full time
              </p>
              <p className="mt-2">
                <strong>Industry:</strong> IT Services
              </p>
              <p className="mt-2">
                <strong>Work Experience:</strong> 0.6 - 1 year
              </p>
              <p className="mt-2">
                <strong>Location:</strong> Coimbatore, India
              </p>
              <p className="mt-2">
                <strong>Salary:</strong> Competitive, based on experience
              </p>
              <p className="mt-2">
                <strong>Application Deadline:</strong> 02/28/2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
