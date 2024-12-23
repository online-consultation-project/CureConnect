// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import HeaderLogo from "./../../assets/CC_logo3.png";
// import toggleLogo from "./../../assets/CureConnect.png";
// import { IoMenu, IoPersonCircle, IoLogOutOutline } from "react-icons/io5";
// import EditProfilePopup from "../UserProfilePopUp/ProfilePopUp";

// // Desktop and mobile nav items
// const navItems = [
//   { name: "Home", path: "/" },
//   { name: "Find Doctors", path: "/finddoctor" },
//   { name: "Medicines", path: "/medicines" },
// ];

// const mobilenavItems = [
//   { icon: "LuLayoutDashboard", text: "Home", path: "/" },
//   { icon: "FaStethoscope", text: "Find Doctors", path: "/finddoctor" },
//   { icon: "RiContactsFill", text: "Medicines", path: "/medicines" },
//   { icon: "IoMdTimer", text: "Contact Us", path: "/contactus" },
//   { icon: "MdPreview", text: "About Us", path: "/aboutus" },
//   { icon: "IoLogOutOutline", text: "Logout" },
// ];

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const location = useLocation();
//   return (
//     <div
//       className={`fixed top-0 left-0 h-full w-64 bg-blue-950 shadow-lg z-50 transform ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       } transition-transform duration-300`}
//     >
//       <div className="flex justify-end px-4 pt-2">
//         <button onClick={toggleSidebar} className="text-gray-50 text-2xl">
//           &times;
//         </button>
//       </div>
//       <div className="flex items-center justify-center px-4 pb-4 border-b border-gray-300">
//         <img src={toggleLogo} alt="Logo" className="h-14 w-auto" />
//       </div>
//       <div className="flex flex-col gap-4 pt-4">
//         {mobilenavItems.map((item, index) => (
//           <Link
//             key={index}
//             to={item.path}
//             onClick={toggleSidebar}
//             className={`flex items-center gap-3 pl-5 p-3 hover:bg-blue-500 hover:border-l-8 border-white hover:text-white text-gray-50 ${
//               location.pathname === item.path
//                 ? "bg-blue-400 text-white  border-l-8 border-b-white"
//                 : ""
//             }`}
//           >
//             {/* Replace item.icon with actual imported icons */}
//             <span>{item.text}</span>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// const Navbarmain = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     const user = localStorage.getItem("token");
//     if (user) {
//       setIsUserLoggedIn(true); // User is logged in
//     } else {
//       setIsUserLoggedIn(false); // No user logged in
//     }

//     // Initialize Google Sign-In (if using Google SSO)
//     if (window.gapi) {
//       window.gapi.load("auth2", () => {
//         window.gapi.auth2.init({
//           client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with your Google Client ID
//         });
//       });
//     }
//   }, []);

//   const togglePopup = () => setIsPopupOpen(!isPopupOpen);
//   const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsUserLoggedIn(false);
//     navigate("/"); // Redirect to home or login page
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="fixed top-0 w-full z-50 bg-gray-50 shadow-sm shadow-slate-600 px-7 py-4 h-20 flex flex-row flex-wrap justify-between items-center gap-5">
//         <Link to={"/"}>
//           <div className="max-lg:flex max-lg:justify-center">
//             <img
//               src={HeaderLogo}
//               alt="logo"
//               className="w-[150px] h-11 cursor-pointer max-sm:w-[120px] max-sm:h-[35px] sm:max-md:w-[150px] sm:max-md:h-[48px]"
//             />
//           </div>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="flex flex-row flex-wrap justify-center gap-10 max-[900px]:hidden">
//           {navItems.map((item, index) => (
//             <Link to={item.path} key={index}>
//               <span
//                 className={`py-2 font-bold px-2 ${
//                   item.path === location.pathname
//                     ? "bg-gradient-to-r from-blue-900 to-blue-500 text-white hover:border-none rounded"
//                     : "text-black"
//                 } hover:border-b-[3px] transition-all duration-150 border-blue-400`}
//               >
//                 {item.name}
//               </span>
//             </Link>
//           ))}
//         </div>

//         {/* Desktop Login/Profile */}
//         <div className="flex items-center gap-4 max-[900px]:hidden">
//           {isUserLoggedIn ? (
//             <>
//               <Link to={`/Profilepopup/${userId}`}>
//                 <IoPersonCircle
//                   className="text-gray-700 text-4xl cursor-pointer hover:text-blue-700 transition-all"
//                   title="Profile"
//                 />
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="py-2 font-bold px-2 text-black border-2 border-blue-400 rounded hover:bg-gradient-to-r from-blue-900 to-blue-500 hover:text-white hover:border-white transition-all duration-150"
//               >
//                 Log out
//               </button>
//             </>
//           ) : (
//             <Link to="/login">
//               <span className="py-2 font-bold px-2 text-black border-2 border-blue-400 rounded hover:bg-gradient-to-r from-blue-900 to-blue-500 hover:text-white hover:border-white transition-all duration-150">
//                 Register / Login
//               </span>
//             </Link>
//           )}
//         </div>

//         {/* Mobile Menu */}
//         <div className="flex flex-row gap-6 justify-center items-center min-[900px]:hidden">
//           {isUserLoggedIn ? (
//             <>
//               <IoPersonCircle
//                 onClick={togglePopup}
//                 className="text-gray-700 text-3xl cursor-pointer hover:text-blue-700 transition-all"
//                 title="Profile"
//               />
//             </>
//           ) : (
//             <Link to="/login">
//               <span className="py-1 font-medium text-base px-2 text-black border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition-all duration-150">
//                 Register
//               </span>
//             </Link>
//           )}

