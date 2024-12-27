import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../ReusableComp/Loader";

import { useParams } from "react-router-dom";
import CheckOfflineCardDesign from "../CheckOnlineAppointment/CheckOnlineCardDesign";

const CheckOfflineMain = () => {
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const { userId } = useParams(); // Correctly destructuring userId from useParams
  const authToken = localStorage.getItem("token");

  const fetchAppointment = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:7000/api/appointment/offlineappointment?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setAppointment(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false in both success and error cases
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, [userId]); // Added userId as a dependency

  return (
    <div className="flex">
      <div className="bg-gray-200 w-full min-h-screen p-7">
        {/* Display loader while data is loading */}
        {loading ? (
          <Loader />
        ) : (
          <div>
            {appointment.map((appointment) => (
              <CheckOfflineCardDesign
                key={appointment._id}
                appointment={{
                  id: appointment._id,
                  name: appointment.patientName,
                  date: new Date(appointment.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }),
                  doctorFirstName: appointment.doctorFirstName,
                  email: appointment.patientEmail,
                  phone: appointment.patientPhone,
                  type: appointment.slot,
                  status: appointment.status,
                  patientConsult: appointment.patientConsult,
                  gender: appointment.patientGender,
                  age: appointment.patientAge,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckOfflineMain;