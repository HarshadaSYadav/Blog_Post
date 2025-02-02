import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const PostDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/post/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/post/${id}`);
            alert("Post deleted successfully!");
            navigate("/"); // Redirect to the posts list after deletion
        } catch (error) {
            alert("Failed to delete the post.");
            console.error(error);
        }
    };

    const handleEdit = () => {
        navigate(`/add-post`, { state: { post } }); // Pass the current post data for editing
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="detailed-post-container">
            <img src={post.image} alt={post.title} />
            <h1>{post.title}</h1>
            <div className="post-description">
                {post.description.split("\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
            <p className="post-date">
                Posted on: {new Date(post.createdAt).toLocaleString()}
            </p>
            <div className="action-buttons">
                <button className="edit-btn" onClick={handleEdit}>
                    Edit
                </button>
                <button className="delete-btn" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default PostDetails;
