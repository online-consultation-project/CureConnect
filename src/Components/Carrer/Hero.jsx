import React from "react";
import banner from "../../assets/banner2.avif";
const Hero = () => {
  return (
    <div>
      <div
        className="relative w-full text-white py-10 px-2 md:px-16 bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="relative w-full text-white py-10 px-6 md:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
            {/* Left Content */}
            <div className="md:w-2/3 bg-gray-700 bg-opacity-55 p-6 rounded-lg">
              <h3 className="text-lg font-semibold">Our People</h3>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                The True Treasures of Our Success!
              </h2>
              <p className="mt-4 text-sm md:text-base">
                Webnox Technologies is a Web Design, Development, Software
                Development & Digital marketing company with 14+ years of
                experience. At Webnox, there’s always space for brilliant people
                who are passionate about digital and are constantly looking
                ahead to see what’s next.
              </p>
              <div className="mt-6 flex items-center space-x-3 bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md w-fit">
                <span className="text-lg">📞</span>
                <span className="font-medium">HR : +91 63743 82502</span>
              </div>
            </div>
            {/* Right Content */}
            <div className="mt-6 md:mt-0 md:w-1/3 flex justify-center">
              <button className="bg-white text-blue-600 font-bold text-4xl px-6 py-3 rounded-full shadow-md">
                WE'RE HIRING <br />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
