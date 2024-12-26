import React from "react";
import OnlineCosultationHero from "../heroSection/OnlineConsultationHero";

const OnlineConsultHome = () => {
  return (
    <div className="main min-h-screen">
      <section>
        <div className="hero mb-4">
          <OnlineCosultationHero />
        </div>
        
      </section>

      {/*       
      <section className="w-full">
        <div className="mx-20 max-[425px]:mx-5 max-md:mx-12 max-lg:mx-14 max-xl:mx-16">
          <Specialities topic={"Consult Doctor By Catagory"} />
        </div>
      </section> */}
    </div>
  );
};

export default OnlineConsultHome;
