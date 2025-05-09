
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ChatModal from "./chatModel"; // Import ChatModal
import { useAddContractCropsMutation, useAddRequestCropsMutation } from "../redux/api/users"; 
import "../styles.css"; 

const CropDetailModal = ({ crop, onClose }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [showChat, setShowChat] = useState(false); // State for chat modal

  // Contract state values
  const [BuyerName, setBuyerName] = useState(userInfo.username);
  const [farmerName, setFarmerName] = useState(crop.farmerName);
  const [cropName, setCropName] = useState(crop.cropName);
  const [cropQuantity, setCropQuantity] = useState(crop.cropQuantity);
  const [location, setLocation] = useState(userInfo.location);
  const [cropPrice, setCropPrice] = useState(crop.cropPrice);
  const [cropImage, setCropImage] = useState(crop.cropImage);
  const [farmerId, setFarmerId] = useState(crop.userId);

  useEffect(() => {
    setBuyerName(userInfo.username);
    setFarmerName(crop.farmerName);
    setCropName(crop.cropName);
    setCropQuantity(crop.cropQuantity);
    setLocation(userInfo.location);
    setCropPrice(crop.cropPrice);
    setCropImage(crop.cropImage);
    setFarmerId(crop.userId);
  }, [userInfo, crop]);

  const [contractCrop] = useAddContractCropsMutation();
  const [requestCrop] = useAddRequestCropsMutation();

  // Handle contract request
  const handleContractClick = async (e) => {
    e.preventDefault();
    try {
      await requestCrop({ farmerName, cropName, cropQuantity, location, cropPrice, cropImage, farmerId }).unwrap();
      await contractCrop({ BuyerName, cropName, cropQuantity, location, cropPrice, cropImage, farmerId }).unwrap();
      toast.success("Contract Request Sent");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // Open chat modal
  const handleChatClick = () => {
    // setShowChat(true);
    navigate(`/chat/${crop.farmerId}/${crop.buyerId}`);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="modal-body">
          <img src={crop.cropImage || 'default-image-url.jpg'} alt={crop.cropName} className="modal-image" />
          <div className="modal-details">
            <h2>{crop.cropName}</h2>
            <p>Quantity: {crop.cropQuantity} kg</p>
            <p>Location: {crop.location}</p>
            <p>Price: {crop.cropPrice}</p>
          </div>
          <div className="modal-actions">
            <button className="modal-button contract-button" onClick={handleContractClick}>
              Contract
            </button>
            <button className="modal-button chat-button" onClick={handleChatClick}>
              Chat
            </button>
          </div>
        </div>
      </div>
      {showChat && <ChatModal crop={crop} onClose={() => setShowChat(false)} />}
    </div>
  );
};

export default CropDetailModal;
