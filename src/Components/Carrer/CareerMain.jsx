import React, { useEffect } from "react";

import { Outlet } from "react-router-dom";

const CareerMain = () => {
  return (
    <main className="relative w-full min-h-screen">
      <Outlet />
    </main>
  );
};

export default CareerMain;
