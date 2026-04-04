import { asyncHandler } from "../utils/asyncHandler.js"
import { Doctor } from "../models/doctor.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import bcrypt from "bcryptjs"
import { Hospital } from "../models/hospital.model.js"; 
import { getCoordinatesFromAddress } from "../utils/geocoder.js";

// you can also take user(which can be doctor or patient) directly and call like user.generatejwttoken()
const generatetoken = async(userId, userRole) => {
    let jwttoken = null
    if(userRole == "patient"){
        const patient = await User.findById(userId)
        if(patient){
            jwttoken = await patient.generatejwttoken()
        }
    }
    else {
        // Note: You might want to add hospital logic here if hospitals need to login!
        const doctor = await Doctor.findById(userId)
        if(doctor)
            jwttoken = await doctor.generatejwttoken()
    }

    return { jwttoken }
}

const signUp = asyncHandler(async(req, res) => {
    // 1. Destructure all possible fields
    const { 
        email, password, name, role, gender, phone, 
        address, lat, lng, 
        icuBeds, generalBeds, bloodA, bloodB, bloodO, bloodAB 
    } = req.body;

    // 2. Check if user already exists
    let existingUser = await User.findOne({email}) || await Doctor.findOne({email}) || await Hospital.findOne({email});
    if(existingUser){
        throw new ApiError(400, "User already exists");
    }

    // 3. Handle File Upload via Multer
    let photoUrl = "";
    if (req.file) {
        const photoLocalPath = req.file.path;
        const uploadResult = await uploadOnCloudinary(photoLocalPath);
        if (uploadResult) photoUrl = uploadResult.url;
    }

    // 4. Handle Geolocation (GPS vs Geocoding)
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);
    let finalCoordinates = [0, 0]; // Default fallback

    // Priority 1: If exact GPS coordinates are provided via frontend
    if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
        finalCoordinates = [parsedLng, parsedLat];
    } 
    // Priority 2: Auto-convert text address to coordinates using Geocoder
    else if (address) {
        finalCoordinates = await getCoordinatesFromAddress(address);
    }

    // Form the mandatory GeoJSON object
    const locationData = {
        type: "Point",
        coordinates: finalCoordinates
    };

    let user = null;

    // 5. Create Entity
    if (role === "patient") {
        const payload = { 
            name, email, password, gender, role, phone, address, photo: photoUrl,
            location: locationData // Injecting coordinates here
        };
        user = await User.create(payload);

    } else if (role === "doctor") {
        const payload = { 
            name, email, password, gender, role, phone, address, photo: photoUrl,
            location: locationData // Injecting coordinates here
        };
        user = await Doctor.create(payload);

    } else if (role === "hospital") {
        const bloodInventory = {
            "A+": { available: parseInt(bloodA) || 0 },
            "B+": { available: parseInt(bloodB) || 0 },
            "O+": { available: parseInt(bloodO) || 0 },
            "AB+": { available: parseInt(bloodAB) || 0 },
            "A-": { available: 0 },
            "B-": { available: 0 },
            "O-": { available: 0 },
            "AB-": { available: 0 }
        };

        const payload = {
            name, email, password, role, phone, address, photo: photoUrl,
            location: locationData, // Injecting coordinates here
            icuBeds: { available: parseInt(icuBeds) || 0 },
            generalBeds: { available: parseInt(generalBeds) || 0 },
            bloodInventory
        };
        
        user = await Hospital.create(payload);
    }  

    // 6. Return response safely
    const finalUser = await (role === "patient" ? User : role === "doctor" ? Doctor : Hospital)
        .findById(user._id).select("-password");

    res.status(200).json(new ApiResponse(200, finalUser, "Registration successful"));
});

const login = asyncHandler(async(req,res) => {
    const {email, password} = req.body

    let user = null
    // checking user exits or not 
    const patient = await User.findOne({email})
    const doctor = await Doctor.findOne({email})
    // Note: You might need to add `const hospital = await Hospital.findOne({email})` here!

    if(patient){
        user = patient
    } else if(doctor){
        user = doctor
    }

    if(!user){
        throw new ApiError(404, "User not found")
    }

    // compare password 
    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if(!isPasswordMatch){
        throw new ApiError(400, "Invalid credentials")
    }

    // creating json web token 
    const {jwttoken} = await generatetoken(user._id, user.role)

    let {password: userPassword, role, appointments, ...rest} = user._doc
    const option = {
        httpOnly:true,
        secure:false,
        // sameSite: 'None',
        path: '/',
    }

    res.status(200).
        cookie("token",jwttoken, option)
        .json(new ApiResponse(
            200,{...rest, role ,token:jwttoken} , "login successful"
        ))
})

export {signUp, login}