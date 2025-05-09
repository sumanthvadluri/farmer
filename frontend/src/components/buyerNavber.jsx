import React from "react";

import "../buyerstyle.css";

import { useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav>
      <button className="contracts-btn" onClick={() => navigate("/contracts")}>Contracts</button>
    </nav>
  );
}

export default Navbar;