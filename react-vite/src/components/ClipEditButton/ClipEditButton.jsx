import { useNavigate } from "react-router-dom";
import './ClipEditButton.css';

function ClipEditButtonButton( {clip} ) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/clips/${clip.id}/edit`);
    };

    return (
        <button className="detail-edit-button" onClick={handleClick}>
            Edit
        </button>
    )
}

export default ClipEditButtonButton;