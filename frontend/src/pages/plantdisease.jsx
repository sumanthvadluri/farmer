

//import ImageUpload from "../components/ImageUpload";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import axios from "axios";
import "../styles.css";
import { useSelector } from "react-redux";
import DPheader from "../components/dpheader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
const PlantDisease = () => {
    const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo === undefined) return;  // ✅ Wait until `userInfo` is defined
    if(!userInfo)
    {
      navigate("/", { replace: true });
    }
    else
    {
    if (userInfo && userInfo.userType !== "farmer") {
      navigate("/seller", { replace: true });
    }
  }
  }, [userInfo, navigate]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [prediction, setPrediction] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file)); // Generate preview URL
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPrediction(response.data.result);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to predict disease. Check console for errors.");
    }
  };
  return (

    <div>
       {userInfo && (
        <>
      <Navbar/>
      {/* <DPheader /> */}
      <div className="page-content">
    <div className="page">
      <h2>Upload Leaf Photo</h2>

      <input type="file" onChange={handleFileChange} />
      {previewURL && (
        <div className="image-preview">
          <img src={previewURL} alt="Selected" />
        </div>
      )}

      <button onClick={handleUpload}>Predict Disease</button>

      {prediction && <h3>Prediction: {prediction}</h3>}
    </div>
    </div>
       </>
       )}
       {!userInfo &&(
        <h1 className="Unauthorized">Login for page Access</h1>
      )}
    </div>
  );
};

export default PlantDisease;
