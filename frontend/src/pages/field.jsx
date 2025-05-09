import React from "react";
import "../styles.css";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Field = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
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
    <div>
      {userInfo && (
        <>
          <Sidebar />
          <div className="page-content">
            <div className="soil-page">
              <div className="soil-container">
                {/* Light Blue Box */}
                <div className="soil-box">
                  <div className="soil-content"><h1>Crop: Wheat</h1></div>
                  <div className="soil-content"><h1>Moisture(%)</h1></div>
                  <div className="soil-content"><h2>29%</h2></div>
                  <div className="soil-content"><h2>Dry Need Watering</h2></div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {!userInfo &&(
        <h1 className="Unauthorized">Login for page Access</h1>
      )}
    </div>
  );
};

export default Field;


