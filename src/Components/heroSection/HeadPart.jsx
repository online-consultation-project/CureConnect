import React from "react";
import { Link } from "react-router-dom";

const HeadPart = () => {
  return (
    <section className="w-full h-[30vh] bg-gray-100 max-sm:h-[200px] flex justify-center items-center">
      <div className="relative w-full h-full overflow-hidden rounded-b-lg">
        <div
          className="absolute inset-0 w-auto h-auto bg-cover bg-center bg-no-repeat sm:bg-fixed max-sm:bg-top max-sm:bg-cover transition-all duration-500"
          style={{
            backgroundImage: `url("https://hips.hearstapps.com/hmg-prod/images/types-of-doctors-1600114658.jpg?crop=1xw:0.8425829875518672xh;center,top&resize=1200:*")`, // Fixed syntax
          }}
        ></div>

        <div className="w-full h-full bg-black absolute top-0 bg-opacity-65 flex flex-col justify-center items-center px-20 max-sm:px-5">
          <h1 className="text-xl font-bold sm:text-5xl text-white">
            Appiontments
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeadPart;
