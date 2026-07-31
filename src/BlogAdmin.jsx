import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './BlogAdmin.css';

export default function BlogAdmin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [textArea, setTextArea] = useState('');
    const [type, setType] = useState('milestone');
    const [tags, setTags] = useState('');
    const [images, setImages] = useState ([]);

    const handleLogin = (e) => {
        e.preventDefault();
        const securePassword = import.meta.env.VITE_ADMIN_PASSWORD;
        if (password === securePassword) {
            setIsAuthenticated(true);
        } else {
            alert("Unauthorised Access Attempt");
            navigate('/blog'); // Kick out intruders to public page
        }
    };

    const handleFileChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    try {
        let uploadedImageUrls = [];

        if (images.length > 0) {
            console.log("Uploading images to Cloudinary ...");
            const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
            const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

            for (const file of images) {
                const formData = new FormData();
                formData.append('file',file);
                formData.append('upload_preset',uploadPreset);

                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    { method: 'POST', body: formData}

                );

                if (!response.ok) throw new Error ("Cloudinary upload failed");

                const data = await response.json();
                uploadedImageUrls.push(data.secure_url)
            }
            console.log("Images successfully hosted:", uploadedImageUrls);

        }

         const newPost = {
        title,
        type,
        textArea,
        tags: processedTags,
        images: uploadedImageUrls,
        createdAt: new Date().toISOString().split('T')[0]
    };

    console.log("Payload complete. Forwarding to Azure secure gateway... ", newPost);

    const azureResponse = await fetch(import.meta.env.VITE_AZURE_FUNCTION_URL, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(newPost)

    });

    if (!azureResponse.ok) {
        throw new Error("Azure Function failed to connect to forward document to MongoDB");

    }

    alert("Success! Post has been securely saved to MongoDB Atlas via Azure Function")



    } catch (error) {
        console.error("Upload process failed:", error);
        alert("An error occurred during publishing.");
    }

};

if (!isAuthenticated) {
    return (
        <div className="admin-login-container">
            <div className="login-card">
                <h2>🔒 Administrative Entry</h2>
                <p>Please enter your access key to manage your blog portfolio.</p>
                <form onSubmit={handleLogin}>
                    <input
                        type="password"
                        placeholder="Enter Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-btn">Unlock Dashboard</button>
                </form>
            </div>
        </div>
    );
};

return (
    <div className="admin-dashboard-container">
        <div className="admin-form-card">
            <h2>Create New Entry</h2>
            <p className="admin-subtitle">Document your latest achievements, certificates, or development articles.</p>

            <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        placeholder="e.g. Achieved my Microsoft Fundamentals AI AI-900"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Post Type</label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="milestone">🏆 Milestone / Academic Achievement</option>
                        <option value="blog">📝 Standard Blog Post</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Description / Content</label>
                    <textarea
                        rows="6"
                        placeholder="Write a brief overview or full description here..."
                        value={textArea}
                        onChange={(e) => setTextArea(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Tags (Comma-separated)</label>
                    <input
                        type="text"
                        placeholder="e.g. Achievement, Education, AI"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Attach Certificate or Image</label>
                    <div className="file-input-wrapper">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                        />
                    </div>
                    {images.length > 0 && (
                        <p className="file-count">📂 {images.length} file(s) ready for upload.</p>
                    )}
                </div>

                <button type="submit" className="publish-btn">Publish Entry</button>
            </form>
        </div>
    </div>
);

}






