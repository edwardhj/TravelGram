import { useDispatch } from "react-redux";
import { deleteClip } from "../../redux/clips";
import { useNavigate } from "react-router-dom";
import './ClipDelete.css';

function ClipDelete( {clipId} ) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await dispatch(deleteClip(clipId));
            navigate('/profile');
        } catch (error) {
            console.error('Deleting Clip Error:', error)
        }
    }

    return (
        <button className="detail-delete-button" to='/profile' onClick={handleDelete}>Delete</button>
    )
}

export default ClipDelete;