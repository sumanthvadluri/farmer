  import React from "react";
  import Navbar from "../components/Navbar";
  import { useNavigate } from "react-router-dom";
  import "../style.css";
  const services = [
    {
      id: 1,
      title: "Weather Report",
      description: "Enhance Weather Condition.",
      image: "weather.jpg",
      path: "/weather-report",
    },
    {
      id: 2,
      title: "IoT-Based Farming",
      description: "Leverage smart IoT devices to monitor and automate farming activities.",
      image: "iot_farming.jpeg",
      path: "/iot-farming", 
    },
    {
      id: 3,
      title: "Crop Disease Detection",
      description: "Protect your crops with advanced disease detection technology.",
      image: "crop-disease.jpeg",
      path: "/disease-prediction", 
    },
    {
      id: 4,
      title: "Contract Farming",
      description: "Secure your agricultural income with contract farming agreements.",
      image: "about_left.jpeg",
      path: "/contract-farming",
    },

  ];

  const Home = () => {
    const navigate = useNavigate();
    return (
      <div className="home-page">
        <Navbar />
        <div className="head-content">
          <img src="form.jpeg" alt="farm" />
          {/* <p class="text-overlay"><span style={{color:"ActiveCaption", fontFamily: "cursive"}}>One Stop</span> <br/> <span style={{color:"#fce90f", fontFamily: "sans-serif"}}>for all farmer needs</span></p> */}
        </div>
        <div className="services-grid">
        {services.map((service) => (
          <div
            key={service.id}
            className="service-card"
            onClick={() => service.path && navigate(service.path)}
            style={{ cursor: service.path ? "pointer" : "default" }}
          >
            <img src={service.image} alt={service.title} className="service-img" />
            <div className="service-content">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
        </div>
      </div>
    );
  };

  export default Home;