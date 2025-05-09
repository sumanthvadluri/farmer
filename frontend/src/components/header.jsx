import React from "react";
import "../styles.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="heroSection">
        <h2>Empowering Farmers with Technology</h2>
        <p>Upload leaf images, detect plant diseases, and get expert advice instantly.</p>
        {!userInfo && (<div class="auth-buttons">
            <Link to="/signup" className="signup-btn">Sign-up</Link>
            <Link to="/login" className="login-btn">Login</Link>
        </div>)}
        {userInfo &&(<div class="auth-buttons">
            <Link to="/dashboard" className="signup-btn">Go to Dashboard</Link>
        </div>)}
   </div>
  );
};

export default Header;