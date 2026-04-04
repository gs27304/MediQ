import { Hospital } from "../models/hospital.model.js"; 
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const getNearbyHospitals = async (req, res) => {
    try {
        const lat = parseFloat(req.query.lat);
        const lng = parseFloat(req.query.lng);

        // Fallback if no location is provided (returns all hospitals, unsorted)
        if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
            const hospitals = await Hospital.find();
            return res.status(200).json({ success: true, data: hospitals });
        }

        // $geoNear MUST be the first stage in an aggregation pipeline
        const hospitals = await Hospital.aggregate([
            {
                $geoNear: {
                    near: { 
                        type: "Point", 
                        coordinates: [lng, lat] // LONGITUDE FIRST!
                    },
                    distanceField: "calculatedDistance", // MongoDB will put the distance here (in meters)
                    spherical: true,
                    // Optional: maxDistance: 50000 // Only show hospitals within 50km (50,000 meters)
                }
            }
        ]);

        res.status(200).json({ success: true, data: hospitals });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};