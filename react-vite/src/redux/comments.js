import { csrfFetch } from "./csrf";
import { modifyClip } from "./clips";

const GET_COMMENTS_BY_USER = 'comments/getCommentsByUser'
const ADD_COMMENT = 'comments/addComment'
const UPDATE_COMMENT = 'comments/updateComment'
const DELETE_COMMENT = 'comments/deleteComment'

const getCommentsByUser = (allComments) => {
  return {
    type: GET_COMMENTS_BY_USER,
    allComments
  }
}

const addComment = (newComment) => {
    return {
        type: ADD_COMMENT,
        newComment
    }
}

const modifyComment = (updatedComment) => {
  return {
    type: UPDATE_COMMENT,
    updatedComment
  }
}

const removeComment = (comment) => {
  return {
    type: DELETE_COMMENT,
    comment
  }
}


export const fetchCommentsByCurrentUser = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/comments/current`);
        const comments = await response.json();

        if (response.ok) {
            dispatch(getCommentsByUser(comments));
            return comments;
        } else {
            const errorMessages = await response.json();
            return errorMessages;
        }
    } catch (error) {
        return { server: "Something went wrong. Please try again" };
    }
};


export const postComment = (commentData) => async (dispatch, getState) => {
    try {
        const response = await csrfFetch(`/api/clips/${commentData.clip_id}/comments`, {
            method: 'POST',
            body: JSON.stringify(commentData)
        });
        const newComment = await response.json();

        if (response.ok) {
            dispatch(addComment(newComment));

            const currentClip = getState().clips.clipDetails;
            const updatedClip = {...currentClip};

            dispatch(modifyClip(updatedClip));
            return newComment;
        } else {
            const errorMessages = await response.json();
            return errorMessages;
        }
    } catch (error) {
        return { server: "Something went wrong. Please try again" };
    }
};

export const updateComment = (commentData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/comments/${commentData.id}`, {
            method: 'PUT',
            body: JSON.stringify(commentData)
        });
        const updatedComment = await response.json();

        if (response.ok) {
            dispatch(modifyComment(updatedComment));
            return updatedComment;
        } else {
            const errorMessages = await response.json();
            return errorMessages;
        }
    } catch (error) {
        return { server: "Something went wrong. Please try again" };
    }
};

export const deleteComment = (comment) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/comments/${comment.id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            dispatch(removeComment(comment));
            return response;
        } else {
            const errorMessages = await response.json();
            return errorMessages;
        }
    } catch (error) {
        return { server: "Something went wrong. Please try again" };
    }
};


const initialState = {
    commentsByCurrentUser: {},
    commentsOnClip: {}
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENTS_BY_USER:
          return { ...state, commentsByCurrentUser: action.allComments }
        case ADD_COMMENT:
          return { ...state, commentsOnClip: {...state.commentsOnClip, [action.newComment.id]: action.newComment } }
          case UPDATE_COMMENT:
          return { ...state, commentsOnClip: {...state.commentsOnClip, [action.updatedComment.id]: action.updatedComment } }
        case DELETE_COMMENT: {             
            const newState = { ...state, commentsOnClip: { ...state.commentsOnClip } };
            delete newState.commentsOnClip[action.comment.id];
            return newState;
        }
        default:
          return state
    }
};

export default commentsReducer;