import { Doctor } from "../models/doctor.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import mongoose from "mongoose";

// 1. GET SINGLE DOCTOR
export const getSingleDoctor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const doctor = await Doctor.findById(id).populate("reviews").select("-password");

    if (!doctor) throw new ApiError(404, "Doctor not found");

    res.status(200).json(new ApiResponse(200, doctor, "Doctor fetched successfully"));
});

// 2. GET DOCTOR PROFILE (Self)
export const getDoctorProfile = asyncHandler(async (req, res) => {
    const doctorId = req.userId;
    const doctor = await Doctor.findById(doctorId).select("-password");

    if (!doctor) throw new ApiError(404, "Profile not found");

    res.status(200).json(new ApiResponse(200, doctor, "Profile data fetched"));
});

// 3. DELETE DOCTOR
export const deleteDoctor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Doctor.findByIdAndDelete(id);
    res.status(200).json(new ApiResponse(200, {}, "Doctor deleted successfully"));
});

// 4. UPDATE DOCTOR
export const updateDoctor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // ... logic for parsing qualifications/experiences and uploading to cloudinary
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json(new ApiResponse(200, updatedDoctor, "Doctor updated successfully"));
});

// 5. SEARCH DOCTORS (AI + Location)

export const getAllDoctor = asyncHandler(async (req, res) => {
    const { query, lat, lng } = req.query; // User's current coordinates
    let dbQuery = { isApproved: 'approved' };

    // 1. AI Intent Mapping (Symptom -> Specialty)
    if (query) {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `Act as a medical triage assistant. Based on the user concern: "${query}", 
        identify the single most relevant medical specialty (e.g., Cardiologist, Dermatologist, Neurologist). 
        Return ONLY the specialty name.`;
        
        const result = await model.generateContent(prompt);
        const specialty = result.response.text().trim();
        
        // Use regex for flexible matching against the AI-identified specialty
        dbQuery.specialization = { $regex: specialty, $options: "i" };
    }

    // 2. Geospatial Radial Search (Closest First)
    let doctors;
    if (lat && lng) {
        doctors = await Doctor.find(dbQuery)
            .where('location')
            .near({
                center: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
                spherical: true
            })
            .limit(20) // Requirement: min(20, available)
            .select("-password");
    } else {
        doctors = await Doctor.find(dbQuery).limit(20).select("-password");
    }

    res.status(200).json(new ApiResponse(200, doctors, "Targeted specialists found."));
});