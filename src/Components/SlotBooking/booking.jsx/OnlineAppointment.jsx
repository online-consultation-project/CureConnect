import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { BiLike } from "react-icons/bi";
import HeadPart from "../../heroSection/HeadPart";
import { toast } from "react-toastify"; // Import toastify

const OnlineBokkingAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [patientDetails, setPatientDetails] = useState({
    name: "",
    email: "",
    phone: "",
    consult: "",
    gender: "",
    age: "",
  });

  const [doctors, setDoctors] = useState([]);

  const fetchDoctorDetails = async () => {
    try {
      await axios
        .get(`http://localhost:7000/admin/getadmin/user/?_id=${doctorId}`)
        .then((res) => {
          setDoctors([res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error fetching doctor data", error);
    }
  };

  useEffect(() => {
    fetchDoctorDetails();
  }, [doctorId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails({ ...patientDetails, [name]: value });
  };

  const handleBooking = async () => {
    const paymentData = {
      amount: doctors[0].consultationFee,
      currency: "INR",
      name: patientDetails.name,
      email: patientDetails.email,
      phone: patientDetails.phone,
      consult: patientDetails.consult,
      gender: patientDetails.gender,
      age: patientDetails.age,
      doctorId,
    };

    try {
      const orderResponse = await axios.post(
        "http://localhost:7000/api/payment/create-order",
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (orderResponse.data.success) {
        const { orderId, paymentOptions } = orderResponse.data;

        const options = {
          key: "rzp_test_aEvpBee8OHqhsr", // Replace with your Razorpay key
          amount: paymentOptions.amount,
          currency: paymentOptions.currency,
          name: "Appointment Booking",
          description: "Book an appointment with doctor",
          order_id: orderId,
          handler: async function (response) {
            const paymentDetails = {
              ...paymentData,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };

            try {
              const verifyResponse = await axios.post(
                "http://localhost:7000/api/payment/verify-payment",
                paymentDetails,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );

              if (verifyResponse.data.success) {
                const appointmentData = {
                  patientName: patientDetails.name,
                  patientEmail: patientDetails.email,
                  patientPhone: patientDetails.phone,
                  patientConsult: patientDetails.consult,
                  patientGender: patientDetails.gender,
                  patientAge: patientDetails.age,
                  userId: localStorage.getItem("userId"),
                  doctorId,
                  paymentStatus: "Success",
                  doctorFirstName: doctors[0]?.firstName,
                  doctorLastName: doctors[0]?.lastName,
                  doctorCategory: doctors[0]?.category,
                  doctorEmail: doctors[0]?.email,
                };

                // Save appointment to database
                await axios.post(
                  "http://localhost:7000/api/zoommetting/create-meeting",
                  appointmentData,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );

                toast.success("Appointment booked successfully!"); // Show success toast
                navigate(`/confirmation/${userId}`);
              } else {
                toast.error("Payment verification failed!"); // Show error toast
              }
            } catch (error) {
              console.error("Error during payment verification:", error);
              toast.error("Payment verification failed! Please try again."); // Show error toast
            }
          },
          prefill: {
            name: patientDetails.name,
            email: patientDetails.email,
            contact: patientDetails.phone,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        toast.error("Error creating payment order. Please try again."); // Show error toast
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error("Error during payment process. Please try again."); // Show error toast
    }
  };

  return (
    <>
      <HeadPart heading={"OnlineBokkingAppointment"} />
      <div className="min-h-screen bg-gray-100 lg:p-10 max-md:p-4">
        <div className="container mx-auto flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
              {doctors.map((doctor) => (
                <div
                  className="doc-con w-full h-auto border-2 bg-white border-gray-300 rounded-md flex flex-col max-lg:min-w-full lg:flex-row justify-evenly items-center p-4 gap-4 shadow-md shadow-slate-400"
                  key={doctor._id}
                >
                  <div className="img-con w-[180px] lg:w-[200px] h-[180px] lg:h-[200px] flex justify-center items-center p-2 shadow-md shadow-slate-600">
                    <img
                      src={`http://localhost:7000/upload/${doctor.profileFileName}`}
                      alt="Doctor"
                      className="object-fill w-full h-full rounded-md"
                    />
                  </div>
                  <div className="details-con flex-1 space-y-3  text-center lg:text-left">
                    <h1 className="text-2xl font-medium">{`${doctor.firstName} ${doctor.lastName}`}</h1>
                    <p className="text-lg text-gray-700">{`${doctor.UgDegree}, ${doctor.PgDegree}`}</p>
                    <div className="icon flex items-center justify-center lg:justify-start gap-2 text-blue-800">
                      <span>{doctor.roleIcon}</span>
                      <h3 className="text-lg">{doctor.category}</h3>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start gap-1 text-yellow-500">
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStarHalf />
                      <p className="text-sm text-gray-600">
                        ({doctor.feedback} Reviews)
                      </p>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-600">
                      <FaMapLocationDot />
                      <p>{doctor.location}</p>
                    </div>
                  </div>
                  <div className="details2-con flex flex-col items-center lg:items-start px-5 gap-4">
                    <div className="like flex items-center gap-2">
                      <BiLike />
                      <p className="text-sm">{doctor.likes} (Positive)</p>
                    </div>
                    <div className="feedback flex items-center gap-2">
                      <IoChatbubbleEllipsesOutline />
                      <p className="text-sm">{doctor.feedback} feedback</p>
                    </div>
                    <div className="fee flex items-center gap-2">
                      <FaRegMoneyBillAlt />
                      <p className="text-sm">Rs: {doctor.consultationFee}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Book Appointment Form */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-center mb-6">
              Book Appointment
            </h2>
            <div className="space-y-6 lg:space-y-8">
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                value={patientDetails.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="email"
                placeholder="Your Email"
                name="email"
                value={patientDetails.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="tel"
                placeholder="Your Phone"
                name="phone"
                value={patientDetails.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Consult For (Like: fever)"
                name="consult"
                value={patientDetails.consult}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Your Gender"
                name="gender"
                value={patientDetails.gender}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                placeholder="Your Age"
                name="age"
                value={patientDetails.age}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <button
              onClick={handleBooking}
              className="w-full mt-5 p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnlineBokkingAppointment;
