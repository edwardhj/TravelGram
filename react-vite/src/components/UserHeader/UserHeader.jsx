import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './UserHeader.css'



function UserHeader({ user, clipCount }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <>
        
            <div className="profile-header-outer">
                <div className="profile-header-picture">
                    { user.profile_pic ? (
                        <img id="profile-picture" src={user.profile_pic} alt="Profile Picture" />
                    ) : (
                        <img id="profile-picture" src="icon_demo_user.png" alt="Default Profile Picture" />
                    )}
                </div>

                <div className="profile-header-details">

                    <div className="profile-header-details-top">
                        <h1 id="profile-header-username">{user.username}</h1>
                        { user.id == sessionUser.id && 
                            <NavLink id="profile-header-edit" to="/editprofile">
                                <h3>Edit Profile</h3>
                            </NavLink>
                        }
                    </div>

                    <div className="profile-header-details-middle">
                        <h3>{clipCount} Posts</h3>
                        <h3>{clipCount} Followers</h3>
                        <h3>{clipCount} Following</h3>
                    </div>

                    <div className="profile-header-details-bottom">
                        <p>{user.first_name} {user.last_name}</p>
                    </div>

                </div>
            </div>
        
        </>
    )

}

export default UserHeader;