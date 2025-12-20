import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET_KEY
})


const uploadOnCloudinary = async  (localFilePath) => {
    try {
        if(!localFilePath) return null
        // Upload file on cloudinary
        const response =await cloudinary.uploader.upload(localFilePath,{resource_type: "auto"})
        // Uploaded successfully
        return response.url
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the local file after upload failed
        return null
    }
}

export {uploadOnCloudinary}