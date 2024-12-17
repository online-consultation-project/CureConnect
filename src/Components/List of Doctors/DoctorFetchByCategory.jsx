import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import DoctorCard from "./DoctorCard";
import { toast } from "react-toastify";

const apiUrl = "http://localhost:7000"


const FetchDoctorByCategory = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

const authToken = localStorage.getItem("token")

  console.log(doctors);
  

  const fetchDoctors = async () => {
    try {
      await axios.get(`${apiUrl}/admin/doctors/${category}`,{
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
      .then((res)=>{
            console.log(res.data);
            
          setDoctors(res.data)
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
    if (category){
        fetchDoctors();
    } 
  }, [category]);

  return (
    <div className="doctor-list">
      <h1 className="text-3xl font-bold text-center my-6">
        {category} Specialists
      </h1>
      <div className="grid grid-cols-1 gap-6">
        {doctors.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              image={doctor.profileFileName}
              docName={`${doctor.firstName} ${doctor.lastName}`}
              qualification={`${doctor.UgDegree}, ${doctor.PgDegree}`}
              role={doctor.category}
              location={doctor.location}
              likes={doctor.likes}
              feedback={doctor.feedback}
              consultationFee={doctor.consultationFee}
            />
          ))}
      </div>
    </div>
  );
}

export default FetchDoctorByCategory;
