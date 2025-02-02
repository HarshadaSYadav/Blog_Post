import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../App.css";

const AddPost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [post, setPost] = useState(location.state?.post || null);

    useEffect(() => {
        if (post) {
            setPost(post);
        }
    }, [post]);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        image: Yup.mixed()
            .test("fileType", "Only JPG, JPEG, PNG images are allowed", (value) => {
                if (!value) return true; // Allow empty for editing
                return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
            })
            .test("fileSize", "File size too large (Max: 2MB)", (value) => {
                return value ? value.size <= 2 * 1024 * 1024 : true;
            }),
    });

    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        if (values.image) formData.append("image", values.image);

        try {
            if (post) {
                await axios.put(`http://localhost:5000/api/post/${post._id}`, formData);
                alert("Post updated successfully!");
            } else {
                await axios.post("http://localhost:5000/api/add-post", formData);
                alert("Post added successfully!");
            }
            navigate("/");
        } catch (error) {
            alert("Failed to save the post.");
            console.error(error);
        }
    };

    return (
        <div className="add-post-container">
            <button className="home-button" onClick={() => navigate("/")}>
                Home
            </button>
            <h2>{post ? "Edit Post" : "Add Post"}</h2>
            <Formik
                initialValues={{
                    title: post?.title || "",
                    description: post?.description || "",
                    image: null,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <Field type="text" name="title" placeholder="Title" />
                        <ErrorMessage name="title" component="div" className="error" />

                        <Field as="textarea" name="description" placeholder="Description" />
                        <ErrorMessage name="description" component="div" className="error" />

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFieldValue("image", e.target.files[0])}
                        />
                        <ErrorMessage name="image" component="div" className="error" />

                        <button type="submit">{post ? "Update Post" : "Add Post"}</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddPost;
