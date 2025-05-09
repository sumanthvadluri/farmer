
import Navbar from "../components/Navbar";
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetBuyerAcceptCropsQuery,useAddPastCropsMutation,useGetBuyerPastCropsQuery,useDeleteAcceptCropMutation} from '../redux/api/users';
import { toast } from "react-toastify";

const dummyContracts = [
  {
    id: 1,
    buyer: "Aarav Patel",
    crop: "Wheat",
    quantity: "500 kg",
    startDate: "12-02-2025",
    isActive: true,
    contact: "📞 8106031027",
    location: "📍 Isnapur, Sangareddy",
    buyerType: "Wholesaler",
    deliveryLocation: "Hyderabad",
    rating: 4.2,
    reviews: 120,
    profileImg: "ram.jpg",
  },
  {
    id: 2,
    buyer: "Neha Sharma",
    crop: "Rice",
    quantity: "1000 kg",
    startDate: "15-03-2025",
    isActive: true,
    contact: "📞 9876543210",
    location: "📍 Pune, Maharashtra",
    buyerType: "Retailer",
    deliveryLocation: "Mumbai",
    rating: 4.5,
    reviews: 95,
    profileImg: "sumanth.jpg",
  },
  {
    id: 3,
    buyer: "Vikram Reddy",
    crop: "Maize",
    quantity: "750 kg",
    startDate: "05-04-2025",
    isActive: false,
    contact: "📞 8123456789",
    location: "📍 Warangal, Telangana",
    buyerType: "Distributor",
    deliveryLocation: "Bangalore",
    rating: 4.0,
    reviews: 110,
    profileImg: "karthik.jpg",
  },
  {
    id: 4,
    buyer: "Rohit Verma",
    crop: "Barley",
    quantity: "600 kg",
    startDate: "20-01-2025",
    isActive: false,
    contact: "📞 7001234567",
    location: "📍 Jaipur, Rajasthan",
    buyerType: "Exporter",
    deliveryLocation: "Delhi",
    rating: 4.3,
    reviews: 87,
    profileImg: "ram.jpg",
  },
];

const FarmerContracts = () => {
      const { userInfo } = useSelector((state) => state.auth);
      const navigate = useNavigate();
      const { data: crops = [], error, isLoading, refetch } = useGetBuyerAcceptCropsQuery();
      const { data: cropss = [], errorr, issLoading, refetchh } = useGetBuyerPastCropsQuery();
       const [pastCrop] = useAddPastCropsMutation();
        const [deleteAcceptCrop] = useDeleteAcceptCropMutation();
  const [selectedContract, setSelectedContract] = useState(null);

  const handleViewDetails = (crop) => {
    setSelectedContract(crop);
  };
  const closeProfile = () => {
    setSelectedContract(null);
  };

  
    const handleContractClick = async (crop) => {
      console.log("Clicked Crop:", crop); // Debugging line
  
      if (!crop) {
        toast.error("Invalid crop data.");
        return;
      }
  
      try {
        await pastCrop({
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
        await deleteAcceptCrop(crop._id).unwrap();
        window.location.reload();
      } catch (err) {
        console.error("Error deleting crop request:", err);
        toast.error(err?.data?.message || "Error rejecting crop request.");
      }
  
    };

  return (
    <div>
      <Navbar />
      <div className="contracts-page-container">
        {/* Active Contracts Section */}
        <div className="active-contracts-container">
          <div className="active-contracts-title">
            <h1>Active Contracts</h1>
          </div>
          <div className="active-contracts-content">
            {crops
              .map((crop) => (
                <div key={crop._id} className="active-contract-card">
                  <div className="active-contracts-content-left">
                    <h3><b>Farmer:</b> {crop.farmerName}</h3>
                    <p><b>Crop:</b> {crop.cropName}</p>
                    <p><b>Quantity:</b> {crop.cropQuantity}</p>
                    {/* <p><b>Start Date:</b> {crop.harvestDate}</p> */}
                  </div>
                  <div className="active-contracts-content-right">
                    <button className="view-btn" onClick={() => handleViewDetails(crop)}>View Details</button>
                    <button className="end-btn" onClick={() => handleContractClick(crop)}>End Contract</button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Past Contracts Section */}
        <div className="active-contracts-container">
          <div className="active-contracts-title">
            <h1>Past Contracts</h1>
          </div>
          <div className="active-contracts-content">
            {cropss
              .map((crop) => (
                <div key={crop._id} className="active-contract-card">
                  <div className="active-contracts-content-left">
                    <h3><b>Buyer:</b> {crop.buyerName}</h3>
                    <p><b>Crop:</b> {crop.cropName}</p>
                    <p><b>Quantity:</b> {crop.cropQuantity}</p>
                    {/* <p><b>Start Date:</b> {contract.startDate}</p> */}
                  </div>
                  <div className="active-contracts-content-right">
                    <button className="view-btn" onClick={() => handleViewDetails(crop)}>View Details</button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Profile Popup */}
        {selectedContract && (
          <div className="profile-overlay" onClick={closeProfile}>
            <div className="contract-profile-container" onClick={(e) => e.stopPropagation()}>
              <div className="contract-profile">
                <img src={selectedContract.cropImage} alt="profile" />
              </div>
              <div className="name">
                <h1><b>{selectedContract.farmerName}</b></h1>
                <p className="contact">{"7986352618"}</p>
                <p className="contact">{selectedContract.location}</p>
                {/* <p className="contact"><b>Buyer Type:</b> {selectedContract.buyerType}</p> */}
                {/* <p className="contact"><b>Preferred Delivery Location:</b> {selectedContract.deliveryLocation}</p> */}
              </div>
              <div className="rating">
                <h3>Ratings & Reviews</h3>
                <span className="stars" style={{ fontSize: "24px", color: "gold" }}>
                  {"★".repeat(Math.floor(4.0))}{"☆".repeat(5 - Math.floor(4.0))}
                </span>
                <span>{4.0}/5 ({78} reviews)</span>
              </div>
              <div className="profile-chat">
                <button>Chat</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerContracts;