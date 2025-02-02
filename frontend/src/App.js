import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostsList from "./components/PostsList";
import AddPost from "./components/AddPost";
import PostDetails from "./components/PostDetails";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PostsList />} />
                <Route path="/add-post" element={<AddPost />} />
                <Route path="/post/:id" element={<PostDetails />} />
                <Route path="/edit-post/:id" element={<AddPost />} /> {/* Route for editing a post */}
            </Routes>
        </Router>
    );
};

export default App;
