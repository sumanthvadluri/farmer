import React from "react";
import "../styles.css";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Settings = () => {
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
    <div>
      {userInfo && (
        <>
          <Sidebar />
          <div className="page-content">
            <div className="page">
              <h2>Settings</h2>
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

export default Settings;


