// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import HeaderLogo from "./../../assets/CC_logo3.png";
// import { IoMenu, IoPersonCircle } from "react-icons/io5";
// import EditProfilePopup from "../UserProfilePopUp/ProfilePopUp";

// const navItems = [
//   { name: "Home", path: "/cureconnect" },
//   { name: "Find Doctors", path: "/cureconnect/finddoctor" },
//   { name: "Medicines", path: "/cureconnect/medicines" },
//   { name: "Online Consultations", path: "/mediproduct" },
// ];

// const Navbarmain = () => {
//   const location = useLocation();
//   const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

//   const togglePopup = () => {
//     setIsPopupOpen(!isPopupOpen);
//   };

//   return (
//     <>
//       <nav
//         className={`w-full h-auto shadow-lg px-7 py-4 flex flex-row flex-wrap justify-between items-center gap-5`}
//       >
//         <Link to={"/"}>
//           <div>
//             <img
//               src={HeaderLogo}
//               alt="logo"
//               className="w-44 h-14 cursor-pointer max-sm:w-[120px] max-sm:h-[35px] sm:max-md:w-[150px] sm:max-md:h-[48px]"
//             />
//           </div>
//         </Link>

//         <div className="flex flex-row flex-wrap justify-center gap-10 max-lg:hidden">
//           {navItems.map((item, index) => (
//             <Link to={item.path} key={index}>
//               <span
//                 className={`py-2 font-bold px-2 ${
//                   item.path === location.pathname
//                     ? `bg-gradient-to-r from-blue-900 to-blue-500 text-white hover:border-none rounded`
//                     : `bg-white text-black`
//                 } hover:border-b-[3px] transition-all duration-150 border-blue-400`}
//               >
//                 {item.name}
//               </span>
//             </Link>
//           ))}
//         </div>

//         <div className="flex items-center gap-4">
//           <IoPersonCircle
//             onClick={togglePopup} // Open the popup on click
//             className="text-gray-700 text-4xl cursor-pointer hover:text-blue-700 transition-all"
//             title="Profile"
//           />
//         </div>

//         <IoMenu className="text-2xl cursor-pointer lg:hidden" />
//       </nav>

//       {/* Render the popup */}
//       {isPopupOpen && <EditProfilePopup togglePopup={togglePopup} />} {/* Pass togglePopup as prop */}
//     </>
//   );
// };

// export default Navbarmain;


import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderLogo from "./../../assets/CC_logo3.png";
import { IoMenu, IoPersonCircle } from "react-icons/io5";
import EditProfilePopup from "../UserProfilePopUp/ProfilePopUp";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Find Doctors", path: "/finddoctor" },
  { name: "Medicines", path: "/medicines" },
  { name: "Online Consultations", path: "/mediproduct" },
];

const Navbarmain = () => {
  const location = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 bg-white shadow-lg px-7 py-4 flex flex-row flex-wrap justify-between items-center gap-5`}
      >
        <Link to={"/"}>
          <div>
            <img
              src={HeaderLogo}
              alt="logo"
              className="w-32 h-11 cursor-pointer max-sm:w-[120px] max-sm:h-[35px] sm:max-md:w-[150px] sm:max-md:h-[48px]"
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="flex flex-row flex-wrap justify-center gap-10 max-lg:hidden">
          {navItems.map((item, index) => (
            <Link to={item.path} key={index}>
              <span
                className={`py-2 font-bold px-2 ${
                  item.path === location.pathname
                    ? `bg-gradient-to-r from-blue-900 to-blue-500 text-white hover:border-none rounded`
                    : `bg-white text-black`
                } hover:border-b-[3px] transition-all duration-150 border-blue-400`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Profile Icon */}
        <div className="flex items-center gap-4">
          <IoPersonCircle
            onClick={togglePopup}
            className="text-gray-700 text-4xl cursor-pointer hover:text-blue-700 transition-all"
            title="Profile"
          />
        </div>

        {/* Mobile Menu Icon */}
        <IoMenu
          onClick={toggleMobileMenu}
          className="text-2xl cursor-pointer lg:hidden"
        />
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg z-40">
          <ul className="flex flex-col items-center gap-4 py-4">
            {navItems.map((item, index) => (
              <Link to={item.path} key={index} onClick={toggleMobileMenu}>
                <span
                  className={`py-2 font-bold px-2 ${
                    item.path === location.pathname
                      ? `bg-gradient-to-r from-blue-900 to-blue-500 text-white rounded`
                      : `bg-white text-black`
                  } hover:border-b-[3px] transition-all duration-150 border-blue-400`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </ul>
        </div>
      )}

      {/* Profile Popup */}
      {isPopupOpen && <EditProfilePopup togglePopup={togglePopup} />}
    </>
  );
};

export default Navbarmain;
