import { Route, Routes } from "react-router-dom";

import Signin from "./Components/auth/Signin";
import Signup from "./Components/auth/Signup";
import Doctors from "./Components/List of Doctors/DoctorsList";
import DoctorProfile from "./Components/DoctorProfile/DoctorProfile";
import Reviews from "./Components/DoctorProfile/DoctorInfo/Reviews";
import Business from "./Components/DoctorProfile/DoctorInfo/Business";
import About from "./Components/DoctorProfile/DoctorInfo/About";
import BookingForm from "./Components/Checkout/CheckOut";
import Mainslot from "./Components/SlotBooking/Mainslot";
import ProductDescription from "./Components/medi-prod-details/ProductDescription";
import CartPage from "./Components/medi-prod-details/MediCart";
import ProductCards from "./Components/medi-prod-details/ProductCard";
import InfoMap from "./Components/medi-prod-details/InfoMap";
import MediTC from "./Components/medi-prod-details/MediT&C";
import EditProfilePopup from "./Components/UserProfilePopUp/ProfilePopUp";
import CureConnect from "./Components/Home/CureConnect";
import Home from "./Components/Home/Home";
import MedicineHome from "./Components/Home/MediHome";
import Steps from "./Components/Home/steps";
import AboutUs from "./Components/pages/Aboutus";
import FindDoctorHome from "./Components/Home/FindDoctorHome";
import AllCategory from "./Components/Home/AllCategory";
import ErrorPage from "./404-Error";
import ContactUs from "./Components/pages/ContactUs";

const RouteComp = () => {
  return (
    <Routes>
     
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Signin />} />
      <Route path="*" element={<ErrorPage/>}/>
      {/* Doctor section */}

      <Route path="/" element={<CureConnect />}>
        <Route index element={<Home />} />

        <Route path="finddoctor" element={<FindDoctorHome/>}/>
        <Route path="/doctorbycetegory" element={<Doctors/>}/>
        <Route path="finddoctor/doctors" element={<Doctors />} />
        <Route path="/finddoctor/doctors/:_id" element={<DoctorProfile />}>
          <Route index element={<About />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="businesshours" element={<Business />} />
        </Route>
        <Route path="doctorProfile/avaliableslot" element={<Mainslot />} />
        <Route path="doctorProfile/avaliableslot/checkout"  element={<BookingForm />} />
        <Route path="aboutus" element={<AboutUs/>} />
        <Route path="contactus" element={<ContactUs/>} />
        <Route path="Profilepopup"  element={<EditProfilePopup />}  />

        {/* MEDICINE */}

        <Route path="medicines" element={<MedicineHome/>}>
        </Route>
        <Route path="medicines/allcategory" element={<AllCategory/>}/>
       
      </Route>

      {/* Medicine section */}
      <Route path="/mediproduct" element={<ProductCards />} />
      <Route path="/medidetials" element={<ProductDescription />} />
      <Route path="/medicart" element={<CartPage />} />
      <Route path="/info" element={<InfoMap />} />
      <Route path="/termsandconditions" element={<MediTC />} />
      <Route path="/services" element={<Steps />} />
    </Routes>
  );
};

export default RouteComp;

