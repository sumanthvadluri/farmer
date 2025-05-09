

import React, { useState, useEffect } from "react";
import "../styles.css"; // Ensure this contains the necessary styles
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAddAcceptCropsMutation, useDeleteRequestCropMutation } from "../redux/api/users";

const ContractDetailModal = ({ crop, onClose }) => {
  const { userInfo } = useSelector((state) => state.auth);

  const [farmerName, setFarmerName] = useState(userInfo.username);
  const [buyerName, setBuyerName] = useState(crop.buyerName);
  const [cropName, setCropName] = useState(crop.cropName);
  const [cropQuantity, setCropQuantity] = useState(crop.cropQuantity);
  const [location, setLocation] = useState(userInfo.location);
  const [cropPrice, setCropPrice] = useState(crop.cropPrice);
  const [cropImage, setCropImage] = useState(crop.cropImage);
  const [farmerId, setFarmerId] = useState(crop.farmerId);
  const [buyerId, setBuyerId] = useState(crop.buyerId);

  useEffect(() => {
    setBuyerName(crop.buyerName);
    setFarmerName(userInfo.username);
    setCropName(crop.cropName);
    setCropQuantity(crop.cropQuantity);
    setLocation(userInfo.location);
    setCropPrice(crop.cropPrice);
    setCropImage(crop.cropImage);
    setFarmerId(crop.farmerId);
    setBuyerId(crop.buyerId);
  }, [userInfo, crop]);

  const [acceptCrop, { isLoading }] = useAddAcceptCropsMutation();
  const [deleteRequestCrop] = useDeleteRequestCropMutation();

  if (!crop) return null;

  const handleContractClick = async (e) => {
    console.log(crop.buyerName);
    e.preventDefault();
    try {
      await acceptCrop({
        farmerName,
        buyerName,
        cropName,
        cropQuantity,
        location,
        cropPrice,
        cropImage,
        farmerId,
        buyerId,
      }).unwrap();
      toast.success("Contract Accepted");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }


    
  };

  const handleRejectClick = async () => {
    console.log("Crop ID before delete request:", crop._id); // Debugging line
  
    if (!crop._id) {
      toast.error("Invalid crop request ID.");
      return;
    }
  
    try {
      const response = await deleteRequestCrop(crop._id).unwrap();
      console.log("Delete response:", response); // Debugging response
      toast.success("Contract request rejected and removed.");
      onClose(); // Close modal after deletion
      window.location.reload(); // Refresh the page after deletion
    } catch (err) {
      console.error("Error deleting crop request:", err); // Debugging error
      toast.error(err?.data?.message || "Error rejecting crop request.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="modal-body">
          <img src={crop.cropImage || "default-image-url.jpg"} alt={crop.cropName} className="modal-image" />
          <div className="modal-details">
            <h2>{crop.cropName}</h2>
            <h2>{crop._id}</h2>
            <p>Quantity: {crop.cropQuantity} kg</p>
            <p>Location: {crop.location}</p>
            <p>Price: {crop.cropPrice}</p>
          </div>
          <div className="modal-actions">
            <button className="modal-button contract-button" onClick={handleContractClick}>
              Accept
            </button>
            <button className="modal-button reject-button" onClick={handleRejectClick}>
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractDetailModal;
