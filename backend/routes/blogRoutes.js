const express = require("express");
const Blog = require("../models/Blog");
const upload = require("../middleware/upload");

const router = express.Router();

// Upload Image & Add Blog Post
router.post("/add-post", upload.single("image"), async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file.path; // Cloudinary image URL

        const newPost = new Blog({ title, image, description });
        await newPost.save();
        res.status(201).json({ message: "Post added successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Blog Posts
router.get("/posts", async (req, res) => {
    try {
        const posts = await Blog.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/post/:id", async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a Post
router.put("/post/:id", upload.single("image"), async (req, res) => {
    try {
        const { title, description } = req.body;
        const updateData = { title, description };
        
        // If a new image is uploaded, update it as well
        if (req.file) {
            updateData.image = req.file.path;
        }

        const updatedPost = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a Post
router.delete("/post/:id", async (req, res) => {
    try {
        const deletedPost = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json({ message: "Post deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
