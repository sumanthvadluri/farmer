import React from "react";
import "../styles.css";
import { Link } from "react-router-dom";
import { useSelector} from "react-redux";

const Dheader = () => {
    const { userInfo } = useSelector((state) => state.auth);
  return <div className="dheader">
    <div className="dhome">
    <img src="whome.png" alt="home" />
    <Link to="/" className="dlink">Home</Link>
    </div>
    <h1>Farmer Dashboard</h1>
    <div className="profile">
    <img src="wprofile.png" alt="profile" />
    <p className="userName">{userInfo.username}</p>
    </div>
    </div>
};

export default Dheader;
