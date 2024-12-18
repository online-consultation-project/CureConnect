import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const BookAppointment = () => {
  const { doctorId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    age: ''
  });

  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get('date');

  useEffect(() => {
    if (doctorId && date) {
      axios
        .get(`http://localhost:7000/api/slots/user/${doctorId}?date=${date}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        })
        .then((response) => {
          setSlots(response.data.slots || []);
        })
        .catch((error) => {
          console.error('Error fetching slots:', error);
          alert('Error fetching available slots. Please try again later.');
        });
    }
  }, [doctorId, date]);

  const handleSlotSelection = (e) => {
    setSelectedSlot(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails({ ...patientDetails, [name]: value });
  };

  const handleBooking = async () => {
    if (!selectedSlot) {
      alert('Please select a slot.');
      return;
    }

    const paymentData = {
      amount: 500,  // Example amount in INR, adjust accordingly
      currency: 'INR',
      name: patientDetails.name,
      email: patientDetails.email,
      phone: patientDetails.phone,
      gender: patientDetails.gender,
      age: patientDetails.age,
      doctorId,
      date,
      selectedSlot
    };

    try {
      const orderResponse = await axios.post('http://localhost:7000/api/payment/create-order', paymentData);
      if (orderResponse.data.success) {
        const { orderId, paymentOptions } = orderResponse.data;

        const options = {
          key: 'your-razorpay-key', // Replace with your Razorpay key
          amount: paymentOptions.amount,
          currency: paymentOptions.currency,
          name: 'Appointment Booking',
          description: 'Book an appointment with doctor',
          order_id: orderId,
          handler: async function (response) {
            const paymentDetails = {
              ...paymentData,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            };

            try {
              const verifyResponse = await axios.post('http://localhost:7000/api/payment/verify-payment', paymentDetails);
              if (verifyResponse.data.success) {
                // Update the slot as booked in the database
                await axios.post('http://localhost:7000/api/book-appointment', {
                  ...paymentData,
                  status: 'Confirmed',
                });

                // Remove the booked slot from the available slots
                setSlots((prevSlots) => prevSlots.filter(slot => slot !== selectedSlot));

                alert('Appointment booked successfully!');
                navigate('/confirmation');
              } else {
                alert('Payment verification failed!');
              }
            } catch (error) {
              console.error('Error during payment verification:', error);
              alert('Payment verification failed! Please try again.');
            }
          },
          prefill: {
            name: patientDetails.name,
            email: patientDetails.email,
            contact: patientDetails.phone
          },
          theme: {
            color: '#3399cc'
          }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        alert('Error creating payment order. Please try again.');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Error during payment process. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section (Form) */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Book Appointment with Doctor</h2>

          <div className="space-y-4">
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
            className="w-full mt-6 p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Proceed to Payment
          </button>
        </div>

        {/* Right Section (Slots) */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Available Slots</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {slots && slots.length > 0 ? (
              slots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSlot(slot)}
                  className={`w-full p-3 border border-gray-300 rounded-md ${selectedSlot === slot ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                >
                  {slot}
                </button>
              ))
            ) : (
              <p>No available slots</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
