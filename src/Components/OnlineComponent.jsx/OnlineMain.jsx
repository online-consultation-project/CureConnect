import React from 'react'
import Navbarmain from '../NavBar/NavBarComponent'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'

const OnlineMain = () => {
  return (
    <>
    {/* <header className=" w-full ">
      <Navbarmain/>
    </header> */}
    <main className="relative w-full min-h-screen">
      <Outlet />
    </main>
    {/* <footer className="relative w-full top-16">
      <Footer/>
    </footer> */}
  </>
   
  )
}

export default OnlineMain