//           <IoMenu
//             onClick={toggleMobileMenu}
//             className="text-3xl cursor-pointer"
//           />
//         </div>
//       </nav>

//       {/* Mobile Sidebar */}
//       <Sidebar
//         isOpen={isMobileMenuOpen}
//         toggleSidebar={toggleMobileMenu}
//         handleLogout={handleLogout}
//       />

//       {/* Profile Popup */}
//       {isPopupOpen && <EditProfilePopup togglePopup={togglePopup} />}
//     </>
//   );
// };

// export default Navbarmain;


import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import HeaderLogo from "./../../assets/CC_logo3.png";
import toggleLogo from "./../../assets/CureConnect.png";
import { IoMenu, IoPersonCircle, IoLogOutOutline } from "react-icons/io5";
import EditProfilePopup from "../UserProfilePopUp/ProfilePopUp";

// Desktop and mobile nav items
const navItems = [
  { name: "Home", path: "/" },
  { name: "Find Doctors", path: "/finddoctor" },
  { name: "Medicines", path: "/medicines" },
];

const mobilenavItems = [
  { icon: "LuLayoutDashboard", text: "Home", path: "/" },
  { icon: "FaStethoscope", text: "Find Doctors", path: "/finddoctor" },
  { icon: "RiContactsFill", text: "Medicines", path: "/medicines" },
  { icon: "IoMdTimer", text: "Contact Us", path: "/contactus" },
  { icon: "MdPreview", text: "About Us", path: "/aboutus" },
  { icon: "IoLogOutOutline", text: "Logout" },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-blue-950 shadow-lg z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300`}
    >
      <div className="flex justify-end px-4 pt-2">
        <button onClick={toggleSidebar} className="text-gray-50 text-2xl">
          &times;
        </button>
      </div>
      <div className="flex items-center justify-center px-4 pb-4 border-b border-gray-300">
        <img src={toggleLogo} alt="Logo" className="h-14 w-auto" />
      </div>
      <div className="flex flex-col gap-4 pt-4">
        {mobilenavItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 pl-5 p-3 hover:bg-blue-500 hover:border-l-8 border-white hover:text-white text-gray-50 ${
                isActive
                  ? "bg-blue-400 text-white border-l-8 border-b-white"
                  : ""
              }`
            }
          >
            <span>{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

const Navbarmain = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const user = localStorage.getItem("token");
    setIsUserLoggedIn(!!user);

    if (window.gapi) {
      window.gapi.load("auth2", () => {
        window.gapi.auth2.init({
          client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with your Google Client ID
        });
      });
    }
  }, []);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsUserLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-gray-50 shadow-sm shadow-slate-600 px-7 py-4 h-20 flex flex-row flex-wrap justify-between items-center gap-5">
        <NavLink to="/">
          <div className="max-lg:flex max-lg:justify-center">
            <img
              src={HeaderLogo}
              alt="logo"
              className="w-[150px] h-11 cursor-pointer max-sm:w-[120px] max-sm:h-[35px] sm:max-md:w-[150px] sm:max-md:h-[48px]"
            />
          </div>
        </NavLink>

        {/* Desktop Menu */}
        <div className="flex flex-row flex-wrap justify-center gap-10 max-[900px]:hidden">
          {navItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                `py-2 font-bold px-2 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-900 to-blue-500 text-white hover:border-none rounded"
                    : "text-black"
                } hover:border-b-[3px] transition-all duration-150 border-blue-400`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Login/Profile */}
        <div className="flex items-center gap-4 max-[900px]:hidden">
          {isUserLoggedIn ? (
            <>
              <NavLink to={`/Profilepopup/${userId}`}>
                <IoPersonCircle
                  className="text-gray-700 text-4xl cursor-pointer hover:text-blue-700 transition-all"
                  title="Profile"
                />
              </NavLink>
              <button
                onClick={handleLogout}
                className="py-2 font-bold px-2 text-black border-2 border-blue-400 rounded hover:bg-gradient-to-r from-blue-900 to-blue-500 hover:text-white hover:border-white transition-all duration-150"
              >
                Log out
              </button>
            </>
          ) : (
            <NavLink to="/login">
              <span className="py-2 font-bold px-2 text-black border-2 border-blue-400 rounded hover:bg-gradient-to-r from-blue-900 to-blue-500 hover:text-white hover:border-white transition-all duration-150">
                Register / Login
              </span>
            </NavLink>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex flex-row gap-6 justify-center items-center min-[900px]:hidden">
          {isUserLoggedIn ? (
            <IoPersonCircle
              onClick={togglePopup}
              className="text-gray-700 text-3xl cursor-pointer hover:text-blue-700 transition-all"
              title="Profile"
            />
          ) : (
            <NavLink to="/login">
              <span className="py-1 font-medium text-base px-2 text-black border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition-all duration-150">
                Register
              </span>
            </NavLink>
          )}
          <IoMenu
            onClick={toggleMobileMenu}
            className="text-3xl cursor-pointer"
          />
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        toggleSidebar={toggleMobileMenu}
        handleLogout={handleLogout}
      />

      {/* Profile Popup */}
      {isPopupOpen && <EditProfilePopup togglePopup={togglePopup} />}
    </>
  );
};

export default Navbarmain;
