
import React, { useState, useEffect } from "react";
import "../styles.css";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddCropMutation } from "../redux/api/users";
import { toast } from "react-toastify";

const AddCrop = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [cropData, setCropData] = useState({
    farmerName: userInfo?.username || "",
    cropName: "",
    cropQuantity: "",
    location: userInfo?.location || "",
    cropPrice: "",
    cropImage: null,
  });

  const [addCrop, { isLoading }] = useAddCropMutation();

  useEffect(() => {
    if (!userInfo) {
      navigate("/", { replace: true });
    } else if (userInfo.userType !== "farmer") {
      navigate("/seller", { replace: true });
    }
  }, [userInfo, navigate]);

  const handleChange = (e) => {
    setCropData({ ...cropData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setCropData({ ...cropData, cropImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("farmerName", cropData.farmerName);
    formData.append("cropName", cropData.cropName);
    formData.append("cropQuantity", cropData.cropQuantity);
    formData.append("location", cropData.location);
    formData.append("cropPrice", cropData.cropPrice);
    formData.append("cropImage", cropData.cropImage);

    try {
      const res = await addCrop(formData).unwrap();
      toast.success("Crop added successfully!");
      setCropData({
        farmerName: userInfo?.username || "",
        cropName: "",
        cropQuantity: "",
        location: userInfo?.location || "",
        cropPrice: "",
        cropImage: null,
      });
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add crop.");
    }
  };

  return (
    <div className="addcrop-container">
      <Sidebar />
      <div className="addcrop-form">
        <h2>Add Crop Details</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>Farmer Name:</label>
          <input type="text" name="farmerName" value={cropData.farmerName} readOnly />

          <label>Crop Name:</label>
          <input type="text" name="cropName" value={cropData.cropName} onChange={handleChange} required />

          <label>Quantity (kg):</label>
          <input type="number" name="cropQuantity" value={cropData.cropQuantity} onChange={handleChange} required />

          <label>Location:</label>
          <input type="text" name="location" value={cropData.location} readOnly />

          <label>Price (₹ per kg):</label>
          <input type="number" name="cropPrice" value={cropData.cropPrice} onChange={handleChange} required />

          <label>Crop Image:</label>
          <input type="file" name="cropImage" accept="image/*" onChange={handleImageChange} required />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Crop"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCrop;
