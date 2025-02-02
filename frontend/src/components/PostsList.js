import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const PostsList = () => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get("https://blog-post-sigma-snowy.vercel.app/api/posts");
            setPosts(response.data);
        };
        fetchPosts();
    }, []);

    // Filter posts based on search query
    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination Logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    // Generate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="posts-list-container">
            <h2>Blog Posts</h2>
            <div className="top-controls">
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="add-post-btn" onClick={() => navigate("/add-post")}>
                    Add Post
                </button>
            </div>
            <div className="posts">
                {currentPosts.length > 0 ? (
                    currentPosts.map((post) => (
                        <div key={post._id} className="post-card">
                            <img src={post.image} alt={post.title} />
                            <div className="post-content">
                                <h3
                                    className="post-title"
                                    onClick={() => navigate(`/post/${post._id}`)}
                                >
                                    {post.title}
                                </h3>
                                <p className="post-description">
                                    {post.description.substring(0, 100)}...
                                </p>
                                <p className="post-date">
                                    Posted on: {new Date(post.createdAt).toLocaleString()}
                                </p>
                                <button
                                    className="read-more-btn"
                                    onClick={() => navigate(`/post/${post._id}`)}
                                >
                                    Read More
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No posts found.</p>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        {"<"}
                    </button>
                    {pageNumbers.map((number) => (
                        <button
                            key={number}
                            className={`page-number ${currentPage === number ? "active" : ""}`}
                            onClick={() => setCurrentPage(number)}
                        >
                            {number}
                        </button>
                    ))}
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        {">"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default PostsList;
