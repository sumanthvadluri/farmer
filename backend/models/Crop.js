import mongoose from "mongoose";
const farmerCropSchema = mongoose.Schema(
  {
    farmerName: {
      type: String,
      required: true,
    },
    cropName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Fruits", "Vegetables", "Grains", "Pulses"],
    },
    cropQuantity: {
      type: Number,
      required: true,
    },
    cropPrice: {
      type: Number,
      required: true,
    },
    harvestDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    shippingCharges: {
      type: Number,
      default: 0,
    },
    phone: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["UPI", "Bank Transfer", "Cash on Delivery"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cropImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const contractCropSchema = mongoose.Schema(
  {
    BuyerName: {
      type: String,
      required: true,
    },
    cropName: {
      type: String,
      required: true,
    },
    cropQuantity: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    cropPrice: {
      type: Number,
      required: true,
    },
    farmerId: {
      type: String,
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    cropImage: {
      type: String, // URL or file path for image storage
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);


const requestCropSchema = mongoose.Schema(
  {
    farmerName: {
      type: String,
      required: true,
    },
    buyerName: {
      type: String,
      required: true,
    },
    cropName: {
      type: String,
      required: true,
    },
    cropQuantity: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    cropPrice: {
      type: Number,
      required: true,
    },
    itemId: {
      type: String,
      required: true,
    },
    farmerId: {
      type: String,
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    cropImage: {
      type: String, // URL or file path for image storage
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);



const acceptfarmerCropSchema = mongoose.Schema(
  {
    farmerName: {
      type: String,
      required: true,
    },
    buyerName: {
      type: String,
      required: true,
    },
    cropName: {
      type: String,
      required: true,
    },
    cropQuantity: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    cropPrice: {
      type: Number,
      required: true,
    },
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    cropImage: {
      type: String, // URL or file path for image storage
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);


const acceptbuyerCropSchema = mongoose.Schema(
  {
    farmerName: {
      type: String,
      required: true,
    },
    buyerName: {
      type: String,
      required: true,
    },
    cropName: {
      type: String,
      required: true,
    },
    cropQuantity: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    cropPrice: {
      type: Number,
      required: true,
    },
    farmerId: {
      type: String,
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    cropImage: {
      type: String, // URL or file path for image storage
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);



const acceptCropSchema = mongoose.Schema(
  {
    farmerName: {
      type: String,
      required: true,
    },
    buyerName: {
      type: String,
      required: true,
    },
    cropName: {
      type: String,
      required: true,
    },
    cropQuantity: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    cropPrice: {
      type: Number,
      required: true,
    },
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    cropImage: {
      type: String, // URL or file path for image storage
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);



const pastCropSchema = mongoose.Schema(
  {
    farmerName: {
      type: String,
      required: true,
    },
    buyerName: {
      type: String,
      required: true,
    },
    cropName: {
      type: String,
      required: true,
    },
    cropQuantity: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    cropPrice: {
      type: Number,
      required: true,
    },
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    cropImage: {
      type: String, // URL or file path for image storage
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);


const FarmerCrop = mongoose.model("FarmerCrop", farmerCropSchema);
const ContractCrop = mongoose.model("ContractCrop", contractCropSchema);
const RequestCrop = mongoose.model("RequestCrop", requestCropSchema);
const FarmerAcceptCrop = mongoose.model("FarmerAcceptCrop", acceptfarmerCropSchema);
const BuyerAcceptCrop = mongoose.model("BuyerAcceptCrop", acceptbuyerCropSchema);
const AcceptCrop = mongoose.model("AcceptCrop", acceptCropSchema);
const PastCrop = mongoose.model("PastCrop", pastCropSchema);

export {FarmerCrop,ContractCrop,RequestCrop,FarmerAcceptCrop,BuyerAcceptCrop,AcceptCrop,PastCrop};
