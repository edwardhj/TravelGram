import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllClips } from '../../redux/clips';
import HomeClipPreview from '../HomeClipPreview/HomeClipPreview';
import './HomePage.css'


function HomePage() {
    const dispatch = useDispatch();
    const allClips = useSelector(state => state.clips.allClips);

    useEffect(() => {
        dispatch(fetchAllClips());
    }, [dispatch]);

    return (
        <div className='home-page-outer'>
            <div className='clip-container'>
                {Object.values(allClips).map(clip => (
                    <>
                        {clip.creator && <h3 className='home-page-clip-username-box'>{clip.creator}</h3>}
                        <HomeClipPreview className='home-page-clip-image-box' key={clip.id} clip={clip} />

                        <div className='home-page-clip-caption-box'>
                            {clip.caption && <p className='home-page-clip-caption-text'>{clip.caption}</p>}
                            {clip.updated_at && <p className='home-page-clip-caption-date'>{clip.updated_at}</p>}
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default HomePage;