const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: String,
    image: String, // Cloudinary URL
    description: String,
    createdAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model("Blog", blogSchema);
