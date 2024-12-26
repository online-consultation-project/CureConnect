import React from 'react'

import { Outlet } from 'react-router-dom'

const OnlineMain = () => {
  return (
 
    <main className="relative w-full min-h-screen">
      <Outlet />
    </main>
  
   
  )
}

export default OnlineMain
