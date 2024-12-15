import React from "react";
import ProductCategory from "../medi-prod-details/CategoryCard";
import personalcare from "../../assets/personal-hygiene (1).png";
import ayurvedic from "../../assets/ayurveda (2).png";
import babycare from "../../assets/maternity.png";
import medication from "../../assets/medicine.png"
import vitamin from "../../assets/supplement.png"
import device from "../../assets/glucosemeter.png"
import pet from "../../assets/pet.png"
import { Outlet } from "react-router-dom";
import Hero from "../heroSection/MainHero";
const AllCategory = () => {
  return (
    <div>
      <div className="main min-h-screen">
        <section>
          <div className="hero mb-4">
     <Hero/>
          </div>
        </section>

        <section>
          <div className="Categoryproduct-1   sm:px-1  mt-5">
            <ProductCategory
              bgColor={"bg-blue-400"}
              iconurl={personalcare}
              category={"Best Sellers in Personal Care"}
            />
          </div>
        </section>

        <section>
          <div className="Categoryproduct-2   sm:px-1  mt-5">
            <ProductCategory
              bgColor={"bg-blue-300"}
              iconurl={ayurvedic}
              category={"Ayurvedic & Healthcare "}
            />
          </div>
        </section>

        <section>
          <div className="Categoryproduct-3  sm:px-1  mt-5">
            <ProductCategory
              bgColor={"bg-blue-500"}
              iconurl={babycare}
              category={"Baby & Mother Care "}
            />
          </div>
        </section>
        <section>
          <div className="Categoryproduct-4  sm:px-1  mt-5">
            <ProductCategory
              bgColor={"bg-blue-300"}
              iconurl={medication}
              category={"Medication "}
            />
          </div>
        </section>
        <section>
          <div className="Categoryproduct-5  sm:px-1  mt-5">
            <ProductCategory
              bgColor={"bg-purple-300"}
              iconurl={vitamin}
              category={"Vitamin and Supplements "}
            />
          </div>
        </section>
        <section>
          <div className="Categoryproduct-6  sm:px-1  mt-5">
            <ProductCategory
              bgColor={"bg-blue-400"}
              iconurl={device}
              category={"Devices "}
            />
          </div>
        </section>
        <section>
          <div className="Categoryproduct-7  sm:px-1  mt-5">
            <ProductCategory
              bgColor={"bg-blue-500"}
              iconurl={pet}
              category={"Pets Care "}
            />
          </div>
        </section>
      </div>
    <Outlet/>
    </div>
  );
};

export default AllCategory;
