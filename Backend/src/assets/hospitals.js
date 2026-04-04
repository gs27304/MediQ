import { Hospital } from "../models/hospital.model.js"; 
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const Hospitals=[
    {
  "name": "NSCB Medical College Hospital",
  "photo": "/images/ncb.jpg",
  "address": "Nagpur Road, Jabalpur, MP",
  "location": { "type": "Point", "coordinates": [79.9864, 23.1815] },
  "icuBeds": { "total": 80, "available": 20, "pricePerDay": 2500 },
  "generalBeds": { "total": 400, "available": 120, "pricePerDay": 800 },
  "bloodInventory": {
    "A+": { "available": 30, "pricePerUnit": 1500 },
    "B+": { "available": 25, "pricePerUnit": 1400 },
    "O+": { "available": 40, "pricePerUnit": 1600 },
    "AB+": { "available": 10, "pricePerUnit": 1700 },
    "A-": { "available": 8, "pricePerUnit": 2000 },
    "B-": { "available": 6, "pricePerUnit": 2100 },
    "O-": { "available": 12, "pricePerUnit": 2200 },
    "AB-": { "available": 4, "pricePerUnit": 2300 }
  },
  
},
{
  "name": "Metro Hospital",
  "photo": "/images/metro.jpg",
  "address": "Wright Town, Jabalpur, MP",
  "location": { "type": "Point", "coordinates": [79.9440, 23.1660] },
  "icuBeds": { "total": 40, "available": 10, "pricePerDay": 3500 },
  "generalBeds": { "total": 150, "available": 45, "pricePerDay": 1200 },
  "bloodInventory": {
    "A+": { "available": 15, "pricePerUnit": 1800 },
    "B+": { "available": 12, "pricePerUnit": 1700 },
    "O+": { "available": 20, "pricePerUnit": 1900 },
    "AB+": { "available": 6, "pricePerUnit": 2000 },
    "A-": { "available": 5, "pricePerUnit": 2400 },
    "B-": { "available": 4, "pricePerUnit": 2500 },
    "O-": { "available": 7, "pricePerUnit": 2600 },
    "AB-": { "available": 2, "pricePerUnit": 2700 }
  }
}
,{
  "name": "Bhandari Hospital",
  "photo": "/images/bhandari.webp",
  "address": "Napier Town, Jabalpur",
  "location": { "type": "Point", "coordinates": [79.9300, 23.1700] },
  "icuBeds": { "total": 25, "available": 8, "pricePerDay": 3000 },
  "generalBeds": { "total": 100, "available": 30, "pricePerDay": 900 },
  "bloodInventory": {
    "A+": { "available": 10, "pricePerUnit": 1600 },
    "B+": { "available": 8, "pricePerUnit": 1500 },
    "O+": { "available": 12, "pricePerUnit": 1700 },
    "AB+": { "available": 4, "pricePerUnit": 1800 },
    "A-": { "available": 3, "pricePerUnit": 2200 },
    "B-": { "available": 2, "pricePerUnit": 2300 },
    "O-": { "available": 5, "pricePerUnit": 2400 },
    "AB-": { "available": 1, "pricePerUnit": 2500 }
  }
},
{
  "name": "Jabalpur Hospital & Research Centre",
  "photo": "/images/jabalpur.jpg",
  "address": "Russel Chowk, Jabalpur",
  "location": { "type": "Point", "coordinates": [79.9500, 23.1705] },
  "icuBeds": { "total": 35, "available": 12, "pricePerDay": 3200 },
  "generalBeds": { "total": 180, "available": 60, "pricePerDay": 1000 },
  "bloodInventory": {
    "A+": { "available": 18, "pricePerUnit": 1700 },
    "B+": { "available": 14, "pricePerUnit": 1600 },
    "O+": { "available": 22, "pricePerUnit": 1800 },
    "AB+": { "available": 5, "pricePerUnit": 1900 },
    "A-": { "available": 4, "pricePerUnit": 2300 },
    "B-": { "available": 3, "pricePerUnit": 2400 },
    "O-": { "available": 6, "pricePerUnit": 2500 },
    "AB-": { "available": 2, "pricePerUnit": 2600 }
  }
},
{
  "name": "Global Hospital",
  "photo": "/images/delhi.jpg",
  "address": "Adhartal, Jabalpur",
  "location": { "type": "Point", "coordinates": [79.9800, 23.2000] },
  "icuBeds": { "total": 20, "available": 6, "pricePerDay": 2800 },
  "generalBeds": { "total": 90, "available": 25, "pricePerDay": 850 },
  "bloodInventory": {
    "A+": { "available": 9, "pricePerUnit": 1500 },
    "B+": { "available": 7, "pricePerUnit": 1400 },
    "O+": { "available": 12, "pricePerUnit": 1600 },
    "AB+": { "available": 3, "pricePerUnit": 1700 },
    "A-": { "available": 2, "pricePerUnit": 2100 },
    "B-": { "available": 2, "pricePerUnit": 2200 },
    "O-": { "available": 4, "pricePerUnit": 2300 },
    "AB-": { "available": 1, "pricePerUnit": 2400 }
  }
},
{
  "name": "Seth Govind Das District Hospital",
  "photo": "/images/seth.jpg",
  "address": "Jabalpur City",
  "location": { "type": "Point", "coordinates": [79.9400, 23.1750] },
  "icuBeds": { "total": 60, "available": 18, "pricePerDay": 2000 },
  "generalBeds": { "total": 300, "available": 100, "pricePerDay": 700 },
  "bloodInventory": {
    "A+": { "available": 25, "pricePerUnit": 1400 },
    "B+": { "available": 20, "pricePerUnit": 1300 },
    "O+": { "available": 35, "pricePerUnit": 1500 },
    "AB+": { "available": 8, "pricePerUnit": 1600 },
    "A-": { "available": 6, "pricePerUnit": 1900 },
    "B-": { "available": 5, "pricePerUnit": 2000 },
    "O-": { "available": 10, "pricePerUnit": 2100 },
    "AB-": { "available": 3, "pricePerUnit": 2200 }
  }
},
{
  "name": "AIIMS Delhi",
  "address": "Ansari Nagar, Delhi", 
  "photo": "/images/aiims_delhi.jpg",
  "location": { "type": "Point", "coordinates": [77.2090, 28.5672] },
  "icuBeds": { "total": 200, "available": 50, "pricePerDay": 1000 },
  "generalBeds": { "total": 1000, "available": 300, "pricePerDay": 500 },
  "bloodInventory": { "A+": { "available": 60, "pricePerUnit": 1200 } }
},
{
  "name": "Apollo Hospital Chennai",
  "address": "Greams Road, Chennai", 
  "photo": "/images/apollo.jpg",
  "location": { "type": "Point", "coordinates": [80.2518, 13.0604] },
  "icuBeds": { "total": 150, "available": 40, "pricePerDay": 5000 },
  "generalBeds": { "total": 500, "available": 150, "pricePerDay": 2000 }
},
{
  "name": "AIIMS Bhopal",
  "photo": "/images/hospitals/aiims_bhopal.jpg",
  "address": "Saket Nagar, Bhopal",
  "location": { "type": "Point", "coordinates": [77.3410, 23.2088] },
  "icuBeds": { "total": 120, "available": 35, "pricePerDay": 2000 },
  "generalBeds": { "total": 600, "available": 180, "pricePerDay": 800 },
  "bloodInventory": {
    "A+": { "available": 40, "pricePerUnit": 1500 },
    "B+": { "available": 35, "pricePerUnit": 1400 },
    "O+": { "available": 50, "pricePerUnit": 1600 },
    "AB+": { "available": 15, "pricePerUnit": 1700 },
    "A-": { "available": 10, "pricePerUnit": 2100 },
    "B-": { "available": 8, "pricePerUnit": 2200 },
    "O-": { "available": 12, "pricePerUnit": 2300 },
    "AB-": { "available": 5, "pricePerUnit": 2400 }
  }
},
{
  "name": "Bhopal Memorial Hospital & Research Centre",
  "photo": "/images/memorial.jpg",
  "address": "Raisen Road, Bhopal",
  "location": { "type": "Point", "coordinates": [77.4126, 23.2599] },
  "icuBeds": { "total": 90, "available": 25, "pricePerDay": 2800 },
  "generalBeds": { "total": 350, "available": 100, "pricePerDay": 1200 },
  "bloodInventory": {
    "A+": { "available": 30, "pricePerUnit": 1600 },
    "B+": { "available": 28, "pricePerUnit": 1500 },
    "O+": { "available": 45, "pricePerUnit": 1700 },
    "AB+": { "available": 12, "pricePerUnit": 1800 },
    "A-": { "available": 7, "pricePerUnit": 2200 },
    "B-": { "available": 6, "pricePerUnit": 2300 },
    "O-": { "available": 10, "pricePerUnit": 2400 },
    "AB-": { "available": 3, "pricePerUnit": 2500 }
  }
},
{
  "name": "Maharaja Yeshwantrao Hospital",
  "photo": "/images/MY.jpg",
  "address": "Indore",
  "location": { "type": "Point", "coordinates": [75.8577, 22.7196] },
  "icuBeds": { "total": 150, "available": 50, "pricePerDay": 1800 },
  "generalBeds": { "total": 800, "available": 250, "pricePerDay": 700 },
  "bloodInventory": {
    "A+": { "available": 55, "pricePerUnit": 1400 },
    "B+": { "available": 50, "pricePerUnit": 1300 },
    "O+": { "available": 70, "pricePerUnit": 1500 },
    "AB+": { "available": 20, "pricePerUnit": 1600 },
    "A-": { "available": 15, "pricePerUnit": 2000 },
    "B-": { "available": 12, "pricePerUnit": 2100 },
    "O-": { "available": 18, "pricePerUnit": 2200 },
    "AB-": { "available": 6, "pricePerUnit": 2300 }
  }
},
{
  "name": "Bombay Hospital Indore",
  "photo": "/images/Bombay_Hosp.jpg",
  "address": "Ring Road, Indore",
  "location": { "type": "Point", "coordinates": [75.8850, 22.7500] },
  "icuBeds": { "total": 100, "available": 30, "pricePerDay": 4500 },
  "generalBeds": { "total": 400, "available": 120, "pricePerDay": 2000 },
  "bloodInventory": {
    "A+": { "available": 35, "pricePerUnit": 1800 },
    "B+": { "available": 30, "pricePerUnit": 1700 },
    "O+": { "available": 50, "pricePerUnit": 1900 },
    "AB+": { "available": 12, "pricePerUnit": 2000 },
    "A-": { "available": 10, "pricePerUnit": 2500 },
    "B-": { "available": 8, "pricePerUnit": 2600 },
    "O-": { "available": 14, "pricePerUnit": 2700 },
    "AB-": { "available": 5, "pricePerUnit": 2800 }
  }
},
{
  "name": "Jay Arogya Hospital",
  "photo": "/images/jay.jpg",
  "address": "Lashkar, Gwalior",
  "location": { "type": "Point", "coordinates": [78.1828, 26.2183] },
  "icuBeds": { "total": 110, "available": 30, "pricePerDay": 2200 },
  "generalBeds": { "total": 500, "available": 150, "pricePerDay": 900 },
  "bloodInventory": {
    "A+": { "available": 40, "pricePerUnit": 1500 },
    "B+": { "available": 35, "pricePerUnit": 1400 },
    "O+": { "available": 55, "pricePerUnit": 1600 },
    "AB+": { "available": 14, "pricePerUnit": 1700 },
    "A-": { "available": 9, "pricePerUnit": 2100 },
    "B-": { "available": 7, "pricePerUnit": 2200 },
    "O-": { "available": 12, "pricePerUnit": 2300 },
    "AB-": { "available": 4, "pricePerUnit": 2400 }
  }
},
{
  "name": "Sanjay Gandhi Memorial Hospital",
  "photo": "/images/sanjay.jpg",
  "address": "Rewa",
  "location": { "type": "Point", "coordinates": [81.3000, 24.5300] },
  "icuBeds": { "total": 70, "available": 20, "pricePerDay": 2000 },
  "generalBeds": { "total": 300, "available": 90, "pricePerDay": 800 },
  "bloodInventory": {
    "A+": { "available": 28, "pricePerUnit": 1400 },
    "B+": { "available": 24, "pricePerUnit": 1300 },
    "O+": { "available": 35, "pricePerUnit": 1500 },
    "AB+": { "available": 10, "pricePerUnit": 1600 },
    "A-": { "available": 6, "pricePerUnit": 1900 },
    "B-": { "available": 5, "pricePerUnit": 2000 },
    "O-": { "available": 8, "pricePerUnit": 2100 },
    "AB-": { "available": 3, "pricePerUnit": 2200 }
  }
},
{
  "name": "District Hospital Ujjain",
  "photo": "/images/District_Ujjain.jpg",
  "address": "Agar Road, Ujjain",
  "location": { "type": "Point", "coordinates": [75.7849, 23.1765] },
  "icuBeds": { "total": 60, "available": 18, "pricePerDay": 1800 },
  "generalBeds": { "total": 250, "available": 80, "pricePerDay": 700 },
  "bloodInventory": {
    "A+": { "available": 20, "pricePerUnit": 1400 },
    "B+": { "available": 18, "pricePerUnit": 1300 },
    "O+": { "available": 28, "pricePerUnit": 1500 },
    "AB+": { "available": 7, "pricePerUnit": 1600 },
    "A-": { "available": 5, "pricePerUnit": 1900 },
    "B-": { "available": 4, "pricePerUnit": 2000 },
    "O-": { "available": 7, "pricePerUnit": 2100 },
    "AB-": { "available": 2, "pricePerUnit": 2200 }
  }
}
] 

const pushHospitalsToDB = asyncHandler(async (req, res) => {
    await Hospital.insertMany(Hospitals);
    res.status(200).json(new ApiResponse(200, {}, "Hospitals data seeded successfully"));
}); 