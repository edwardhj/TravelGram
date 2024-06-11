import { csrfFetch } from "./csrf";
import { getClipDetails } from "./clips";

const LOAD_LIKED_CLIPS = 'likes/LOAD_LIKED_CLIPS';
const LOAD_DISLIKED_CLIPS = 'likes/LOAD_DISLIKED_CLIPS';
export const LIKE_CLIP = 'likes/LIKE_CLIP';
export const DELETE_LIKE = 'likes/DELETE_LIKE';
export const DISLIKE_CLIP = 'likes/DISLIKE_CLIP';


const loadLikedClips = likedClips => ({
    type: LOAD_LIKED_CLIPS,
    likedClips
});

const loadDislikedClips = dislikedClips => ({
    type: LOAD_DISLIKED_CLIPS,
    dislikedClips
});

const likeClip = (clipId) => ({
    type: LIKE_CLIP,
    clipId
});
  
const dislikeClip = (clipId) => ({
    type: DISLIKE_CLIP,
    clipId
});


export const fetchLikedClips = () => async dispatch => {
    try {
        const response = await csrfFetch('/api/likes/likes');
        const clips = await response.json();

        if (response.ok) {
            dispatch(loadLikedClips(clips));
        } else {
            const errorMessages = await response.json();
            return errorMessages;
        }
    } catch (error) {
        return { server: "Something went wrong. Please try again" };
    }
};

export const fetchDislikedClips = () => async dispatch => {
    try {
        const response = await csrfFetch('/api/likes/dislikes');
        const clips = await response.json();

        if (response.ok) {
            dispatch(loadDislikedClips(clips)); // Dispatching action to store disliked clips
            return clips;
        } else {
            const errorMessages = await response.json();
            return errorMessages;
        }
    } catch (error) {
        return { server: "Something went wrong. Please try again" };
    }
};

export const createLike = (clipId) => async (dispatch) => {
    const response = await csrfFetch(`/api/clips/${clipId}/likes`, {
        method: 'POST'
    });

    if (response.ok) {
        const res2 = await csrfFetch(`/api/clips/${clipId}`);
        const clip = await res2.json();
        if (res2.ok) dispatch(getClipDetails(clip));
        dispatch(likeClip(clipId));
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
        dispatch(dislikeClip(clipId));
    }
};


const initialState = {
    likedClips: [],
    dislikedClips: []
  };

  const likesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_LIKED_CLIPS:
            return {...state, likedClips: action.likedClips}
        case LOAD_DISLIKED_CLIPS:
            return {...state, dislikedClips: action.dislikedClips}
        default:
            return state
    }
  }

  export default likesReducer