
import React, { useEffect, useState } from 'react';
import '../styles.css';
import Sidebar from '../components/Sidebar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetContractsQuery } from '../redux/api/users';
import ContractDetailModal from '../components/ExpandableCardfarmer';

const PastContracts = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { data: crops = [], error, isLoading, refetch } = useGetContractsQuery();
  const [selectedCrop, setSelectedCrop] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      navigate('/', { replace: true });
    } else if (userInfo.userType !== 'farmer') {
      navigate('/seller', { replace: true });
    } else {
      refetch();
    }
  }, [userInfo, navigate, refetch]);

  const handleCardClick = (crop) => {
    setSelectedCrop(crop);
  };

  const handleCloseModal = () => {
    setSelectedCrop(null);
  };

  const handleCropDelete = (deletedCropId) => {
    setSelectedCrop(null); // Close modal
    refetch(); // Refetch the updated crop list
  };

  return (
    <div>
      <Sidebar />
      <div className="CFpage-content">
        <div className="soil-container">
          <div className="soil-box">
            <h1>Present Crops</h1>
          </div>
          {isLoading ? (
            <p>Loading crops...</p>
          ) : error ? (
            <p className="error">Error: {error.data?.message || error.message}</p>
          ) : crops.length > 0 ? (
            <div className="crops-grid">
              {crops.map((crop) => (
                <div
                  key={crop._id}
                  className="crop-card"
                  onClick={() => handleCardClick(crop)}
                >
                  <img
                    src={crop.cropImage || 'default-image-url.jpg'}
                    alt={crop.cropName}
                    className="crop-image"
                  />
                  <div className="crop-details">
                    <h1>{crop.BuyerName}</h1>
                    <h2>{crop.cropName}</h2>
                    <p>Quantity: {crop.cropQuantity} kg</p>
                    <p>Location: {crop.location}</p>
                    <p>Price: {crop.cropPrice}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No crops found.</p>
          )}
        </div>
      </div>
      {selectedCrop && (
        <ContractDetailModal 
          crop={selectedCrop} 
          onClose={handleCloseModal} 
          onDelete={handleCropDelete} // Pass delete handler
        />
      )}
    </div>
  );
};

export default PastContracts;