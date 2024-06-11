import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postClip } from '../../redux/clips';
import newpost from '../../assets/images/icon_new_post.png';
import './ClipCreate.css';

function ClipCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [location, setLocation] = useState('');
    const [caption, setCaption] = useState('');
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({});

    const validateForm = e => {
        e.preventDefault();

        let validationErrors = {};

        if (!location) validationErrors.location = 'Location is required';
        if (!file) validationErrors.file = 'Please upload a file'
        else if (!file.type.startsWith('image/')) validationErrors.file = 'Uploaded file must be an image';

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            onSubmit();
        }
    };

    console.log(errors, 'HEEYEEYY');

    const handleLocationChange = e => {
        setLocation(e.target.value);
    };

    const handleCaptionChange = e => {
        setCaption(e.target.value);
    };

    const handleFileChange = e => {
        setFile(e.target.files[0]);
    };

    const onSubmit = async () => {
        const formData = new FormData();
        formData.append('location', location);
        formData.append('caption', caption);
        formData.append('file', file);

        const serverResponse = await dispatch(postClip(formData));
        if (serverResponse && serverResponse.errors) {
            setErrors(serverResponse.errors);
        } else {
            setErrors({});
            navigate(`/clips/${serverResponse.clipId}`);
        }
    };

    return (
        <>
            <div className="login-outer">

                <div className="login-image">
                    <img id="gramLogo" src={newpost} alt={'New post mockup'} />
                </div>

                <div className="login-form">
                    <h1>Create New Clip</h1>
                    <form onSubmit={validateForm}>

                        <label className="login-label">
                            Location
                            <input
                                type="text"
                                value={location}
                                onChange={handleLocationChange}
                            />
                        </label>
                        {errors.location && <p className="error-message">{errors.location}</p>}

                        <label className="login-label">
                            Caption
                            <input
                                type="text"
                                value={caption}
                                onChange={handleCaptionChange}
                            />
                        </label>
                        {errors.caption && <p className="error-message">{errors.caption}</p>}

                        <label className="login-label">
                            Upload Photo
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

export default ClipCreate;