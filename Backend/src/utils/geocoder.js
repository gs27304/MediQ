export const getCoordinatesFromAddress = async (address) => {
    try {
        console.log("➡️ [Geocoder] Received address:", address);
        if (!address) return [0, 0];

        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        
        const response = await fetch(url, {
            headers: {
                // IMPORTANT: Replace with a real email, otherwise they block you!
                'User-Agent': 'MediQ-App (your_actual_email@gmail.com)' 
            }
        });
        
        const data = await response.json();
        console.log("➡️ [Geocoder] API Data:", data.length > 0 ? "Found Results" : "No Results");

        if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lng = parseFloat(data[0].lon);
            console.log("➡️ [Geocoder] Success! Returning:", [lng, lat]);
            return [lng, lat]; 
        }

        return [0, 0]; 

    } catch (error) {
        // If this prints "fetch is not defined", you need to install node-fetch or update Node.js
        console.error("❌ [Geocoder] Fatal Error:", error.message);
        return [0, 0];
    }
};