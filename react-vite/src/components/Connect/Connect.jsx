import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { thunkGetAllUsers } from "../../redux/session";
import defaultProfilePic from "../../assets/images/icon_demo_user.png";
import './Connect.css';

function Connect() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.session.allUsers);
    const usersArr = Object.values(users);
    usersArr.sort((a, b) => a.username.localeCompare(b.username));

    useEffect(() => {
        const loadAllUsers = async () => {
            await dispatch(thunkGetAllUsers());
        }
        loadAllUsers();
    }, [dispatch]);

    return (
        <>
            <div className="connect-outer">
                {usersArr && usersArr.map(user => (
                    <NavLink className="connect-user-card" key={user.id} to={`/users/${user.id}`}>
                        <img
                            src={user.profile_pic || defaultProfilePic}
                            alt={user.profile_pic ? `${user.username}'s profile picture` : 'Default Profile'}
                            title={`${user.username}'s profile picture`}
                            className="profile-pic"
                        />
                        <p>{user.username}</p>
                    </NavLink>
                ))}
            </div>
        </>
    )
}

export default Connect
