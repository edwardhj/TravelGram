import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllClips } from "../../redux/clips";
import { useParams } from "react-router-dom";
import { createDislike, createLike, fetchDislikedClips, fetchLikedClips } from "../../redux/likes";
import { postComment } from "../../redux/comments";
import ClipComment from "../ClipComment/ClipComment";
import ClipDelete from "../ClipDelete/ClipDelete";
import ClipEditButton from "../ClipEditButton/ClipEditButton";
import dislike_icon from '../../assets/images/dislike_icon.png';
import heart_icon from '../../assets/images/heart_icon.png';
import disliked from '../../assets/images/disliked_icon.png';
import hearted from '../../assets/images/hearted_icon.webp';
import './HomePage.css'


function HomePage() {
    const dispatch = useDispatch();
    const { clipId } = useParams();
    const currentClip = useSelector(state => state.clips.HomePages);
    const currentUser = useSelector(state => state.session.user);
    const comments = useSelector(state => state.comments.commentsOnClip);
    const initialLikedClips = useSelector(state => state.likes.likedClips);
    const initialDislikedClips = useSelector(state => state.likes.dislikedClips);
    const [comment, setComment] = useState('');
    const [dislikedClips, setDislikedClips] = useState(initialDislikedClips);
    const [likedClips, setLikedClips] = useState(initialLikedClips);


    useEffect(() => {
        const loadHomePages = async () => {
            await dispatch(fetchAllClips());
        };
        const fetchClips = async () => {
            await dispatch(fetchLikedClips());
            await dispatch(fetchDislikedClips());
        }
        loadHomePages();
        fetchClips();
    }, [dispatch, clipId, comments]);

    useEffect(() => {
        setLikedClips(initialLikedClips);
        setDislikedClips(initialDislikedClips);
    }, [initialLikedClips, initialDislikedClips]);

    const handleLike = async () => {
        let updatedLikedClips;
        let updatedDislikedClips;

        if (likedClips.includes(parseInt(clipId))) {
            updatedLikedClips = likedClips.filter(id => id !== parseInt(clipId));
        } else {
            updatedLikedClips = [...likedClips, parseInt(clipId)];
        }
        updatedDislikedClips = dislikedClips.filter(id => id !== parseInt(clipId));

        await dispatch(createLike(clipId));
        setLikedClips(updatedLikedClips);
        setDislikedClips(updatedDislikedClips);
    };

    const handleDislike = async () => {
        let updatedLikedClips;
        let updatedDislikedClips;

        if (dislikedClips.includes(parseInt(clipId))) {
            updatedDislikedClips = dislikedClips.filter(id => id !== parseInt(clipId));
        } else {
            updatedDislikedClips = [...dislikedClips, parseInt(clipId)];
        }
        updatedLikedClips = likedClips.filter(id => id !== parseInt(clipId));
        
        await dispatch(createDislike(clipId));
        setLikedClips(updatedLikedClips);
        setDislikedClips(updatedDislikedClips);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const newComment = {
            clip_id: clipId,
            body: comment
        };
        await dispatch(postComment(newComment));
        setComment('');
    };

    const isLikedByCurrentUser = likedClips.includes(parseInt(clipId));
    const isDislikedByCurrentUser = dislikedClips.includes(parseInt(clipId));

    return (
        <>
            <div className="detail-outer">

                <div className="detail-image">
                    <img id="clip-detail-image" src={currentClip.video_file} alt={currentClip.caption} title={currentClip.location} />
                </div>

                <div className="detail-others">
                    <div className="detail-user">
                        <h2>{currentClip.location}</h2>
                        {currentClip.user_id == currentUser.id && (
                        <div className="detail-buttons">
                            <ClipEditButton clip={currentClip} />
                            <ClipDelete clipId={currentClip.id} />
                        </div>
                        )}
                        <hr className="user-comment-divider" />
                    </div>

                    <div className="detail-caption">
                        {currentClip.caption && 
                        <h4 id="detail-caption-body"><strong>{currentClip.creator}:</strong> {currentClip.caption}</h4>
                        }
                    </div>

                    <div className="detail-comments">
                        {currentClip.comments && currentClip.comments.map((comment) => (
                            <ClipComment key={comment.id} comment={comment} currentUser={currentUser} />
                        ))}
                    </div>

                    <div className="detail-add-comment">
                        <div className="detail-likes-outer">
                            <div className="detail-likes">
                                {
                                currentClip.num_likes > 0 && 
                                <h4 className="detail-likes-count">{currentClip.num_likes}</h4>
                                }
                                <img 
                                    src={isLikedByCurrentUser ? hearted : heart_icon}
                                    alt="Like"
                                    className="detail-likes-image"
                                    onClick={handleLike}
                                />
                            </div>

                            <div className="detail-dislikes">
                                {
                                currentClip.dislikes_count > 0 && 
                                <h4 className="detail-likes-count">{currentClip.dislikes_count}</h4>
                                }
                                <img 
                                    src={isDislikedByCurrentUser ? disliked : dislike_icon}
                                    alt="Dislike"
                                    className="detail-likes-image"
                                    onClick={handleDislike}
                                />
                            </div>
                        </div>

                        <form onSubmit={handleCommentSubmit}>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add a comment..."
                                required
                            ></textarea>
                            <button type="submit">Post</button>
                        </form>
                    </div>
                </div>

            </div>
        </>
    );
}

export default HomePage;