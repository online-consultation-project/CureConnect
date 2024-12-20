import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-200 border-t border-gray-300 py-6 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="col-span-2">
            <h1 className="text-3xl font-anton text-blue-600 font-bold">
              Cure Connect
            </h1>
            <p className="text-black mt-4 text-sm lg:text-base">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. It has been the industry's standard dummy text ever
              since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived
              not only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-black text-sm lg:text-base">
              <li>
                <a href="#" className="hover:text-blue-600">
                  Doctor Appointment
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Online Consultant
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Pharmacy
                </a>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-3">
              Our Services
            </h4>
            <ul className="space-y-2 text-black text-sm lg:text-base">
              <li>
                <a href="#" className="hover:text-blue-600">
                  Home
                </a>
              </li>
              <li>
                <a href="aboutus" className="hover:text-blue-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="contactus" className="hover:text-blue-600">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Copyright
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-3">Address</h4>
            <ul className="space-y-2 text-black text-sm lg:text-base">
              <li className="inline-flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-600" />
                4/1, Beech Street, Chennai
              </li>
              <li className="inline-flex items-center">
                <FaEnvelope className="mr-2 text-blue-600" />
                cureconnect@example.com
              </li>
              <li className="inline-flex items-center">
                <FaPhone className="mr-2 text-blue-600" />
                +1 315 369 5943
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-8 flex justify-center lg:justify-end space-x-6">
          <a href="#" className="text-black hover:text-blue-600 text-3xl">
            <FaFacebook />
          </a>
          <a href="#" className="text-black hover:text-blue-600 text-3xl">
            <FaInstagram />
          </a>
          <a href="#" className="text-black hover:text-blue-600 text-3xl">
            <FaTwitter />
          </a>
          <a href="#" className="text-black hover:text-blue-600 text-3xl">
            <FaLinkedin />
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 flex flex-col lg:flex-row justify-between items-center text-sm text-gray-500 text-center lg:text-left">
          <p>
            Copyright © 2023 <b>Dreamguys</b>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
