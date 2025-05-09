import { useState,useEffect, useRef } from "react";

import React from "react";

import "../buyerstyle.css";
// import { useNavigate } from "react-router";

import { Link } from "react-router-dom"; // Import Link
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/api/users";
import { logout } from "../redux/features/auth/authSlice";


function Header({}) {
  const [searchQuery, setSearchQuery] = useState("");

const [dropdownOpen, setDropdownOpen] = useState(false);
const [user, setUser] = useState({ name: "", email: "" });
const navigate = useNavigate();

const { userInfo } = useSelector((state) => state.auth);
const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

const dropdownRef = useRef(null);

const handleSearch = (e) => {
  setSearchQuery(e.target.value);
};

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

const handleKeyPress = (e) => {
  if (e.key === "Enter" && searchQuery.trim() !== "") {
    navigate(`/search?query=${searchQuery}`);
  }
};


  useEffect(() => {
    // Fetch user details from localStorage (or API)
    const loggedInUser = JSON.parse(localStorage.getItem("user")) || { name: "Ram Kumar", email: "ram@gmail.com" };
    setUser(loggedInUser);

    // Close dropdown when clicking outside
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);




  return (
    <header>
      <div className="header-container">
        <div className="header-right">
          <div className="search-container">
          <Link to="/seller" style={{ marginRight: "20px", fontSize: "18px", fontWeight: "bold", color: "#4CAF50", textDecoration: "none" }}>
            Home
          </Link>
            <input
             type="text"
              placeholder='Search "Crops"'
               className="search-bar"
               value={searchQuery}
              onChange={handleSearch}
              onKeyPress={handleKeyPress} />
            <img src="https://cdn-icons-png.flaticon.com/512/149/149852.png" alt="Search" className="search-icon" onClick={() => searchQuery.trim() !== "" && navigate(`/search?query=${searchQuery}`)} />
          </div>

          <img src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" alt="Wishlist" className="icon" style={{ width: "24px", height: "24px" }} onClick={() => navigate("/wishlist")} />

          <img src="/cat_images/chat.png" alt="Chat" className="icon" style={{ width: "24px", height: "24px" }}/>



          <div className="profile-container" ref={dropdownRef}>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
              alt="Profile" 
              className="icon profile-icon" 
              // onClick={toggleDropdown} 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{ border: "1px solid #000", borderRadius: "50%" }} 
            />

            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="profile-header">
                  <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="User" className="profile-img" />
                  <div className="profile-info">
                    <p className="name">{user.name}</p>
                    <p className="email">{user.email}</p>
                  </div>
                </div>
                <a href="#">View Profile</a>
                <a href="#">Settings & Privacy</a>
                <a href="#">Help</a>
                <a href="#">Language</a>

        <button className="logout" onClick={logoutHandler}>
              Logout
         </button>
              </div>

            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;