import { useState, useEffect } from 'react';
import './Blog.css';

export default function Blog() {
    // 1. Initialize with an empty array so it dynamically populates
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Fetch data from your Azure Function when the component mounts
    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch('https://blog-portfolio-std.azurewebsites.net/api/publish');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching blog posts from Azure:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    if (loading) {
        return <div className="blog-container"><p className="page-title">Loading posts...</p></div>;
    }

    return (
        <div className="blog-container">
            <h1 className="page-title">Blog</h1>
            <div className="blog-grid">
                {/* Note: Removed .slice().reverse() since your backend code already handles sorting via .sort({ createdAt: -1 }) */}
                {posts.map((post) => (
                    // 3. Changed post.id to post._id to match MongoDB's default ID field
                    <BlogCard key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
}


function BlogCard({ post }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const hasImages = post.images && post.images.length > 0;
    const hasMultipleImages = post.images && post.images.length > 1;

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % post.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + post.images.length) % post.images.length);
    };

    return (
        <article className={`blog-card ${post.type}`}>
            <div className="blog-image-left" style={{ position: 'relative', overflow: 'hidden' }}>
                {hasImages && (
                    <a href={post.images[currentImageIndex]} target="_blank" rel="noopener noreferrer" style={{
                        display: 'block', width: '100%', height: '100%'
                    }}>
                        <img
                            src={post.images[currentImageIndex]
                            }
                            alt={post.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </a>
                )}

                {/* Mostra le frecce solo se ci sono più di un'immagine */}
                {hasMultipleImages && (
                    <>
                        <button
                            onClick={prevImage}
                            style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}
                        >
                            ❮
                        </button>
                        <button
                            onClick={nextImage}
                            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}
                        >
                            ❯
                        </button>

                        {/* Indicatore opzionale (es. 1/3) */}
                        <span style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>
                            {currentImageIndex + 1} / {post.images.length}
                        </span>
                    </>
                )}
            </div>

            <div className="blog-content-right">
                {post.type === 'milestone' && <span className="badge">🏆 Milestone</span>}
                <h2>{post.title}</h2>
                <p className="post-date">{new Date(post.createdAt).toLocaleDateString()}</p>

                <p className="post-text">{post.textArea}</p>
                <div className="tags">
                    {post.tags && post.tags.map((tag, i) => <span key={i} className="tag">#{tag}</span>)}
                </div>
            </div>
        </article>
    );
}

