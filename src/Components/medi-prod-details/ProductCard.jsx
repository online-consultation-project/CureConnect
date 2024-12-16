import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { RiHeartAddLine } from "react-icons/ri";
import Heading from "./Title/Title";

const products = [
  {
    id: 1,
    name: "Qunol",
    description: "Bone & Joint Support",
    price: 115.0,
    discount: "41% OFF",
    originalPrice: 193.36,
    image: "https://m.media-amazon.com/images/I/71KXpSjmCwL._AC_SX569_.jpg",
    rating: 4,
    link: "/product/1",
  },
  {
    id: 2,
    name: " Himalayan Organics",
    description: "Helps Increase Focus ",
    price: 137.0,
    discount: "30% OFF",
    originalPrice: 196.48,
    image:
      "https://m.media-amazon.com/images/I/61MAbCvhtsL._AC_UF480,480_SR480,480_.jpg",
    rating: 4,
    link: "/product/2",
  },
  {
    id: 3,
    name: "Chandigarh Ayurved Tablet ",
    description: "Improves the central nervous system",
    price: 125.0,
    discount: "35% OFF",
    originalPrice: 192.0,
    image:
      "https://m.media-amazon.com/images/I/31hL86ySogS._SX300_SY300_QL70_FMwebp_.jpg",
    rating: 4,
    link: "/product/3",
  },
  {
    id: 4,
    name: "Perfectil 30 Tablets",
    description: "For Healthy Skin, Hair, And Nails",
    price: 145.0,
    discount: "25% OFF",
    originalPrice: 190.0,
    image: "https://m.media-amazon.com/images/I/61IjSscvEML._AC_UL320_.jpg",
    rating: 4,
    link: "/product/4",
  },
];

const ProductCards = () => {
  const handleAddToCart = (productImage, e) => {};

  return (
    <div className="h-auto py-4  sm:py-8  lg:px-16 relative">
      <Heading title={"Our Products"} />

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-sm:gap-1 max-md:gap-4  min-lg:gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card bg-white rounded-lg border-2 border-gray-300 hover:border-dashed shadow-md lg:p-4 sm:p-2 max-sm:px-2  max-md:py-2 transform transition-transform hover:scale-105 relative "
          >
            <div className="absolute top-3 right-3 max-md:top-1 max-md:right-1 border border-black rounded-full p-1 flex items-center justify-center z-20">
              <RiHeartAddLine className="text-gray-600 max-md:text-xs" />
            </div>

            <div className="absolute lg:top-2 lg:left-2 bg-green-500 text-white px-2 lg:py-2  rounded-br-xl rounded-tl-md text-xs font-semibold z-20">
              {product.discount}
            </div>

            <div className="relative overflow-hidden rounded-md mt-6 py-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-20  md:h-36 object-contain transition-transform hover:scale-105"
              />
            </div>

            <h2 className="text-xs sm:text-sm md:text-base font-semibold mt-3 sm:mt-4 text-black hover:underline">
              <a href={product.link}>{product.name}</a>
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
              {product.description}
            </p>

            <div className="flex items-center mt-2 sm:mt-3">
              {Array.from({ length: 5 }, (_, i) => (
                <MdOutlineStarPurple500
                  key={i}
                  className={`text-yellow-500 ${
                    i >= product.rating ? "text-gray-300" : ""
                  }`}
                />
              ))}
            </div>

            <div className="mt-3 sm:mt-4 flex items-center space-x-2">
              <div className="text-xs sm:text-sm md:text-lg font-bold text-gray-600">
                ₹{product.price.toFixed(2)}
              </div>
              <div className="text-xs sm:text-sm text-gray-400 line-through">
                ₹{product.originalPrice.toFixed(2)}
              </div>
            </div>

            <div className="mt-4 sm:mt-5 flex items-center justify-between space-x-2">
              <button className="w-full py-1 sm:py-2 md:py-2 bg-transparent border border-blue-600 text-blue-600 text-xs sm:text-sm md:text-sm font-normal rounded-lg hover:bg-blue-500 hover:text-white transition">
                Buy Now
              </button>
              <button
                className="w-full py-1 sm:py-2 md:py-2 bg-blue-600 text-white text-xs sm:text-sm md:text-sm font-medium rounded-lg hover:bg-blue-500 transition flex items-center justify-center"
                onClick={(e) => handleAddToCart(product.image, e)}
              >
                <FaShoppingCart className="mr-2" />
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCards;
