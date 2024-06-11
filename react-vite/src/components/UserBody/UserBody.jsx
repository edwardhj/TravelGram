import ClipBox from "../ClipBox/ClipBox";
import './UserBody.css'

function UserBody({ clips }) {
    return (
        <div className='profile-body-details'>
            {clips.map(clip => (
                <ClipBox key={clip.id} clip={clip} />
            ))}
        </div>
    );
}

export default UserBody;