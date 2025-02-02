require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: 'https://blog-post-the5.vercel.app',// Allow the frontend domain
  methods: "GET,POST,PUT,DELETE,OPTIONS", // Allowed methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Middleware
// Handle preflight requests
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use((req, res, next) => {
  console.log("CORS Headers:");
  console.log(req.headers);
  next();
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const blogRoutes = require("./routes/blogRoutes");
app.use("/api", blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; 
