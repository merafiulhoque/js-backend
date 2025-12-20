import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: [true,"All should be in lower case"],
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: [true,"All should be in lower case"],
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
    },
    watchHistory: [{
        type: mongoose.Schema.Type.ObjectId,
        ref: "Video"
    }],
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String
    }
},{timestamps: true})


UserSchema.pre("save", async function (next){
    if(!this.password.isModified()) return next()
    this.password =await bcrypt.hash(this.password,10)
    next();
})

UserSchema.methods.isPasswordCorrect = async function (pass) {
    return await bcrypt.compare(pass, this.password)
}

UserSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        fullName: this.fullName,
    }, process.env.ACCESS_TOKEN_SECRET,{expiresIn: process.env.ACCESS_TOKEN_EXPIRY})
}

UserSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id
    }, process.env.REFRESH_TOKEN_SECRET,{expiresIn: process.env.REFRESH_TOKEN_EXPIRY})
}

const User = mongoose.model("User",UserSchema)
export default User