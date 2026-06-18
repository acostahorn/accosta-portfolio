export default function ProjectCard({ project }) {
    const { title, description, tags, sourceUrl, deployUrls, downloadUrls, isWebApp } = project;

    return (
        <div className="project-card">
            <div className="project-info">
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="project-tags">
                    {tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                </div>

            </div>
            <div className="project-actions">
                {isWebApp ? (
                    deployUrls.map ((element, index) => (
                        <a 
                        key={index}
                        href={element.link}
                        className="btn btn-primary"
        
                        >
                            Link to server: {element.serverName}

                        </a>
                    ))
                    
                ) : (
                    downloadUrls &&
                    downloadUrls.map((download, index) => (
                        <a
                            key={index}
                            href={download.link}
                            download
                            className="btn btn-primary"
                        >
                            Download for {download.os}
                        </a>
                    )
                    )
                )}
                <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    View Source
                </a>
            </div>

        </div>
    )

}