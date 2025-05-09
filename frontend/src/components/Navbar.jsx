import React from 'react'
import "../style.css"

import { Link } from 'react-router-dom'
import { useState,useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/api/users";
import { logout } from "../redux/features/auth/authSlice";

const Navbar = () => {

    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    
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
  return (
    <div className="nav-container">
        <div className="nav-content">
        <div className="logo-container">
            <h1 className="logo-text">Farm Easy</h1>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/community">Community</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={logoutHandler}>
              Logout
         </button>
        </div>
        </div>
    </div> 
  )
}

export default Navbar;