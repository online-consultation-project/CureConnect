import React, { useState, useEffect, useRef } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const FindDoctorHeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("Chennai");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [locationDropdownVisible, setLocationDropdownVisible] = useState(false);
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const dropdownRef = useRef(null);

  const locations = [
    "Adyar",
    "Anna Nagar",
    "Ashok Nagar",
    "Ambattur",
    "Besant Nagar",
    "Broadway",
    "Chromepet",
    "Chetpet",
    "Guindy",
    "Kodambakkam",
    "Koyambedu",
    "Mylapore",
    "Madipakkam",
    "Nungambakkam",
    "Pallavaram",
    "Padi",
    "Perungudi",
    "Purasawalkam",
    "Porur",
    "Saidapet",
    "Tambaram",
    "T Nagar",
    "Thiruvanmiyur",
    "Triplicane",
    "Velachery",
    "Villivakkam",
    "Vandalur",
    "Avadi",
    "Manali",
    "Teynampet",
    "West Mambalam",
    "East Tambaram",
    "Vadapalani",
    "Mogappair",
    "Thirumullaivoyal",
    "Kolathur",
    "Sholinganallur",
    "Navalur",
    "Perumbakkam",
    "Medavakkam",
    "Thoraipakkam",
    "Karapakkam",
    "Ramapuram",
    "Poonamallee",
    "Royapettah",
    "Royapuram",
    "Egmore",
    "Choolaimedu",
    "Aminjikarai",
    "Villivakkam",
    "Vanagaram",
    "Madhavaram",
    "Kotturpuram",
    "CIT Nagar",
    "Indira Nagar",
    "Mugalivakkam",
    "Pallikaranai",
    "Keelkattalai",
    "Thiruneermalai",
    "Peravallur",
    "Jafferkhanpet",
    "Choolai",
    "Nandanam",
    "Nerkundram",
    "Kundrathur",
    "Avadi",
    
  ];

  const categories = [
    "Dentist",
    "Neurology",
    "Cardiologist",
    "Urology",
    "Orthopedic",
  ];

  useEffect(() => {
    if (searchQuery) {
      const filtered = locations.filter((location) =>
        location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations(locations);
    }
  }, [searchQuery]);

  const handleLocationFocus = () => {
    setLocationDropdownVisible(true);
    setCategoryDropdownVisible(false);
  };

  const handleCategoryFocus = () => {
    setCategoryDropdownVisible(true);
    setLocationDropdownVisible(false);
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
            );
            const data = await response.json();
            const detectedLocation =
              data?.address?.city ||
              data?.address?.town ||
              data?.address?.state ||
              "Unknown Location";

            if (detectedLocation !== "Unknown Location") {
              setSearchQuery(detectedLocation);
              alert("Unable to determine your location.");
            }
          } catch (error) {
            console.error("Error fetching location data:", error);
            alert("Error detecting location. Please try again.");
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Unable to access your location. Enable location services.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/medicine-blue-background-flat-lay_23-2149341573.jpg?uid=R162567627&ga=GA1.1.884605993.1731922461&semt=ais_hybrid')`,
      }}
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-black text-center">
        Search Doctor, Make an Appointment
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-black text-center mb-6 sm:mb-8">
        Discover the best doctors, clinics & hospitals near you.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-4xl mb-6">
        <div className="relative flex-1 min-w-[200px]" ref={dropdownRef}>
          <div className="absolute inset-y-0 left-3 flex items-center">
            <FiMapPin className="text-black text-lg sm:text-xl md:text-2xl stroke-current stroke-2" />
          </div>
          <input
            type="text"
            placeholder="Search Location"
            className="w-full p-3 pl-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            value={searchQuery}
            onFocus={handleLocationFocus}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {locationDropdownVisible && (
            <div className="absolute w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 z-10 p-2">
              <button
                className="w-full text-left p-2 text-blue-500 hover:bg-gray-100 mb-2"
                onClick={handleUseMyLocation}
              >
                Use My Location
              </button>
              <ul>
                {filteredLocations.length > 0 ? (
                  filteredLocations.slice(0, 4).map((location, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer text-black"
                      onClick={() => {
                        setSearchQuery(location);
                        setLocationDropdownVisible(false);
                      }}
                    >
                      {location}
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 p-2">No locations found.</p>
                )}
              </ul>
              {filteredLocations.length > 4 && (
                <p className="text-gray-400 p-2 text-center">
                  Type to view more...
                </p>
              )}
            </div>
          )}
        </div>

        <div className="relative flex-1 min-w-[250px]" ref={dropdownRef}>
          <div className="absolute inset-y-0 left-3 flex items-center">
            <FiSearch className="text-black text-lg sm:text-xl md:text-2xl stroke-current stroke-2" />
          </div>
          <input
            type="text"
            placeholder="Search Doctors, Clinics, Hospitals, Diseases Etc"
            className="w-full p-3 pl-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            value={categoryQuery}
            onFocus={handleCategoryFocus}
            onChange={(e) => setCategoryQuery(e.target.value)}
          />
          {categoryDropdownVisible && (
            <div className="absolute w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 z-10 p-2">
              <ul>
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-black"
                    onClick={() => {
                      setCategoryQuery(category);
                      setCategoryDropdownVisible(false);
                    }}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          <button className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 text-white text-lg sm:text-xl md:text-2xl rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 flex justify-center items-center">
          <Link to={"doctors"}><FiSearch className="text-white" />
          </Link>  
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindDoctorHeroSection;
