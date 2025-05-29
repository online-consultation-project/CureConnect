import React from "react";
import Hero from "./Hero";
import Passion from "./Passion";
import HiringProcess from "./Steps";
import JobListings from "./jobOpenings";

const CareerHome = () => {
  return (
    <div>
      <section>
        <Hero />
      </section>
      <section>
        <Passion />
      </section>
      <section>
        <JobListings />
      </section>

      <section className="">
        <HiringProcess />
      </section>
    </div>
  );
};

export default CareerHome;
