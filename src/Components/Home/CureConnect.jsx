import React from "react";

import { Outlet } from "react-router-dom";
import Navbarmain from "../NavBar/NavBarComponent";
import Footer from "../Footer";

const CureConnect = () => {
  return (
    <>
      <header className="relative w-full ">
        <Navbarmain />
      </header>
      <main className=" w-full px-2 ">
        <Outlet />
      </main>
      <footer className="w-full">
        <Footer />
      </footer>
    </>
  );
};

export default CureConnect;
