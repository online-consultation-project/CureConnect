import React from "react";
import passion from "../../assets/Perk-Up-Your-Passion_ (1).jpg";

const Passion = () => {
  return (
    <div className="w-full h-auto flex justify-center items-center flex-col py-6 px-4 sm:px-8 md:px-16">
      <p className="py-6 mt-7 text-xl sm:text-2xl md:text-3xl font-semibold text-center">
        Perk Up Your Passion With CureConnect!
      </p>
      <img src={passion} alt="Passion Image" className="w-full  object-cover rounded-md" />
    </div>
  );
};

export default Passion;
