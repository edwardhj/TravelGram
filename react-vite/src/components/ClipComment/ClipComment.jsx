import './ClipComment.css'
import { useDispatch } from 'react-redux';
import { deleteComment, updateComment } from '../../redux/comments';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import iconEdit from '../../assets/images/icon_edit.png';
import iconTrash from '../../assets/images/icon_trash.png';


function ClipComment({ comment, currentUser }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(comment.body);

    const handleDelete = async () => {
        await dispatch(deleteComment(comment.id));
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleCommentUpdate = async e => {
        e.preventDefault();
        await dispatch(updateComment({...comment, body: editedComment }));
        setIsEditing(false);
    };
    

    return (
        <div key={comment.id} className="details-comment-box">
            {isEditing ? (
                <form onSubmit={handleCommentUpdate} className='details-comment-edit-form'>
                    <textarea 
                        className="details-comment-edit-box"
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                        required
                    ></textarea>
                    <div className='details-comment-edit-buttons'>
                        <button className="details-comment-edit-button" type="submit">Save</button>
                        <button className="details-comment-edit-button2" type="button" onClick={handleEditToggle}>Cancel</button>
                    </div>
                    
                </form>
            ) : (
                <>
                    <p className="detail-comment-detail"><strong>{comment.creator}</strong>: {comment.body}</p>
                    {currentUser.id === comment.user_id && (
                        <div className="comment-buttons">
                            <img
                                src={iconEdit}
                                alt="Edit"
                                className="comment-buttons-images"
                                title="Edit"
                                onClick={handleEditToggle}
                            />
                            <img
                                src={iconTrash}
                                alt="Edit"
                                className="comment-buttons-images"
                                title="Edit"
                                onClick={handleDelete}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default ClipComment;