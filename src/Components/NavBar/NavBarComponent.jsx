import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HeaderLogo from "./../../assets/CC_logo3.png";
import { IoMenu, IoPersonCircle, IoLogOutOutline } from "react-icons/io5"; // Removed IoCall as it's not used
import EditProfilePopup from "../UserProfilePopUp/ProfilePopUp";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Find Doctors", path: "/finddoctor" },
  { name: "Medicines", path: "/medicines" },
];

const mobileNavItems = [
  ...navItems, // Keep the existing navItems
  { name: "Contact Us", path: "/contactus" }, // New item for "Contact Us"
  { name: "About Us", path: "/aboutus" }, // New item for "About Us"
];

const Navbarmain = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  
  const userId = localStorage.getItem("userId")


  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      setIsUserLoggedIn(true); // User is logged in
    } else {
      setIsUserLoggedIn(false); // No user logged in
    }

    // Initialize Google Sign-In (if using Google SSO)
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
    // Remove user data from localStorage
    localStorage.removeItem("token");

    // Update login state
    setIsUserLoggedIn(false);

    // Redirect to home or login page
    navigate("/"); // Or redirect to any other page, e.g., home
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-gray-50 shadow-sm shadow-slate-600 px-7 py-4 h-20 flex flex-row flex-wrap justify-between items-center gap-5">
        <Link to={"/"}>
          <div className="max-lg:flex max-lg:justify-center">
            <img
              src={HeaderLogo}
              alt="logo"
              className="w-[150px] h-11 cursor-pointer max-sm:w-[120px] max-sm:h-[35px] sm:max-md:w-[150px] sm:max-md:h-[48px]"
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="flex flex-row flex-wrap justify-center gap-10 max-[900px]:hidden">
          {navItems.map((item, index) => (
            <Link to={item.path} key={index}>
              <span
                className={`py-2 font-bold px-2 ${
                  item.path === location.pathname
                    ? "bg-gradient-to-r from-blue-900 to-blue-500 text-white hover:border-none rounded"
                    : "text-black"
                } hover:border-b-[3px] transition-all duration-150 border-blue-400`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        
        <div className="flex items-center gap-4 max-[900px]:hidden">
          {isUserLoggedIn ? (
            <>
            <Link to={`/Profilepopup/${userId}`}>
            <IoPersonCircle
                className="text-gray-700 text-4xl cursor-pointer hover:text-blue-700 transition-all"
                title="Profile"
              />
            </Link>
            
              <button
                onClick={handleLogout}
                className="py-2 font-bold px-2 text-black border-2 border-blue-400 rounded hover:bg-gradient-to-r from-blue-900 to-blue-500 hover:text-white hover:border-white transition-all duration-150"
              >
                Log out
              </button>
            </>
          ) : (
            <Link to="/login">
              <span className="py-2 font-bold px-2 text-black border-2 border-blue-400 rounded hover:bg-gradient-to-r from-blue-900 to-blue-500 hover:text-white hover:border-white transition-all duration-150">
                Register / Login
              </span>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex flex-row gap-6 justify-center items-center min-[900px]:hidden">
          {isUserLoggedIn ? (
            <>
              <IoPersonCircle
                onClick={togglePopup}
                className="text-gray-700 text-3xl cursor-pointer hover:text-blue-700 transition-all"
                title="Profile"
              />
            </>
          ) : (
            <Link to="/login">
              <span className="py-1 font-medium text-base px-2 text-black border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition-all duration-150">
                Register
              </span>
            </Link>
          )}

          <IoMenu
            onClick={toggleMobileMenu}
            className="text-3xl cursor-pointer"
          />
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-[240px] bg-white shadow-lg z-50 h-full mt-20">
          <div className="flex flex-col justify-start items-start gap-4 py-4 px-3">
            {mobileNavItems.map((item, index) => (
              <Link to={item.path} key={index} onClick={toggleMobileMenu}>
                <span
                  className={`py-2 font-bold px-4 ${
                    item.path === location.pathname
                      ? "bg-gradient-to-r from-blue-900 to-blue-500 text-white rounded border-l-4 px-14  border-blue-400"
                      : "bg-white text-black"
                  } hover:border-b-[3px] transition-all duration-150 border-blue-400`}
                >
                  {item.name}
                </span>
              </Link>
            ))}

            {isUserLoggedIn && (
              <button
                onClick={handleLogout}
                className="text-gray-700 font-bold py-1 px-2 hover:text-red-500 w-full text-left"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}

      {/* Profile Popup */}
      {isPopupOpen && <EditProfilePopup togglePopup={togglePopup} />}
    </>
  );
};

export default Navbarmain;
