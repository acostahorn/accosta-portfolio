import { useState, useEffect } from "react";
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
    const [images, setImages] = useState([]);
    const [posts, setPosts] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const fetchPosts = async () => {
        try {
            const res = await fetch('https://blog-portfolio-dscad0b7esggdsbr.uksouth-01.azurewebsites.net/api/publish'); // Sostituisci con il tuo endpoint effettivo
            const data = await res.json();
            setPosts(data);
            console.log("Caricamento dati riuscito!")

        } catch (err) {
            console.error('Errore nel caricamento dei post:', err);
        }


    }

    useEffect(() => {
        fetchPosts();
    }, []);

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
                    formData.append('file', file);
                    formData.append('upload_preset', uploadPreset);

                    const response = await fetch(
                        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                        { method: 'POST', body: formData }

                    );

                    if (!response.ok) throw new Error("Cloudinary upload failed");

                    const data = await response.json();
                    uploadedImageUrls.push(data.secure_url)
                }
                console.log("Images successfully hosted:", uploadedImageUrls);

            }

            // Prepariamo l'oggetto post
            const postData = {
                title,
                type,
                textArea,
                tags: processedTags,
            };

            // Aggiungiamo le immagini solo se ne sono state caricate di nuove
            if (uploadedImageUrls.length > 0) {
                postData.images = uploadedImageUrls;
            }

            const url = import.meta.env.VITE_AZURE_FUNCTION_URL;

            // Discriminazione tra Creazione (POST) e Modifica (PUT)


            const method = editingId ? 'PUT' : 'POST';

            const payload = editingId
                ? { ...postData, id: editingId }
                : postData;




            console.log(`Forwarding to Azure (${method}) ...`, payload);

            const azureResponse = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(payload)
            });


            if (!azureResponse.ok) {
                const responseText = await azureResponse.text();
                console.error("Risposta dal server:", responseText);
                throw new Error("Azure Function failed to connect to forward document to MongoDB");

            }

            alert("Success! Post has been securely saved to MongoDB Atlas via Azure Function")

            handleCancelEdit();
            fetchPosts();

        } catch (error) {
            console.error("Upload process failed:", error);
            alert("An error occurred during publishing.");
        }

    };

    const handleSelectPost = (post) => {
        // 1. Memorizziamo l'ID del post (usiamo _id che è lo standard di MongoDB)
        setEditingId(post._id || post.id);

        // 2. Compiliamo i campi del form con i dati del post scelto
        setTitle(post.title || '');
        setType(post.type || 'blog'); // Se hai il tipo (es. milestone o blog)
        setTextArea(post.textArea || post.content || ''); // Adatta a seconda di come chiami il campo nel DB

        // Se i tag sono salvati come array nel DB, li rimettiamo in stringa separata da virgole per l'input
        setTags(Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || ''));

        // Nota: per le immagini esistenti possiamo gestirle dopo, intanto ci concentriamo sul testo!
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setTitle('');
        setType('milestone'); // o il tuo default
        setTextArea('');
        setTags('');
        setImages([]);
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
        <div className="admin-dashboard-container" style={{ display: 'flex', gap: '30px', padding: '20px', alignItems: 'flex-start' }}>
            {/* COLONNA SINISTRA: Lista dei post esistenti (cliccabili) */}
            <div className="admin-sidebar" style={{ flex: '1', minWidth: '280px', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <h3>Existing Posts</h3>
                <p className="admin-subtitle" style={{ fontSize: '0.9rem', color: '#666' }}>Select a post to edit:</p>

                {editingId && (
                    <button
                        type="button"
                        onClick={handleCancelEdit}
                        style={{ marginBottom: '15px', width: '100%', background: '#e9ecef', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}
                    >
                        + Create New Entry Instead
                    </button>
                )}

                {posts.length === 0 ? (
                    <p style={{ fontSize: '0.9rem', color: '#888' }}>Nessun post trovato.</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '600px', overflowY: 'auto' }}>
                        {posts.map((post) => {
                            const formattedDate = post.createdAt
                                ? new Date(post.createdAt).toLocaleDateString()
                                : 'Data non disponibile';

                            return (
                                <li
                                    key={post._id || post.id}
                                    onClick={() => handleSelectPost(post)}
                                    style={{
                                        padding: '12px',
                                        margin: '8px 0',
                                        background: editingId === (post._id || post.id) ? '#e2e8f0' : '#f8f9fa',
                                        border: '1px solid #dee2e6',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        transition: 'background 0.2s'
                                    }}
                                >
                                    <div style={{ fontWeight: '600', fontSize: '0.95rem', marginBottom: '4px' }}>{post.title}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>{formattedDate}</div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
            <div className="admin-form-card" style={{ flex: '2', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} >
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
        </div >
    );

}






