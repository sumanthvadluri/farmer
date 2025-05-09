
import React, { useEffect } from "react";
import "../styles.css";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { useGetUserProfileQuery } from "../redux/api/users";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // Refetch user data whenever `userInfo` changes
  const { data: user, error, isLoading, refetch } = useGetUserProfileQuery();

  useEffect(() => {
    if (userInfo) {
      refetch(); // Ensure latest user data is fetched after login
    }
  }, [userInfo, refetch]);
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

  if (isLoading) return <p>Loading user data...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {userInfo ? (
        <>
          <Sidebar />
          <div className="page-content">
            <div className="page">
              <h2>User Profile</h2>
              <br />
              <p><strong>Username:</strong> {user?.username}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Location:</strong> {user?.location}</p>
            </div>
          </div>
        </>
      ) : (
        <h1 className="Unauthorized">Login for page Access</h1>
      )}
    </div>
  );
};

export default Profile;

