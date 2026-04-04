// utils/geocoder.js

export const getCoordinatesFromAddress = async (address) => {
    try {
        if (!address) return [0, 0];

        // Using OpenStreetMap's free Geocoding API
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        
        const response = await fetch(url, {
            headers: {
                // Nominatim requires a User-Agent header for free access
                'User-Agent': 'MediQ-App (your_email@example.com)' 
            }
        });
        
        const data = await response.json();

        // If the API found the location
        if (data && data.length > 0) {
            // Nominatim returns lat and lon as strings, we must parse them
            const lat = parseFloat(data[0].lat);
            const lng = parseFloat(data[0].lon);
            
            // VERY IMPORTANT: MongoDB requires Longitude FIRST
            return [lng, lat]; 
        }

        // Fallback if address is too vague or not found
        return [0, 0]; 

    } catch (error) {
        console.error("Geocoding Error: ", error);
        return [0, 0];
    }
};