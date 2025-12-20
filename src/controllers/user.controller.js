import asyncHandler from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const registerUser = asyncHandler( async (req, res) => {
    // Get user information from front end
    // validation (not empty)
    // check user already exists
    // check for image , avatar
    // upload on cloudinary
    // save data in db

    const {fullName, email, username, password} =await req.body
    
    if(
        [fullName,email,username,password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields Required")
    }

    const existingUser =User.findOne({
        $or: [{email},{username}]
    })

    if(existingUser) throw new ApiError(100, "User already exists")
    
    const localPathAvatar = req.files?.avatar[0]?.path;
    const localPathCoverImage = req.files?.coverImage[0]?.path;

    if(!localPathAvatar) throw new ApiError(400,"Avatar is mandatory")
    
    const avatar = await uploadOnCloudinary(localPathAvatar)
    const coverImage = await uploadOnCloudinary(localPathCoverImage)

    if(!avatar) throw new ApiError(400,"Avatar is mandatory")

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        avatar: avatar.url,
        coverImage: coverImage?.url || "", 
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) throw new ApiError(500,"Error while registering User")
    return res.status(200).json(
        new ApiResponse(200, createdUser, "User Created Successfully")
    )


})

export  {registerUser}