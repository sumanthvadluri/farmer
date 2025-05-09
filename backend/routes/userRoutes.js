import express from "express";
import {authenticate,authorizeAdmin} from "../middlewares/authMiddleware.js";
import { createUser, userLogin,userLogOut,getAllUsers} from "../controllers/userControllers.js";
import User from "../models/User.js"; // Import your User model
import asyncHandler from "../middlewares/asyncHandler.js";

const router=express.Router();
router.route('/').post(createUser).get(authenticate,authorizeAdmin,getAllUsers)
router.route('/auth').post(userLogin)
router.route('/logout').post(userLogOut)
router.get("/profile", authenticate, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password"); // Exclude password

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
}));

export default router;