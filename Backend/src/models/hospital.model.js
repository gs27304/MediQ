import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Add this for password hashing

const hospitalSchema = new mongoose.Schema({
    // ADD MISSING AUTH FIELDS
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "hospital" },
    phone: { type: String },

    name: { type: String, required: true },
    photo: { type: String },
    address: { type: String },
    
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], default: [0,0] } 
    },
    
    // RESOURCE INVENTORY
    icuBeds: {
        total: Number,
        available: Number,
        pricePerDay: Number
    },
    generalBeds: {
        total: Number,
        available: Number,
        pricePerDay: Number
    },
    bloodInventory: {
        "A+": { available: Number, pricePerUnit: Number },
        "B+": { available: Number, pricePerUnit: Number },
        "O+": { available: Number, pricePerUnit: Number },
        "AB+": { available: Number, pricePerUnit: Number },
        "A-": { available: Number, pricePerUnit: Number },
        "B-": { available: Number, pricePerUnit: Number },
        "O-": { available: Number, pricePerUnit: Number },
        "AB-": { available: Number, pricePerUnit: Number }
    }
}, { timestamps: true });

// Hash password before saving (Just like User & Doctor)
hospitalSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

hospitalSchema.index({ location: "2dsphere" });
export const Hospital = mongoose.model("Hospital", hospitalSchema);