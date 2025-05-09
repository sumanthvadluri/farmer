



import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/api/users";
import { logout } from "../redux/features/auth/authSlice";
const Sidebar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall();
      dispatch(logout());
      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (error) {
      console.error(error);
    }
  };
  const location = useLocation(); // Get current URL path

  return (
    <div className="sidebar">
      <div id="heading">
        <h2>Contract🌿Forming</h2>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/presentcrop" className={location.pathname === "/presentcrop" ? "active" : ""}>
              Present-Crop
            </Link>
          </li>
          <li>
            <Link
              to="/addcrop"
              className={location.pathname === "/addcrop" ? "active" : ""}
            >
              Add Crop
            </Link>
          </li>
          <li>
            <Link
              to="/pastcontracts"
              className={location.pathname === "/pastcontracts" ? "active" : ""}
            >
              Contracts
            </Link>
          </li>
          <li>
            <Link
              to="/ongoingcontracts"
              className={location.pathname === "/ongoingcontracts" ? "active" : ""}
            >
              On Going
            </Link>
          </li>
        </ul>
      </nav>
      <Link
              to="/farmerhome"
              className="gohome">
              Go to Home
            </Link>
    </div>
  );
};
export default Sidebar;
