import React from "react";
 import { Routes, Route } from "react-router-dom";
import PlantDisease from "./pages/plantdisease.jsx";
import Footer from "./components/Footer.jsx";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/dashboard.jsx";
import ContractForm from "./pages/contractforming.jsx";
import PresentCrop from "./pages/presentcrop.jsx";
import PastContracts from "./pages/pastcontracts.jsx";
import AddCrop from "./pages/addcrop.jsx";
import Profile from "./pages/profile.jsx";
import Settings from "./pages/settings.jsx";
// import Home from "./pages/home.jsx";
import Login from "./pages/Auth/login.jsx"
import Register from "./pages/Auth/register.jsx"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SellerHome from "./pages/sellerhome.jsx";
import RequestCrops from "./pages/requestCrops.jsx";
import AllCrops from "./pages/allcrops.jsx";
import FarmerAcceptContracts from "./pages/farmerOngoing.jsx";
import BuyerAcceptContracts from "./pages/buyerOngoing.jsx";
//  import ChatApp from "./pages/Chatpage";
import HomePage from "./pages/Homepage.jsx";
import Home from "./pages/FarmerHome.jsx";
import ContractFarming from "./pages/ContractFarming.jsx";
import BuyerDashboard from "./pages/buyerDashboard.jsx";
import BuyerContracts from "./pages/buyerContracts.jsx";
import FarmerContracts from "./pages/farmerContracts.jsx";
import RecommendationDetails from "./pages/RecommendationDetails.jsx";
import SoilMonitoring from "./pages/soil-monitoring.jsx";
// import CropRecommendationForm from "./pages/cropRecom.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
const App = () => {
  return (
    // <div className="app-wrapper">
    <div>
       <ToastContainer />
  {/* <div className="app-container"> */}
  <div>
      {/* <Sidebar/> */}
      {/* <div className="page-content"> */}
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/farmerhome" element={<Home />} /> */}
        <Route path="/weather-report" element={<Dashboard />} />
        <Route path="/disease-prediction" element={<PlantDisease />} />
        <Route path="/contractforming" element={<ContractForm/>} />
        <Route path="/presentcrop" element={<PresentCrop />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/addcrop" element={<AddCrop />} />
        <Route path="/pastcontracts" element={<PastContracts />} />
        <Route path="/signup" element={<Register />} />
        {/* <Route path="/seller" element={<SellerHome />}/> */}
        <Route path="/allcrops" element={<AllCrops/>}/>
        <Route path="/requestcrops" element={<RequestCrops/>}/>
        <Route path="/ongoingcontracts" element={<FarmerAcceptContracts/>}/>
        <Route path="/ongoingdeals" element={<BuyerAcceptContracts/>}/>
        {/* <Route path="/chats" element={<ChatApp/>}/> */}
        <Route path="/homepage" element={<HomePage/>}/>
        <Route path="/farmerhome" element={<Home/>}/>
        <Route path="/contract-farming" element={<ContractFarming/>}/>
        <Route path="/seller" element={<BuyerDashboard />} />
        <Route path="/buyercontracts" element={<BuyerContracts />} />
        <Route path="/farmercontracts" element={<FarmerContracts />} />
        <Route path="/details" element={<RecommendationDetails />} />
        <Route path="/category/:categoryName" element={<CategoryPage />}/>
        <Route path="/iot-farming" element={<SoilMonitoring />}/>
        {/* <Route path="/croprecm" element={<CropRecommendationForm />} /> */}
      </Routes>
      </div> 
      {/* </div> */}
        {/* <Footer/> */}
    </div>
  );
};

export default App;