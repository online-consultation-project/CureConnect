import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReviewForm = ({ doctorName }) => {
  const [formData, setFormData] = useState({
    title: "",
    review: "",
    rating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "rating" ? parseInt(value, 10) : value,
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData((prevData) => ({
      ...prevData,
      rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      doctorName,
      ...formData,
    };

    try {
      const response = await axios.post("/api/reviews", reviewData);

      if (response.status === 200 ) {
        toast.success("Review submitted successfully!");
        setFormData({ title: "", review: "", rating: 0 });
      } else {
        toast.error("Failed to submit review!");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center max-h-screen text-black w-full">
      <div className="rounded-lg shadow-md w-[85%] sm:w-[85%] md:w-[85%] lg:w-[85%]">
        <div className="rounded-lg overflow-hidden border border-gray-300 shadow-md shadow-slate-500 p-6 bg-white">
          <h2 className="text-2xl font-medium mb-6">
            Write a review for <span className="text-blue-500">{doctorName}</span>
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Title Input */}
            <div className="mb-4">
              <label className="block text-gray-900 text-lg font-normal mb-2">
                Title of your review
              </label>
              <input
                type="text"
                name="title"
                placeholder="If you could say it in one sentence, what would you say?"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Review Textarea */}
            <div className="mb-4">
              <label className="block text-gray-900 text-lg font-normal mb-2">
                Your review
              </label>
              <textarea
                name="review"
                placeholder="Write your review here..."
                value={formData.review}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                rows="3"
              />
            </div>

            {/* Rating Selection */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Rating
              </label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleRatingClick(star)}
                    className={`cursor-pointer text-2xl hover:text-yellow-500 ${
                      formData.rating >= star ? "text-yellow-500" : "text-gray-400"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <input type="hidden" name="rating" value={formData.rating} />
            </div>

            {/* Terms and Conditions */}
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  required
                />
                <span className="ml-2 text-sm text-gray-700">
                  I have read and accept{" "}
                  <a href="#" className="text-blue-500">
                    Terms & Conditions
                  </a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="w-full flex items-center justify-center">
              <button
                type="submit"
                className="max-w-[50%] bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
              >
                Add Review
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toastify Container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default ReviewForm;
