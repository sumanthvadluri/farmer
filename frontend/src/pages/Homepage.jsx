import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Auth/login";
import Register from "./Auth/register";

const Homepage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/chats");
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Talk-A-Tive</h1>
      </div>

      <div style={styles.card}>
        <div style={styles.tabList}>
          <button
            style={{
              ...styles.tabButton,
              backgroundColor: activeTab === "login" ? "#007bff" : "#ddd",
            }}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            style={{
              ...styles.tabButton,
              backgroundColor: activeTab === "register" ? "#007bff" : "#ddd",
            }}
            onClick={() => setActiveTab("register")}
          >
            Sign Up
          </button>
        </div>

        <div style={styles.tabContent}>
          {activeTab === "login" ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
};

// ✅ Simple Inline Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "40px",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    padding: "16px",
    backgroundColor: "white",
    width: "100%",
    maxWidth: "400px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  title: {
    fontSize: "2rem",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "white",
    width: "100%",
    maxWidth: "400px",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  tabList: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1em",
  },
  tabButton: {
    flex: 1,
    padding: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  tabContent: {
    padding: "10px",
  },
};

export default Homepage;
