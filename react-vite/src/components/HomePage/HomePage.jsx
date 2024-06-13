import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllClips } from '../../redux/clips';
import ClipBox from '../ClipBox/ClipBox';
import './HomePage.css'


function HomePage() {
    const dispatch = useDispatch();
    const allClips = useSelector(state => state.clips.allClips);
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(fetchAllClips());
    }, [dispatch]);

    console.log(currentUser)
    return (
        <div className='home-page-outer'>
            <div className='clip-container'>
                {Object.values(allClips).map(clip => (
                    <ClipBox key={clip.id} clip={clip} />
                ))}
            </div>
        </div>
    )
}

export default HomePage;