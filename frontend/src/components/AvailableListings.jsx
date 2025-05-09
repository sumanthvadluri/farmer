import React, { useEffect, useState } from 'react';
import '../style.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetUserCropsQuery } from '../redux/api/users';
import EditCropForm from './EditCropForm'; 
const AvailableListings = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { data: crops = [], error, isLoading, refetch } = useGetUserCropsQuery();

    
  const [editingCrop, setEditingCrop] = useState(null); // Holds selected crop

  const handleEditClick = (crop) => {
    setEditingCrop(crop);
  };

  return (
    <div className="available-listings">
      <h2>Available Crops</h2>
      <div className="listing-cards-container">
        {crops.length === 0 ? (
          <p>No crops available for sale.</p>
        ) : (
          crops.map((crop, index) => (
            <div className="listing-card" key={index}>
              <h4>{crop.cropName}</h4>
              <p><b>Category:</b> {crop.category}</p>
              <p><b>Quantity:</b> {crop.cropQuantity} kg</p>
              <p><b>Price per Unit:</b> ₹{crop.cropPrice}</p>
              {/* <p><b>Quality:</b> {crop.quality}</p> */}
              <div className="listing-actions">
                <button className="edit-btn"  onClick={() => handleEditClick(crop)}>Edit</button>
                <button className="dismiss-btn">Dismiss</button>
              </div>
            </div>
          ))
        )}

      </div>
      {editingCrop && (
        <EditCropForm crop={editingCrop} onClose={() => setEditingCrop(null)} onUpdate={() => {
          setEditingCrop(null);
          refetch(); // Refresh the list after update
        }} />
      )}
    </div>
  );
};

export default AvailableListings;