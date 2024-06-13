import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchClipsByUser } from "../../redux/clips";
import UserHeader from "../UserHeader/UserHeader";
import UserBody from "../UserBody/UserBody";
import { thunkGetUser } from "../../redux/session";

function UserPage() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(state => state.session.viewedUser);
    const clipsObj = useSelector(state => state.clips.clipsByUser);
    const clipsArr = Object.values(clipsObj)
    
    useEffect(() => {
        const loadUser = async () => {
            await dispatch(thunkGetUser(userId));
        };
        const loadClips = async () => {
            await dispatch(fetchClipsByUser(userId));
        };
        loadClips();
        loadUser();
    }, [dispatch, userId]);
    
    return (
        <>
            <div className="profilepage-outer">
                <UserHeader key={userId} user={user} clipCount={clipsArr.length} />
                <UserBody key={userId} clips={clipsArr} />
            </div>
        </>
    );
}

export default UserPage;