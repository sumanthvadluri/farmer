import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BuyerOfferings from "../components/Buyer-listings";
import "../style.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddCropMutation } from "../redux/api/users";
import { toast } from "react-toastify";
import AvailableListings from "../components/AvailableListings";
const ContractFarming = () => {
    const [showModal, setShowModal] = useState(false);
     const { userInfo } = useSelector((state) => state.auth);
        const navigate = useNavigate();
   
    const [editingIndex, setEditingIndex] = useState(null);
    const [cropData, setCropData] = useState({
        cropName: "",
        category: "Fruits",
        cropQuantity: "",
        cropPrice: "",
        harvestDate: "",
        location: "",
        shippingCharges: "",
        cropImage:null,
        farmerName: "",
        phone: "",
        paymentMethod: "UPI",
    });

    const [addCrop, { isLoading }] = useAddCropMutation();


    const handleChange = (e) => {

        setCropData({ ...cropData, [e.target.name]: e.target.value });
      
    };

    const handleSubmit= async (e) => {
      

         e.preventDefault();
            const formData = new FormData();
            formData.append("farmerName", cropData.farmerName);
            formData.append("cropName", cropData.cropName);
            formData.append("cropQuantity", cropData.cropQuantity);
            formData.append("location", cropData.location);
            formData.append("cropPrice", cropData.cropPrice);
            formData.append("cropImage", cropData.cropImage);
            formData.append("category", cropData.category);
            formData.append("harvestDate", cropData.harvestDate);
            formData.append("shippingCharges", cropData.shippingCharges);
            formData.append("phone", cropData.phone);
            formData.append("paymentMethod", cropData.paymentMethod);

        
            try {
              const res = await addCrop(formData).unwrap();
              toast.success("Crop added successfully!");
              setCropData({
                cropName: "",
                category: "Fruits",
                cropQuantity: "",
                cropPrice: "",
                harvestDate: "",
                location: "",
                shippingCharges: "",
                cropImage:null,
                farmerName: "",
                phone: "",
                paymentMethod: "UPI",
            });
            } catch (err) {
              toast.error(err?.data?.message || "Failed to add crop.");
            }

        setShowModal(false);
        setEditingIndex(null);
    };

    const handleImageUpload = (e) => {

        setCropData({ ...cropData, cropImage: e.target.files[0] });
      
    };



    return (
        <div className="contract-farming-page">
            <Navbar />
            <div className="content-container">
                <h1>Contract Farming</h1>
                <button className="add-crop-btn" onClick={() => setShowModal(true)}>
                    ADD CROP
                </button>
                <button className="add-crop-btn" onClick={() => navigate("/farmercontracts")}>
                    Contracts
                </button>
            </div>

            {showModal && (
                <div className="modal-overlay" >
                    <div className="modal-content" >
                        <h2>{editingIndex !== null ? "Edit Crop Details" : "Add Crop Details"}</h2>
                        <form className="crop-form" onSubmit={handleSubmit}>
                            <div className="form-section">
                                <h3>Basic Crop Details</h3>
                                <label>Crop Name:</label>
                                <input type="text" name="cropName" value={cropData.cropName} onChange={handleChange} placeholder="Enter crop name" />
                                <label>Category:</label>
                                <select name="category" value={cropData.category} onChange={handleChange}>
                                    <option>Fruits</option>
                                    <option>Vegetables</option>
                                    <option>Grains</option>
                                    <option>Pulses</option>
                                </select>
                                <label>Quantity Available:</label>
                                <input type="text" name="cropQuantity" value={cropData.cropQuantity} onChange={handleChange}  placeholder="Enter quantity" />
                                <label>Price per Unit:</label>
                                <input type="number" name="cropPrice" value={cropData.cropPrice} onChange={handleChange}  placeholder="Enter price" />
                                <label>Harvest Date:</label>
                                <input type="date" name="harvestDate" value={cropData.harvestDate} onChange={handleChange} />
                                <label>Upload Images:</label>
                                <input type="file" name="cropImage" accept="image/*" onChange={handleImageUpload} required />
                    
                            </div>

                            <div className="form-section">
                                <h3>Location & Delivery</h3>
                                <label>Farmer's Location:</label>
                                <input type="text" name="location" value={cropData.location} onChange={handleChange} placeholder="Enter district, state" />
                                <label>Shipping Charges:</label>
                                <input type="number" name="shippingCharges" value={cropData.shippingCharges} onChange={handleChange} placeholder="Enter shipping cost (if any)" />
                            </div>

                            <div className="form-section">
                                <h3>Contact & Payment Details</h3>
                                <label>Farmer's Name:</label>
                                <input type="text" name="farmerName" value={cropData.farmerName} onChange={handleChange} placeholder="Enter your name" />
                                <label>Phone Number / WhatsApp:</label>
                                <input type="text" name="phone" value={cropData.phone} onChange={handleChange} placeholder="Enter phone number" />
                    
                                <label>Payment Method Accepted:</label>
                                <select name="paymentMethod" value={cropData.paymentMethod} onChange={handleChange}>
                                    <option>UPI</option>
                                    <option>Bank Transfer</option>
                                    <option>Cash on Delivery</option>
                                </select>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="submit-btn">{editingIndex !== null ? "Update" : "Submit"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <BuyerOfferings/>
            <AvailableListings/>
            {/* handleEdit={handleEdit} handleDismiss={handleDismiss}  */}
            {/* <div className="available-listings">
  <h2>Available Listings</h2>
  <div className="listing-cards-container">
    {crops.map((crop, index) => (
      <div className="listing-card" key={index}>
        <h4>{crop.name} - {crop.variety}</h4>
        <p>Category: {crop.category}</p>
        <p>Quantity: {crop.quantity} kg</p>
        <p>Price per Unit: ₹{crop.price}</p>
        <p>Quality: {crop.quality}</p>
        <div className="listing-actions">
          <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
          <button className="dismiss-btn" onClick={() => handleDismiss(index)}>Dismiss</button>
        </div>
      </div>
    ))}
  </div>
</div> */}
        </div>
    );
};

export default ContractFarming;