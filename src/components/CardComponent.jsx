import React, { useState } from 'react'

const CardComponent = (prop) =>{
    const [ishide, setIshide] = useState(true);
    return (
        <>
           

            
        <div className="card-header">
            <div className="card-title">{prop.item.mission_name}</div>
            
            {
                prop.item.upcoming ? <div className="badge upcoming"> upcoming</div> :
                prop.item.launch_success ? <div className="badge success">success</div> :
                <div className="badge failed">failed</div>
            }
            
        </div>
        <div className="card-body"  style={{ display: ishide ? 'none' : 'block' }}>
            <div className="card-content">
                <div className="sub">
               { new Date().getFullYear() - new Date(prop.item.launch_date_utc).getFullYear() } years ago
                    
                </div>
                {prop.item.links.article_link  &&
                    <div className="links">
                    | <a href={prop.item.links.article_link}>Article</a>
                    </div>
                }
                {prop.item.links.video_link  &&
                    <div className="links">
                    | <a href={prop.item.links.video_link}>Video</a>
                    </div>
                }
               
            </div>
            <div className="card-content">
                <div className="image">
                    {prop.item.links.mission_patch_small ?
                        <img src={prop.item.links.mission_patch_small} alt="" height={100}/> :
                        `No image yet`
                    }
                    
                </div>
                <div className="details">
                {
                    prop.item.details || `No details`}
                </div>
            </div>
        </div>
        <button className="view-btn"
        onClick={()=>setIshide(!ishide)}
        >View</button>   
               

        </>
    )
}

export default CardComponent;