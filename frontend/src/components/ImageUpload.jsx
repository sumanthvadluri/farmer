import { useState } from "react";
import axios from "axios";
import "../styles.css";

const ImageUpload = () => {
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
    <div className="page">
      <h2>Disease Prediction</h2>

      <input type="file" onChange={handleFileChange} />
      {previewURL && (
        <div className="image-preview">
          <img src={previewURL} alt="Selected" />
        </div>
      )}

      <button onClick={handleUpload}>Predict Disease</button>

      {prediction && <h3>Prediction: {prediction}</h3>}
    </div>
  );
};

export default ImageUpload;
