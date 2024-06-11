import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchClipsByCurrentUser } from "../../redux/clips";
import UserHeader from "../UserHeader/UserHeader";
import UserBody from "../UserBody/UserBody";
import './ProfilePage.css'

function ProfilePage() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const clips = useSelector(state => state.clips.clipsByCurrentUser);
    const clipsArr = Object.values(clips)

    useEffect(() => {
        const loadClips = async () => {
            await dispatch(fetchClipsByCurrentUser());
        };
        loadClips();
    }, [dispatch]);

    return (
        <>
            <div className="profilepage-outer">
                <UserHeader user={currentUser} clipCount={clipsArr.length} />
                <UserBody clips={clipsArr} />
            </div>
        </>
    );
}

export default ProfilePage;