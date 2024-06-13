import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';
import { thunkEditProfile } from '../../redux/session';

function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.session.user);
    
    const [firstName, setfirstName] = useState(currentUser.first_name);
    const [lastName, setlastName] = useState(currentUser.last_name);
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({});

    const validateForm = e => {
        e.preventDefault();

        let validationErrors = {};

        if (!firstName) validationErrors.firstName = 'First Name is required';
        if (!lastName) validationErrors.firstName = 'Last Name is required';
        if (!file) validationErrors.file = 'New Profile Picture is required';
        if (file && !file.type.startsWith('image/')) validationErrors.file = 'Uploaded file must be an image';

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            onSubmit();
        }
    };

    const handlefirstNameChange = e => {
        setfirstName(e.target.value);
    };

    const handlelastNameChange = e => {
        setlastName(e.target.value);
    };

    const handleFileChange = e => {
        setFile(e.target.files[0]);
    };

    const onSubmit = async () => {
        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        if (file) formData.append('profile_pic', file);

        const serverResponse = await dispatch(thunkEditProfile(formData));
        if (serverResponse && serverResponse.errors) {
            setErrors(serverResponse.errors);
        } else {
            setErrors({});
            navigate(`/profile`);
        }
    };

    return (
        <>
            <div className="login-outer">

                <div className="login-form">
                    <h1>Edit Profile</h1>
                    <form onSubmit={validateForm}>

                        <label className="login-label">
                            First Name
                            <input
                                type="text"
                                value={firstName}
                                onChange={handlefirstNameChange}
                            />
                        </label>
                        {errors.firstName && <p className="error-message">{errors.firstName}</p>}

                        <label className="login-label">
                            lastName
                            <input
                                type="text"
                                value={lastName}
                                onChange={handlelastNameChange}
                            />
                        </label>
                        {errors.lastName && <p className="error-message">{errors.lastName}</p>}

                        <label className="login-label">
                            Upload Profile Photo
                            <div className="profile-pic-container">
                                <input
                                    id="fileUpload"
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                                <label htmlFor="fileUpload" className="upload-button">Upload</label>
                            </div>
                            {file && <p className="uploaded-filename">File uploaded: {file.name}</p>}
                        </label>
                        {errors.file && <p className="error-message">{errors.file}</p>}

                        <button type="submit" className="login-button">Submit</button>
                    </form>
                </div>

            </div>
        </>
    );
}

export default EditProfile;