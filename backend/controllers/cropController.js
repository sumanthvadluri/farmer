// controllers/cropController.js
import {FarmerCrop,ContractCrop,RequestCrop,FarmerAcceptCrop,BuyerAcceptCrop,AcceptCrop,PastCrop} from '../models/Crop.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import cloudinary from '../utils/cloudinary.js';

// Function to upload image to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'cropImages' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};
const addCrop = asyncHandler(async (req, res) => {
  const { farmerName, cropName, cropQuantity, location, cropPrice, category,harvestDate,shippingCharges,phone,paymentMethod} = req.body;
  const userId = req.user._id;

  let cropImageUrl = '';
  if (req.file) {
    cropImageUrl = await uploadToCloudinary(req.file.buffer);
  }

  const newCrop = new FarmerCrop({
    // farmerName,
    // cropName,
    // cropQuantity,
    // location,
    // cropPrice,
    // cropImage: cropImageUrl,
    // userId,
        cropName,
        category,
        cropQuantity,
        cropPrice,
        harvestDate,
        location,
        shippingCharges,
        cropImage:cropImageUrl,
        farmerName,
        phone,
        paymentMethod,
        userId,
  });

  const savedCrop = await newCrop.save();
  res.status(201).json(savedCrop);
});

const addContractCrops = asyncHandler(async (req, res) => {
  const { BuyerName, cropName, cropQuantity, location,cropImage, cropPrice,userType,farmerId } = req.body;
  const buyerId = req.user._id;
  const newCrop = new ContractCrop({
    BuyerName,
    cropName,
    cropQuantity,
    location,
    cropPrice,
    cropImage,
    userType,
    farmerId,
    buyerId,
  });

  const savedCrop = await newCrop.save();
  res.status(201).json(savedCrop);
});

const requestCrops = asyncHandler(async (req, res) => {
  const { farmerName, cropName, cropQuantity, location,cropImage, cropPrice,farmerId,itemId } = req.body;
  const buyerId = req.user._id;
  const buyerName= req.user.username;
  const newCrop = new RequestCrop({
    farmerName,
    buyerName,
    cropName,
    cropQuantity,
    location,
    cropPrice,
    cropImage,
    farmerId,
    buyerId,
    itemId,
  });

  const savedCrop = await newCrop.save();
  res.status(201).json(savedCrop);
});

const addAcceptCrops = asyncHandler(async (req, res) => {
  let farmerId, buyerId, farmerName, buyerName, cropName, cropQuantity, location, cropImage, cropPrice;

  if (req.user.userType === "buyer") {
    ({ farmerName, buyerName, cropName, cropQuantity, location, cropImage, cropPrice } = req.body);
    buyerId = req.user._id; 
    farmerId = req.body.farmerId; // Ensure farmerId is received from req.body
  } else if (req.user.userType === "farmer") {
    ({ farmerName, buyerName, cropName, cropQuantity, location, cropImage, cropPrice } = req.body);
    farmerId = req.user._id;
    buyerId = req.body.buyerId; // Ensure buyerId is received from req.body
  }

  const newCrop1 = new AcceptCrop({
    farmerName,
    buyerName,
    cropName,
    cropQuantity,
    location,
    cropPrice,
    cropImage,
    farmerId,
    buyerId,
  });
  const savedCrop1 = await newCrop1.save();

  res.status(201).json(savedCrop1);
});



const addPastCrops = asyncHandler(async (req, res) => {
  let farmerId, buyerId, farmerName, buyerName, cropName, cropQuantity, location, cropImage, cropPrice;

  if (req.user.userType === "buyer") {
    ({ farmerName, buyerName, cropName, cropQuantity, location, cropImage, cropPrice } = req.body);
    buyerId = req.user._id; 
    farmerId = req.body.farmerId; // Ensure farmerId is received from req.body
  } else if (req.user.userType === "farmer") {
    ({ farmerName, buyerName, cropName, cropQuantity, location, cropImage, cropPrice } = req.body);
    farmerId = req.user._id;
    buyerId = req.body.buyerId; // Ensure buyerId is received from req.body
  }

  const newCrop1 = new PastCrop({
    farmerName,
    buyerName,
    cropName,
    cropQuantity,
    location,
    cropPrice,
    cropImage,
    farmerId,
    buyerId,
  });
  const savedCrop1 = await newCrop1.save();

  res.status(201).json(savedCrop1);
});



const getUserCrops = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const userCrops = await FarmerCrop.find({ userId });

  if (userCrops.length === 0) {
    return res.status(404).json({ message: 'No crops found for this user.' });
  }

  res.status(200).json(userCrops);
});


const getRequestCrops = asyncHandler(async (req, res) => {
  let userCrops;
  if(req.user.userType==="buyer")
  {
    const buyerId = req.user._id;
    userCrops = await RequestCrop.find({ buyerId });
  }
  else if(req.user.userType==="farmer")
  {
    const farmerId = req.user._id;
    userCrops = await RequestCrop.find({ farmerId });
  }

  if (userCrops.length === 0) {
    return res.status(404).json({ message: 'No crops found for this user.' });
  }

  res.status(200).json(userCrops);
});

const getMyContracts = asyncHandler(async (req, res) => {
  const farmerId = req.user._id;
  const contracts = await RequestCrop.find({ farmerId });

  if (contracts.length === 0) {
    return res.status(404).json({ message: 'No crops found for this user.' });
  }

  res.status(200).json(contracts);
});



const getFarmerAcceptsCrops = asyncHandler(async (req, res) => {
  const farmerId = req.user._id;
  const contracts = await AcceptCrop.find({ farmerId });

  if (contracts.length === 0) {
    return res.status(404).json({ message: 'No crops found for this user.' });
  }

  res.status(200).json(contracts);
});

const getFarmerPastCrops = asyncHandler(async (req, res) => {
  const farmerId = req.user._id;
  const contracts = await PastCrop.find({ farmerId });

  if (contracts.length === 0) {
    return res.status(404).json({ message: 'No crops found for this user.' });
  }

  res.status(200).json(contracts);
});



const getBuyerAcceptsCrops = asyncHandler(async (req, res) => {
  const buyerId = req.user._id;
  const contracts = await AcceptCrop.find({ buyerId });

  if (contracts.length === 0) {
    return res.status(404).json({ message: 'No crops found for this user.' });
  }

  res.status(200).json(contracts);
});


const getBuyerPastCrops = asyncHandler(async (req, res) => {
  const buyerId = req.user._id;
  const contracts = await PastCrop.find({ buyerId });

  if (contracts.length === 0) {
    return res.status(404).json({ message: 'No crops found for this user.' });
  }

  res.status(200).json(contracts);
});



const getAllCrops = asyncHandler(async (req, res) => {
  const allCrops = await FarmerCrop.find();

  if (allCrops.length === 0) {
    return res.status(404).json({ message: 'No crops found.' });
  }

  res.status(200).json(allCrops);
});

const updateCrop = asyncHandler(async (req, res) => {
  try {
    const crop = await FarmerCrop.findById(req.params.id);
    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    const updatedFields = req.body;
    Object.assign(crop, updatedFields);

    const updatedCrop = await crop.save();
    res.status(200).json(updatedCrop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { addCrop, getUserCrops, getAllCrops,addContractCrops,getMyContracts,requestCrops,getRequestCrops,addAcceptCrops,getFarmerAcceptsCrops,getBuyerAcceptsCrops,addPastCrops,getBuyerPastCrops,getFarmerPastCrops,updateCrop};
