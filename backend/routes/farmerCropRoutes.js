

import express from 'express';
import multer from 'multer';
import { addCrop, getUserCrops, getAllCrops, addContractCrops,getMyContracts ,requestCrops,getRequestCrops,addAcceptCrops,getFarmerAcceptsCrops,getBuyerAcceptsCrops,addPastCrops,getBuyerPastCrops,getFarmerPastCrops,updateCrop} from '../controllers/cropController.js';
import { authenticate as protect } from '../middlewares/authMiddleware.js';
import {RequestCrop,AcceptCrop,FarmerCrop} from '../models/Crop.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', protect, upload.single('cropImage'), addCrop);
router.get('/my-crop', protect, getUserCrops);
router.get('/all-crop', protect, getAllCrops);
router.post('/contractcrops',protect,addContractCrops);
router.get('/getmyContracts',protect, getMyContracts);
router.post('/requestcrops',protect, requestCrops);
router.get('/getrequestcrops',protect, getRequestCrops);
router.post('/acceptcrops',protect, addAcceptCrops);
router.get('/getfarmeracceptcrops',protect, getFarmerAcceptsCrops);
router.get('/getbuyeracceptcrops',protect,getBuyerAcceptsCrops);
router.post('/pastcrops',protect,addPastCrops);
router.get('/getbuyerpastcrops',protect,getBuyerPastCrops);
router.get('/getfarmerpastcrops',protect,getFarmerPastCrops);
router.put('/editcrop/:id', updateCrop);

router.delete('/requestCrops/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCrop = await RequestCrop.findByIdAndDelete(id);
        if (!deletedCrop) {
            return res.status(404).json({ message: "Crop request not found" });
        }
        res.json({ message: "Crop request deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.delete('/deletefromCrop/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCrop = await FarmerCrop.findByIdAndDelete(id);
        if (!deletedCrop) {
            return res.status(404).json({ message: "Crop request not found" });
        }
        res.json({ message: "Crop deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.delete('/acceptCrops/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCrop = await AcceptCrop.findByIdAndDelete(id);
        if (!deletedCrop) {
            return res.status(404).json({ message: "Crop request not found" });
        }
        res.json({ message: "Crop request deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


export default router;


