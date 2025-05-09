import express from "express";
import axios from "axios";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const response = await axios.post("http://localhost:5000/predict", {
      image_path: imagePath,
    });
    res.json({ result: response.data.result });
  } catch (error) {
    res.status(500).json({ error: "Prediction failed" });
  }
});

export default router;
