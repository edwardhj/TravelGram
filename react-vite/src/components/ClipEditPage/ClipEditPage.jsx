import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchOneClip } from "../../redux/clips";
import { updateClip } from "../../redux/clips";
import './ClipEditPage.css';

function ClipEditPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { clipId } = useParams();
    const clip = useSelector(state => state.clips.clipDetails);
    const currentUser = useSelector(state => state.session.user);

    const [location, setLocation] = useState(clip.location);
    const [caption, setCaption] = useState(clip.caption);

    useEffect(() => {
        const loadClipDetails = async () => {
            await dispatch(fetchOneClip(clipId));
        };
        loadClipDetails();
    }, [dispatch, clipId]);

    useEffect(() => {
        if (clip) {
            setLocation(clip.location || '');
            setCaption(clip.caption || '');
        }
    }, [clip]);

    const clipData = {id: clipId, location, caption};

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateClip(clipData));
            navigate(`/clips/${clipId}`);
        } catch (error) {
            console.error('Updating Clip Error:', error)
        }
    }

    if (currentUser.id !== clip.user_id) {
        return (
            <div className="clip-edit-outer">
                <div className="clip-edit-page">
                    <div className="clip-edit-page-body">
                        <p className="error-message">You can&apos;t edit a clip that isn&apos;t owned by you.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="clip-edit-outer">
            {currentUser.id == clip.user_id && (
            <div className="clip-edit-page">
                <div className="clip-edit-page-header">
                    <h2>Edit Clip</h2>
                </div>

                <div className="clip-edit-page-body">
                    <form onSubmit={handleUpdate}>
                        <label className="clip-edit-labels">
                            Location:
                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                        </label>

                        <label className="clip-edit-labels">
                            Caption:
                            <textarea value={caption} onChange={(e) => setCaption(e.target.value)} />
                        </label>

                        <button type="submit" className="login-button">Save Changes</button>
                    </form>
                </div>
            </div>
            )}
        </div>
    );
}

export default ClipEditPage;