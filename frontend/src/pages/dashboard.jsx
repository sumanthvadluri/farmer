

import React from "react";
import "../styles.css";
import Sidebar from "../components/Sidebar";
import Weather from "../components/weather";
import ForecastWeather from "../components/forecasting";
import CropPriceChart from "../components/pricechart";
import RainfallChart from "../components/rainchart";
import { useSelector } from "react-redux";
import Dheader from "../components/dheader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo === undefined) return;  // ✅ Wait until `userInfo` is defined
    if(!userInfo)
    {
      navigate("/", { replace: true });
    }
    else
    {
    if (userInfo && userInfo.userType !== "farmer") {
      navigate("/seller", { replace: true });
    }
  }
  }, [userInfo, navigate]);

  return (

    // <div className="dheader">Farmer Dashboard</div>
    <div>
      {userInfo && (
        <>
          {/* <Sidebar /> */}
          {/* <Dheader /> */}
          <div className="page-content">
            <div className="flexcont">
          {/* <CropPriceChart />  */}
          <RainfallChart />
          <Weather />
          </div>
          <ForecastWeather />
          </div>
        </>
      )}
      {!userInfo &&(
        <h1 className="Unauthorized">Login for page Access</h1>
      )}
    </div>
  );
};

export default Dashboard;


