const uploadImageToCloudinary = async (file) => {
  const uploadData = new FormData();

  uploadData.append("file", file);
  // These are your Cloudinary credentials
  uploadData.append("upload_preset", "your_unsigned_preset_name"); 
  uploadData.append("cloud_name", "your_cloud_name");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`,
    {
      method: "post",
      body: uploadData,
    }
  );

  const data = await res.json();
  return data; // This returns an object containing the secure_url
};

export default uploadImageToCloudinary; 