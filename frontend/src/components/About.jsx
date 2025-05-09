import React from "react";
import "../styles.css";

const About = () => {
  return (
    <div className="about-container">
        <h1>About</h1>
        <p>This web application aimed at improving farming efficiency and sustainability by integrating Internet of Things (IoT) technology, deep learning, and automated irrigation. The system uses IoT sensors to monitor soil moisture and temperature levels in real time, offering valuable insights for farmers to manage irrigation effectively. Based on soil moisture readings, the application automates the water supply, ensuring crops receive the required hydration while reducing water wastage. In addition, the platform leverages deep learning models, specifically Convolutional Neural Networks (CNNs), for plant disease detection. Farmers can upload images of their crops, and the system analyzes them using CNNs to provide highly accurate disease classifications along with suggested treatments. The farmer dashboard consists of two main components: live soil data monitoring and an AI-powered disease detection tool.</p>
    </div>
  );
};

export default About;