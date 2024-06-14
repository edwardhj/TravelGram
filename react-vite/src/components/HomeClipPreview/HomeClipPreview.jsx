import { useNavigate } from "react-router-dom";
import "./HomeClipPreview.css";

function HomeClipPreview({ clip }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/clips/${clip.id}`);
    };

    return (
        <div className='home-clip-preview-outer' onClick={handleClick}>
            <img 
            className="home-clip-preview-image" 
            alt={clip.location} 
            src={clip.video_file} 
            title={clip.location} 
            />
        </div>
    );
}

export default HomeClipPreview;