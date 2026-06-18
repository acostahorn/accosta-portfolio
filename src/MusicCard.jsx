export default function MusicCard({ music }) {
    const { title, description, urls } = music;

    return (
        <div className="project-card">
            <div className="project-info">
                <h3>{title}</h3>
                <p>{description}</p>
                

            </div>
            <div className="project-actions">
                
            </div>
           <div className="project-actions">
                {
                    urls.map ((element, index) => (
                        <a 
                        key={index}
                        href={element.link}
                        className="btn btn-primary"
        
                        >
                         {element.movement}

                        </a>
                    ))
                    
                }

        </div>
        </div>
    )

}