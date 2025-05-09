

import Header from "../components/buyerHeader.jsx";
import Navbar from "../components/buyerNavbar.jsx";
import Category from "../components/Category.jsx";
import Recommendation from "../components/Recommendation.jsx";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetAllCropsQuery } from '../redux/api/users';
import CropDetailModal from '../components/ExpandableCard';
// import Footer from "./components/Footer.jsx";
import "../buyerstyle.css";


const categories = [
  { name: "Grains", image: "AllGrains.jpg" },
  { name: "Fruits", image: "AllFruits.jpg" },
  { name: "Nuts", image: "AllNuts.jpg" },
  { name: "Vegetables", image: "AllVegetables.jpg" },
  { name: "Spices", image: "AllSpices.jpg" },
  { name: "Oils", image: "AllOils.jpg" }



];

const recommendations = [
  { name: "Rice", image: "photo1.jpeg", farmer: "Ram Kumar", rating: 4.5, price: 3000, time: "july" },
  { name: "Rice", image: "photo1.jpeg", farmer: "Ram Kumar", rating: 4.5, price: 3000, time: "july" },
  { name: "Rice", image: "photo1.jpeg", farmer: "Ram Kumar", rating: 4.5, price: 3000, time: "july" },
  { name: "Rice", image: "photo1.jpeg", farmer: "Ram Kumar", rating: 4.5, price: 3000, time: "july" },
  { name: "Rice", image: "photo1.jpeg", farmer: "Ram Kumar", rating: 4.5, price: 3000, time: "july" },
  { name: "Rice", image: "photo1.jpeg", farmer: "Ram Kumar", rating: 4.5, price: 3000, time: "july" },
  { name: "Rice", image: "photo1.jpeg", farmer: "Ram Kumar", rating: 4.5, price: 3000, time: "july" },
  { name: "Rice", image: "photo1.jpeg", farmer: "Ram Kumar", rating: 4.5, price: 3000, time: "july" },
  { name: "Rice", image: "photo1.jpeg", farmer: "Ram Kumar", rating: 4.5, price: 3000, time: "july" },
  { name: "Rice", image: "photo1.jpeg", farmer: "Ram Kumar", rating: 4.5, price: 3000, time: "july" },
  { name: "Rice", image: "photo1.jpeg", farmer: "Ram Kumar", rating: 4.5, price: 3000, time: "july" }

];

function BuyerDashboard() {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const { data: crops = [], error, isLoading, refetch } = useGetAllCropsQuery();


  useEffect(() => {
    if (userInfo === undefined) return; // Wait until `userInfo` is defined
    if (!userInfo) {
      navigate("/", { replace: true });
    } else if (userInfo.userType !== "buyer") {
      navigate("/farmerhome", { replace: true });
    }
  }, [userInfo, navigate,refetch]);
//   useEffect(() => {
//     const token = localStorage.getItem("token"); // Check authentication
//     if (!token) {
//       navigate("/"); // Redirect to login if not authenticated
//     }
//   }, [navigate]);
  return (
    <div>
      <Header />
      <Navbar />
      <section className="categories-section">
        <div className="categories-container">
        <h2 className="categories-heading">Categories</h2>
        <div className="categories">
          {categories.map((category, index) => (
            <Category key={index} name={category.name} image={category.image} />
          ))}
        </div>
        </div>
      </section>
      <section className="recommendations">
        <h2>Recommended Crops for You</h2>
        <div className="recommendation-crops">
  {crops.map((crop, index) => (
    <Recommendation 
      key={index} 
      crop={crop}
    //   cropName={crop.cropName} 
    //   cropImage={crop.cropImage} 
    //   farmerName={crop.farmerName} 
    //   buyerName={userInfo.username}
    //   farmerId={crop.userId}
    //   price={crop.cropPrice} 
    //   time={crop.harvestDate}
    />
  ))}
</div>
      </section>
      {/* <Footer /> */}
    </div>
  );
}

export default BuyerDashboard;