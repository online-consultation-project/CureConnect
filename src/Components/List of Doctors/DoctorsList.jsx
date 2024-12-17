import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";
import DoctorCard from "./DoctorCard";
import { TbFilterMinus, TbFilterPlus } from "react-icons/tb";
import HeadPart from "../heroSection/HeadPart";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const apiUrl = "http://localhost:7000";

const Doctors = () => {
  const [nearDoctors, setNearDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location");
  const category = searchParams.get("category");
  const authToken = localStorage.getItem("token");


  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/neardoctors`, {
        params: {
          location, 
          category,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setNearDoctors(response.data);
      setFilteredDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error(error.response?.data?.message || "Error fetching doctors");
    }
  };

  const fetchDoctorsByCategory = async () => {
    try {
      const authTokenInFunction = localStorage.getItem("token");
      await axios.get(`${apiUrl}/admin/doctors/${category}`,{
        headers: {
            "Authorization": `Bearer ${authTokenInFunction}`
        }
    })
      .then((res)=>{
            console.log(res.data);
            
          setFilteredDoctors(res.data)
      })
      .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message)
      })
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    if (location || category) {
      fetchDoctors();
    }
    // else if (category) {
    //   fetchDoctorsByCategory()
    // }
  }, [location, category]);

  const applyFilters = (filters) => {
    const { gender, availability, feeRange, date } = filters;

    const filtered = nearDoctors.filter((doctor) => {
      const matchesGender = gender ? doctor.gender === gender : true;
      const matchesAvailability = availability.length
        ? availability.some((a) => doctor.availability.includes(a))
        : true;
      const matchesFee =
        feeRange && doctor.consultationFee
          ? doctor.consultationFee >= feeRange[0] && doctor.consultationFee <= feeRange[1]
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
          {filteredDoctors.map((Doctors) => (
            <DoctorCard
            {...Doctors}
              image={Doctors.profileFileName}
              docName={`${Doctors.firstName} ${Doctors.lastName}`}
              qualification={`${Doctors.UgDegree}, ${Doctors.PgDegree}`}
              role={Doctors.category}
              location={Doctors.location}
              likes={Doctors.likes}
              feedback={Doctors.feedback}
              consultationFee={Doctors.consultationFee}
              
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Doctors;
