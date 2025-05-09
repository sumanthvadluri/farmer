
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "../components/profileSidebar";
import { Link } from "react-router-dom";
import "../styles.css"; // Ensure this import is present to apply the styles

const SellerHome = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  // useEffect(() => {
  //   if (userInfo === undefined) return; // Wait until `userInfo` is defined
  //   if (!userInfo) {
  //     navigate("/", { replace: true });
  //   } else if (userInfo.userType !== "buyer") {
  //     navigate("/farmerhome", { replace: true });
  //   }
  // }, [userInfo, navigate]);

  const expand = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  return (
    <div className="seller-home">
      {/* <button className="toggle-btn" onClick={expand}>
        ☰
      </button>
      {toggle && <ProfileSidebar />} */}
       <Link to="/allcrops">Contract Forming</Link>
       <Link to="/requestcrops">Requested Crops</Link>
       <Link to="/ongoingdeals">on Going Deals</Link>
      {/* Other content of SellerHome */}
    </div>
  );
};

export default SellerHome;





// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import ProfileSidebar from "../components/profileSidebar";
// import { Link } from "react-router-dom";
// import "../styles.css"; // Ensure this import is present to apply the styles

// const SellerHome = () => {
//   const { userInfo } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const [toggle, setToggle] = useState(false);
//   const expand = () => {
//     setToggle((prevToggle) => !prevToggle);
//   };

//   return (
//     <div className="seller-home">
//       <button className="toggle-btn" onClick={expand}>
//         ☰
//       </button>
//       {toggle && <ProfileSidebar />}
//     </div>
//   );
// };

// export default SellerHome;


