import { useParams } from "react-router-dom";
import Recommendation from "../components/Recommendation";
import React, { useEffect, useState } from 'react';
import '../buyerstyle.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetAllCropsQuery } from '../redux/api/users';
import Header from "../components/buyerHeader";

function CategoryPage() {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { data: crops = [], error, isLoading, refetch } = useGetAllCropsQuery();
  const { categoryName } = useParams(); 

  const [selectedSubcategory, setSelectedSubcategory] = useState("All");

  // Filter crops by category (case insensitive)
  const cropsByCategory = crops.filter(
    crop => crop.category?.toLowerCase() === categoryName?.toLowerCase()
  );

  // Get unique subcategories (cropName values) from the filtered crops
  const subcategories = ["All", ...new Set(cropsByCategory.map(crop => crop.cropName))];

  // Filter again by subcategory
  const filteredCrops = selectedSubcategory === "All"
    ? cropsByCategory
    : cropsByCategory.filter(crop => crop.cropName === selectedSubcategory);

  return (
    <div className="category-page-container">
      <Header />
      <div className="category-page">
        <div className="sidebar">
          <h3>Subcategories</h3>
          <ul>
            {subcategories.map((sub, index) => {
              const imageName = sub === "All"
                ? `All${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}.jpg`
                : `${sub}.jpg`;

              return (
                <li
                  key={sub + index}
                  className={selectedSubcategory === sub ? "active" : ""}
                  onClick={() => setSelectedSubcategory(sub)}
                >
                  <span>
                    <img 
                      src={`${imageName}`} 
                      alt={sub} 
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "15px",
                        marginRight: "8px"
                      }} 
                    />
                  </span>
                  {sub}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="recommendation-container">
          <h2>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h2>
          <div className="recommendation-crops">
            {filteredCrops.length > 0 ? (
              filteredCrops.map((crop, index) => (
                <Recommendation key={crop._id || index} crop={crop} />
              ))
            ) : (
              <p>No crops found in this category.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
