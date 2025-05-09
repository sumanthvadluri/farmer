import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BuyerOfferings from "../components/Buyer-listings";
import "../style.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddCropMutation } from "../redux/api/users";
import { useEditCropMutation } from '../redux/api/users';
import { toast } from "react-toastify";
const EditCropForm = ({ crop, onClose, onUpdate }) => {
     const { userInfo } = useSelector((state) => state.auth);
        const navigate = useNavigate();
    const [editingIndex, setEditingIndex] = useState(null);

    const [addCrop, { isLoading }] = useAddCropMutation();
    const [cropData, setCropData] = useState({ ...crop });
    const [editCrop] = useEditCropMutation();
  
    const handleChange = (e) => {
      setCropData({ ...cropData, [e.target.name]: e.target.value });
    };
  
    const handleImageUpload = (e) => {
      // Optional: Implement actual image upload logic
      setCropData({ ...cropData, cropImage: e.target.files[0] });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const updatedData = { ...cropData };
        await editCrop({ id: crop._id, cropData: updatedData });
        alert("Crop updated successfully");
        onUpdate();
      } catch (err) {
        console.error(err);
        alert("Update failed");
      }
    };
  


    return (
        <div className="contract-farming-page">
                <div className="modal-overlay" >
                    <div className="modal-content" >
                        <h2>{editingIndex !== null ? "Edit Crop Details" : "Add Crop Details"}</h2>
                        <form className="crop-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3>Basic Crop Details</h3>
        <label>Crop Name:</label>
        <input type="text" name="cropName" value={cropData.cropName} onChange={handleChange} />
        <label>Category:</label>
        <select name="category" value={cropData.category} onChange={handleChange}>
          <option>Fruits</option>
          <option>Vegetables</option>
          <option>Grains</option>
          <option>Pulses</option>
        </select>
        <label>Quantity:</label>
        <input type="text" name="cropQuantity" value={cropData.cropQuantity} onChange={handleChange} />
        <label>Price:</label>
        <input type="number" name="cropPrice" value={cropData.cropPrice} onChange={handleChange} />
        <label>Harvest Date:</label>
        <input type="date" name="harvestDate" value={cropData.harvestDate?.substring(0, 10)} onChange={handleChange} />
        <label>Upload Image:</label>
        <input type="file" onChange={handleImageUpload} />
      </div>

      <div className="form-section">
        <label>Location:</label>
        <input type="text" name="location" value={cropData.location} onChange={handleChange} />
        <label>Shipping Charges:</label>
        <input type="number" name="shippingCharges" value={cropData.shippingCharges} onChange={handleChange} />
      </div>

      <div className="form-section">
        <label>Farmer Name:</label>
        <input type="text" name="farmerName" value={cropData.farmerName} onChange={handleChange} />
        <label>Phone:</label>
        <input type="text" name="phone" value={cropData.phone} onChange={handleChange} />
        <label>Payment Method:</label>
        <select name="paymentMethod" value={cropData.paymentMethod} onChange={handleChange}>
          <option>UPI</option>
          <option>Bank Transfer</option>
          <option>Cash on Delivery</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
        <button type="submit" className="submit-btn">Update</button>
      </div>
    </form>
                    </div>
                </div>
        </div>
    );
};

export default EditCropForm;