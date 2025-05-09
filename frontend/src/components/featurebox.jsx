import React from "react";
import "../styles.css";
const FeatureBox = () => {
  return (
    <section className="features">
        <div className="feature">
            <h3>AI-Powered Disease Detection</h3>
            <p>Use AI to identify plant diseases and get treatment recommendations.</p>
        </div>
        <div className="feature">
            <h3>Market Price Insights</h3>
            <p>Stay updated with real-time market prices for your crops.</p>
        </div>
        <div className="feature">
            <h3>Community Support</h3>
            <p>Connect with other farmers and agriculture experts for guidance.</p>
        </div>
    </section>
  );
};

export default FeatureBox;