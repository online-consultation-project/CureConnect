import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { BiLike } from "react-icons/bi";
import HeadPart from "../../heroSection/HeadPart";
import { toast } from "react-toastify";

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    email: "",
    phone: "",
    consult: "",
    gender: "",
    age: "",
  });

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [doctors, setDoctors] = useState([]);
  const [consultationFee, setConsultationFee] = useState(0);
  const [loading, setLoading] = useState(false);
  const [gstAmount, setGstAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchDoctorDetails = async () => {
    try {
      await axios
        .get(`https://backend-doctor-production.up.railway.app/admin/getadmin/user/?_id=${doctorId}`)
        .then((res) => {
          const doctor = res.data;
          setDoctors([doctor]);
          const fee = doctor.consultationFee || 0;
          const gst = fee * 0.08; // Calculate 8% GST
          setConsultationFee(fee);
          setGstAmount(gst);
          setTotalAmount(fee + gst); // Total amount including GST
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error fetching doctor data", error);
    }
  };

  useEffect(() => {
    if (doctorId || date) {
      axios
        .get(`https://backend-doctor-production.up.railway.app/api/slots/user/${doctorId}?date=${date}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          const { slots, bookedSlots } = response.data;
          setSlots(
            slots.map((slot) => ({
              time: slot,
              isBooked: bookedSlots.includes(slot),
            }))
          );
        })
        .catch((error) => {
          console.error("Error fetching slots:", error);
        });
    }
    fetchDoctorDetails();
  }, [doctorId, date]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails({ ...patientDetails, [name]: value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (
      !selectedSlot ||
      !patientDetails.name ||
      !patientDetails.email ||
      !patientDetails.phone ||
      !patientDetails.consult ||
      !patientDetails.gender ||
      !patientDetails.age
    ) {
      toast.warn("Please select a all fields.");
      return;
    }

    const paymentData = {
      amount: totalAmount,
      currency: "INR",
      name: patientDetails.name,
      email: patientDetails.email,
      phone: patientDetails.phone,
      consult: patientDetails.consult,
      gender: patientDetails.gender,
      age: patientDetails.age,
      doctorId,
      date,
      selectedSlot,
    };
    setLoading(true);
    try {
      const orderResponse = await axios.post(
        "https://backend-doctor-production.up.railway.app/api/payment/create-order",
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
          key: "rzp_test_aEvpBee8OHqhsr",
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
                "https://backend-doctor-production.up.railway.app/api/payment/verify-payment",
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
                  slot: selectedSlot,
                  date,
                  paymentStatus: "Success",
                  doctorFirstName: doctors[0]?.firstName,
                  doctorLastName: doctors[0]?.lastName,
                  doctorCategory: doctors[0]?.category,
                  payment: totalAmount,
                };

                await axios.post(
                  "https://backend-doctor-production.up.railway.app/api/appointment/booking",
                  appointmentData,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );

                setSlots((prevSlots) =>
                  prevSlots.filter((slot) => slot !== selectedSlot)
                );

                toast.success("Appointment booked successfully!");
                navigate(`/finddoctor/confirmation/${userId}`);
              } else {
                toast.error("Payment verification failed!");
              }
            } catch (error) {
              console.error("Error during payment verification:", error);
              toast.error("Payment verification failed! Please try again.");
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
        toast.error("Error creating payment order. Please try again.");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Session expired. Please log in again.");
        window.location.href = "/login";
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeadPart
        heading={"BookAppointment"}
        image={
          "https://img.freepik.com/premium-photo/online-applointment-booking-calendar-modish-regristration-internet-website_31965-260236.jpg?uid=R162550578&ga=GA1.1.1965850165.1734144540&semt=ais_hybrid"
        }
      />
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
                      src={`https://backend-doctor-production.up.railway.app/upload/${doctor.profileFileName}`}
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

            {/* Available Slots */}
            <div className="bg-white p-8 max-md:p-3 rounded-lg shadow-lg mt-8">
              <h3 className="text-xl font-semibold mb-4">Available Slots</h3>
              <div className="mb-4">
                <label
                  htmlFor="appointment-date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Date
                </label>
                <input
                  type="date"
                  id="appointment-date"
                  value={date}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split("T")[0]} // Disables past dates
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-4">
                {slots === null ? (
                  <p>Loading slots...</p>
                ) : slots && slots.length > 0 ? (
                  slots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlotSelection(slot.time)}
                      className={`w-full p-3 border border-gray-300 rounded-md ${
                        slot.isBooked
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : selectedSlot === slot.time
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-700"
                      }`}
                      disabled={slot.isBooked}
                    >
                      {slot.time}
                    </button>
                  ))
                ) : (
                  <p>No slots available on this date</p> // Message when no slots are available
                )}
              </div>
            </div>
          </div>

          {/* Book Appointment Form */}
          <form
            onSubmit={handleBooking}
            className="flex-1 bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold text-center mb-6">
              Book Appointment
            </h2>
            <div className="space-y-6 lg:space-y-8">
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                required
                value={patientDetails.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="email"
                placeholder="Your Email"
                name="email"
                required
                value={patientDetails.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="tel"
                placeholder="Your Phone"
                name="phone"
                required
                value={patientDetails.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Consult For (e.g., fever)"
                name="consult"
                required
                value={patientDetails.consult}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Your Gender"
                name="gender"
                required
                value={patientDetails.gender}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                placeholder="Your Age"
                name="age"
                required
                value={patientDetails.age}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            {/* Payment Section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">
                Payment Summary
              </h3>
              <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center bg-gray-100 p-4 rounded-md shadow-md">
                {/* Payment Details */}
                <div className="flex flex-col justify-between space-y-2">
                  <div className="flex justify-between gap-4 text-gray-600">
                    <p>Consultation Fee:</p>
                    <span className="font-medium">
                      Rs {consultationFee.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4 text-gray-600">
                    <p>GST (8%):</p>
                    <span className="font-medium">
                      Rs {gstAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4 font-bold text-lg mt-2">
                    <p>Total:</p>
                    <span className="text-blue-500">
                      Rs {totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-4 lg:mt-0 lg:ml-4 w-full lg:w-auto">
                  <button
                    type="submit"
                    className={`w-full py-3 px-2 ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    } text-white font-semibold rounded-md`}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Confirm Booking"}
                  </button>
                  
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookAppointment;
