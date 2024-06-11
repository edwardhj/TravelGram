import { csrfFetch } from "./csrf";
import { getClipDetails } from "./clips";


export const LIKE_CLIP = 'LIKE_CLIP';
export const DELETE_LIKE = 'DELETE_LIKE';
export const DISLIKE_CLIP = 'DISLIKE_CLIP';

export const likeClip = (clipId) => ({
    type: LIKE_CLIP,
    clipId
  });
  
  export const dislikeClip = (clipId) => ({
    type: DISLIKE_CLIP,
    clipId
  });

  export const createLike = (clipId) => async (dispatch) => {
    const response = await csrfFetch(`/api/clips/${clipId}/likes`, {
        method: 'POST'
    });

    if (response.ok) {
        const res2 = await csrfFetch(`/api/clips/${clipId}`);
        const clip = await res2.json();
        if (res2.ok) dispatch(getClipDetails(clip));
        dispatch(likeClip(clipId)); // Dispatch the action after updating likes
    }
};

export const createDislike = (clipId) => async (dispatch) => {
    const response = await csrfFetch(`/api/clips/${clipId}/dislikes`, {
        method: 'POST'
    });

    if (response.ok) {
        const res2 = await csrfFetch(`/api/clips/${clipId}`);
        const clip = await res2.json();
        if (res2.ok) dispatch(getClipDetails(clip));
        dispatch(dislikeClip(clipId)); // Dispatch the action after updating dislikes
    }
};


const initialState = {
    likes: 0,
    dislikes: 0
  };

  const likesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIKE_CLIP:
            return {...state, likes: state.likes + 1}
        case DISLIKE_CLIP:
            return {...state, dislikes: state.dislikes + 1}
        default:
            return state
    }
  }

  export default likesReducer