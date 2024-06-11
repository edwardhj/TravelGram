

function ClipDetail({ clip }) {

    return (
        <div className='clips-preview-box'>
            <img 
            className="clips-preview-image" 
            alt={clip.location} 
            src={clip.video_file} 
            title={clip.location} 
            />
        </div>
    );
}

export default ClipDetail;