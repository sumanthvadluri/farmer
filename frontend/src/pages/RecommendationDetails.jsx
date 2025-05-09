
import { useLocation } from "react-router-dom";
import Header from "../components/buyerHeader.jsx";
import Recommendation from "../components/Recommendation.jsx";
import React, { useEffect, useState } from 'react';
import '../buyerstyle.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetAllCropsQuery } from '../redux/api/users';
import {useAddRequestCropsMutation } from "../redux/api/users"; 
import { toast } from "react-toastify";


const recommendations = [
  { name: "Rice", image: "rice_crop.jpg", farmer: "Ram Kumar", rating: 4.5, price: 3000, time: "july" },
  { name: "Rice", image: "rice_crop.jpg", farmer: "Suresh Yadav", rating: 4.2, price: 2900, time: "august" },
  { name: "Wheat", image: "wheat.jpg", farmer: "Anil Kumar", rating: 4.6, price: 2500, time: "september" },
  { name: "Rice", image: "rice_crop.jpg", farmer: "Mohan Singh", rating: 4.7, price: 3100, time: "july" },
  { name: "Rice", image: "rice_crop.jpg", farmer: "Ram Kumar", rating: 4.5, price: 3000, time: "july" },
  { name: "Rice", image: "rice_crop.jpg", farmer: "Suresh Yadav", rating: 4.2, price: 2900, time: "august" },
  { name: "Wheat", image: "wheat.jpg", farmer: "Anil Kumar", rating: 4.6, price: 2500, time: "september" },
  { name: "Rice", image: "rice_crop.jpg", farmer: "Mohan Singh", rating: 4.7, price: 3100, time: "july" }
];

function RecommendationDetails() {
  const locations = useLocation();
  const { cropName, cropImage, farmerName, cropPrice, harvestDate,location, farmerId,cropQuantity,itemId} = locations.state || {};
      const { userInfo } = useSelector((state) => state.auth);
      const buyerName=userInfo.username;
      const navigate = useNavigate();
      const { data: crops = [], error, isLoading, refetch } = useGetAllCropsQuery();
       const [requestCrop] = useAddRequestCropsMutation();


        const handleContractClick = async (e) => {  
          e.preventDefault();
          try {
            await requestCrop({ farmerName,buyerName,cropName,cropQuantity,location, cropPrice, cropImage, farmerId,itemId }).unwrap();
            //await contractCrop({ BuyerName, cropName, cropQuantity, location, cropPrice, cropImage, farmerId }).unwrap();
            toast.success("Contract Request Sent");
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
        };

 
const [wishlist, setWishlist] = useState(() => {
  const savedWishlist = localStorage.getItem("wishlist");
  return savedWishlist ? JSON.parse(savedWishlist) : [];
});


  const isWishlisted = wishlist.some(item => item.name === cropName && item.farmer === farmerName);

  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const similarCrops = crops.filter(
    (crop) => crop.cropName === cropName && crop.farmerName !== farmerName
  );

  const toggleWishlist = () => {
    let updatedWishlist;
    if (isWishlisted) {
      updatedWishlist = wishlist.filter((item) => !(item.name === cropName && item.farmer === farmerName));
    } else {
      updatedWishlist = [...wishlist, { cropName, cropImage, farmerName, cropPrice, harvestDate}];
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="recommendation-page">
      <Header />
      <div className="details-container">
        <div className="details-image">
          <img src={cropImage} alt={cropName} />
        </div>
        <div className="details-content">
          <h2>{cropName}{" "}
          <span>
              <img 
                src=  {isWishlisted
                  ? "https://cdn-icons-png.flaticon.com/512/833/833472.png"
                  : "https://cdn-icons-png.flaticon.com/512/1077/1077035.png" 
                }
                alt="Wishlist"
                className="icon"
                style={{
                  width: "24px",
                  height: "24px",
                  cursor: "pointer",
                }}
                onClick={toggleWishlist}
              />
            </span>
          </h2>

            

          <p><b>Farmer:</b> {farmerName}</p>
          <p><b>Rating:</b> ⭐4 / 5</p>
          <p><b>Price:</b> ₹{cropPrice} per kg</p>
          <p><b>Delivery:</b> {harvestDate}</p>
          <div>
            <button className="details-button" onClick={handleContractClick}>Initiate Contract</button>
            <button className="chat-button">Chat</button>
          </div>
        </div>
      </div>

    

      <section className="recommendations">
        <h2>Similar Crops</h2>
        <div className="recommendation-crops">
          {crops.filter(crop => crop.cropName === cropName && crop.farmerName !== farmerName).length > 0 ? (
            crops.filter(crop => crop.cropName === cropName && crop.farmerName !== farmerName).map((crop, index) => (
              <Recommendation key={index} crop={crop} />
            ))
          ) : (
            <p>No similar crops available.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default RecommendationDetails;