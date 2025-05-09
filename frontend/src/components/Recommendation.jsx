


import React from "react";
import { useNavigate } from "react-router";
import "../buyerstyle.css";

function Recommendation({ crop }) {
  const navigate = useNavigate();

  if (!crop) {
    return <div className="recommendation">No crop data available</div>;
  }

  const handleClick = () => {
    navigate("/details", {
      state: {
        cropName: crop.cropName,
        cropImage: crop.cropImage,
        farmerName: crop.farmerName,
        farmerId: crop.userId,
        cropQuantity: crop.cropQuantity,
        location: crop.location,
        cropPrice: crop.cropPrice,
        harvestDate: crop.harvestDate,
        itemId: crop._id,
      },
    });
  };

  return (
    <div className="recommendation" onClick={handleClick}>
      <img src={crop.cropImage} alt={crop.cropName} />
      <div className="recommendation-content">
        <p><b>Crop</b>: {crop.cropName}</p>
        <p><b>Farmer</b>: {crop.farmerName}</p>
        <p><b>Rating</b>: 4 / 5</p>
        <p><b>Price</b>: {crop.cropPrice} per kg</p>
        <p><b>Delivery</b>: {crop.harvestDate ? new Date(crop.harvestDate).toISOString().split('T')[0] : "N/A"}</p>
      </div>
    </div>
  );
}

export default Recommendation;

