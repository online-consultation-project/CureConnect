import React from 'react'
import FindDoctorHeroSection from '../heroSection/FindDoctorHero'
import Specialities from './Specialities/Specialities'
import AppointMentInfo from './InstantAppointment'

const  FindDoctorHome = () => {
  return (
    <div className="main min-h-screen">
      <section>
        <div className="hero mb-2">
          <FindDoctorHeroSection/>
        </div>
      </section>
    
       <section>
        <div className="specialities py-8 mt-5">
          <Specialities />
        </div>
      </section>
    
      <section>
        <div className="appointmentinfo py-5 md:py-8 lg:py-5 mt-3 md:mt-5 lg:mt-4 px-4 md:px-10 lg:px-24">
          <AppointMentInfo/>
        </div>
      </section>
    </div>
  )
}

export default  FindDoctorHome
