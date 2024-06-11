import { useNavigate } from "react-router-dom";

function ClipDetail({ clip }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/clips/${clip.id}`);
    };

    return (
        <div className='clips-preview-box' onClick={handleClick}>
            <img 
            className="clips-preview-image" 
            alt={clip.location} 
            src={clip.video_file} 
            title={clip.location} 
            />
        </div>
    );
}

export default ClipDetail;