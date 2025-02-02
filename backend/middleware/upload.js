const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// Multer Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "blog-posts", // Folder in Cloudinary
        allowedFormats: ["jpg", "jpeg", "png"],
    },
});

const upload = multer({ storage });

module.exports = upload;
