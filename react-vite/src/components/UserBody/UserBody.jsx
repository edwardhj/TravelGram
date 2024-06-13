import ClipBox from "../ClipBox/ClipBox";
import camera from "../../assets/images/icon_camera.png";
import './UserBody.css'

function UserBody({ clips }) {
    
    if (!clips || clips.length === 0) {
        return (
            <div className='profile-body-no-details'>
                <img src={camera} alt="Camera Icon" className="no-posts-icon" />
                <p className="no-posts-text">No posts yet</p>
            </div>
        );
    }

    return (
        <div className='profile-body-details'>
            {clips.map(clip => (
                <ClipBox key={clip.id} clip={clip} />
            ))}
        </div>
    );
}

export default UserBody;