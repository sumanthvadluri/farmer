import { useNavigate } from 'react-router-dom';
import { useGetContractsQuery } from '../redux/api/users';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAddAcceptCropsMutation, useDeleteRequestCropMutation,useDeleteFromCropMutation } from "../redux/api/users";

const BuyerOfferings = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { data: crops = [], error, isLoading, refetch } = useGetContractsQuery();
  const [acceptCrop] = useAddAcceptCropsMutation();
  const [deleteRequestCrop] = useDeleteRequestCropMutation();
  const [deleteFromCrop] = useDeleteFromCropMutation();

  const handleContractClick = async (crop) => {
    console.log("Clicked Crop:", crop); // Debugging line

    if (!crop) {
      toast.error("Invalid crop data.");
      return;
    }

    try {
      await acceptCrop({
        farmerName: userInfo.username,
        buyerName: crop.buyerName,
        cropName: crop.cropName,
        cropQuantity: crop.cropQuantity,
        location: userInfo.location,
        cropPrice: crop.cropPrice,
        cropImage: crop.cropImage,
        farmerId: crop.farmerId,
        buyerId: crop.buyerId,
      }).unwrap();
      toast.success("Contract Accepted");
    } catch (err) {
      console.error("Error accepting contract:", err); // Debugging error
      toast.error(err?.data?.message || "Error accepting contract.");
    }
    try {
      await deleteRequestCrop(crop._id).unwrap();
      window.location.reload();
    } catch (err) {
      console.error("Error deleting crop request:", err);
      toast.error(err?.data?.message || "Error rejecting crop request.");
    }
    try {
      await deleteFromCrop(crop.itemId).unwrap();
      window.location.reload();
    } catch (err) {
      console.error("Error deleting crop request:", err);
      toast.error(err?.data?.message || "Error rejecting crop request.");
    }

  };

  const handleRejectClick = async (crop) => {
    console.log("Crop ID before delete request:", crop?._id); // Debugging line

    if (!crop || !crop._id) {
      toast.error("Invalid crop request.");
      return;
    }

    try {
      await deleteRequestCrop(crop._id).unwrap();
      toast.success("Contract request rejected.");
      window.location.reload(); // Refresh the page after deletion
    } catch (err) {
      console.error("Error deleting crop request:", err);
      toast.error(err?.data?.message || "Error rejecting crop request.");
    }
  };

  return (
    <div className="buyer-offerings">
      <h2>Buyer Requests</h2>
      {crops.length === 0 ? (
        <p>No buyers have offered yet.</p>
      ) : (
        crops.map((crop, index) => (
          <div key={index} className="buyer-card">
            <img src={crop.cropImage} alt={crop.cropName} className="buyer-image" />
            <div className="buyer-details">
              <h3>{crop.buyerName}</h3>
              <h3>{crop.cropName}</h3>
              <p><strong>Quantity Needed:</strong> {crop.cropQuantity}</p>
              <p><strong>Buyer Rating:</strong> ⭐4</p>
            </div>
            <div className="buyer-actions">
              <button className="ignore-btn" onClick={() => handleRejectClick(crop)}>Ignore</button>
              <button className="accept-btn" onClick={() => handleContractClick(crop)}>Accept</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BuyerOfferings;
