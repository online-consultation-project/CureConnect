import React from "react";
import { IoStar, IoStarHalf } from "react-icons/io5";
import ReviewForm from "./Reviewform";

const reviews = [
  {
    id: 1,
    name: "Saravanan",
    avatar:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    date: "Reviewed 2 Days ago",
    recommendation: "I recommend the doctor",
    reviewText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    rating: 4,
  },
  {
    id: 2,
    name: "Kalpana",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSldRUVOSAjuhhe7oPfQnhkJa7btW5hme2_8w&s",
    date: "Reviewed 3 Days ago",
    recommendation: "",
    reviewText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Curabitur non nulla sit amet nisl tempus.",
    rating: 4,
  },
  {
    id: 3,
    name: "Sakthi",
    avatar:
      "https://img.freepik.com/premium-photo/indian-male-model_928503-1125.jpg",
    date: "Reviewed 10 Days ago",
    recommendation: "I recommend the doctor",
    reviewText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Curabitur non nulla sit amet nisl tempus.",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Suba",
    avatar:
      "https://i.pinimg.com/736x/c3/e9/7a/c3e97aa255c604a1123e554cc12eefdc.jpg",
    date: "Reviewed 2 weeks ago",
    recommendation: "",
    reviewText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Curabitur non nulla sit amet nisl tempus.",
    rating: 3,
  },
];

const ReviewSection = () => {
  return (
    <div className=" min-h-screen">
      <div className="max-w-7xl max-md:w-full mx-auto  rounded-lg  max-md:p-1 p-5">
        {/* Reviews */}
        <div>
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col sm:flex-row items-start space-x-0 sm:space-x-4 border pb-4 mb-4 bg-white border-gray-300 p-5 rounded-lg"
            >
              {/* Avatar */}
              <img
                src={review.avatar}
                alt={review.name}
                className="w-16 h-16 sm:w-12 sm:h-12 rounded-full mx-auto sm:mx-0"
              />

              {/* Review Content */}
              <div className="mt-4 sm:mt-0">
                <div className="flex justify-between items-center max-md:flex-col">
                  <h3 className="font-semibold text-lg">{review.name}</h3>
                  <span className="text-sm max-sm:text-xs text-gray-500">{review.date}</span>
                </div>

                {review.recommendation && (
                  <p className="text-green-600 font-medium">
                    👍 {review.recommendation}
                  </p>
                )}
                <p className="text-gray-600 mt-2">{review.reviewText}</p>

                {/* Static Star Rating */}
                <div className="flex items-center mt-2">
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStarHalf />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show All Reviews */}
        <div className="flex justify-center mt-4">
          <button className="text-blue-700 text-sm items-center px-4 py-2 bg-blue-300 hover:bg-blue-700 hover:text-white rounded-md transition duration-300">
            Show all Reviews (10)
          </button>
        </div>
      </div>
      <ReviewForm/>
    </div>
  );
};

export default ReviewSection;
