import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneClip } from "../../redux/clips";
import { useParams } from "react-router-dom";
import { createDislike, createLike } from "../../redux/likes";
import { postComment } from "../../redux/comments";
import dislike_icon from '../../assets/images/dislike_icon.png';
import heart_icon from '../../assets/images/heart_icon.png';
import './ClipDetail.css'


function ClipDetail() {
    const dispatch = useDispatch();
    const { clipId } = useParams();
    const [comment, setComment] = useState('');
    const currentClip = useSelector(state => state.clips.clipDetails);
    const comments = useSelector(state => state.comments.commentsOnClip);
    const likes = useSelector(state => state.likes);
    const dislikes = useSelector(state => state.dislikes);

    useEffect(() => {
        const loadClipDetails = async () => {
            await dispatch(fetchOneClip(clipId));
        };
        loadClipDetails();
    }, [dispatch, clipId, comments, likes, dislikes]);

    const handleLike = async () => {
        await dispatch(createLike(clipId));
    };

    const handleDislike = async () => {
        await dispatch(createDislike(clipId));
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const newComment = {
            clip_id: clipId,
            body: comment
        };
        await dispatch(postComment(newComment));
        setComment('');
    }

    return (
        <>
            <div className="detail-outer">

                <div className="detail-image">
                    <img id="clip-detail-image" src={currentClip.video_file} alt={currentClip.caption} title={currentClip.location} />
                </div>

                <div className="detail-others">
                    <div className="detail-user">
                        <h2>{currentClip.location} ({currentClip.creator})</h2>
                        <hr className="user-comment-divider" />
                    </div>

                    <div className="detail-comments">
                        {currentClip.comments && currentClip.comments.map((comment) => (
                            <div key={comment.id} className="details-comment-box">
                                <p className="detail-comment-detail"><strong>{comment.creator}</strong>: {comment.body}</p>
                            </div>
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
                                    src={heart_icon}
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
                                    src={dislike_icon}
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

export default ClipDetail;