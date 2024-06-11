import { csrfFetch } from "./csrf";

const LOAD_CLIPS = 'clips/LOAD_CLIPS';
const LOAD_ONE_CLIP = 'clips/LOAD_ONE_CLIP';
const LOAD_CLIPS_BY_USER = 'clips/LOAD_CLIPS_BY_USER';
const LOAD_CLIPS_BY_CURRENT_USER = 'clips/LOAD_CLIPS_BY_CURRENT_USER';
const CREATE_CLIP = 'clips/CREATE_CLIP';
const UPDATE_CLIP = 'clips/UPDATE_CLIP';
const DELETE_CLIP = 'clips/DELETE_CLIP';

const getClips = (allClips) => ({
    type: LOAD_CLIPS,
    allClips
});

export const getClipDetails = (clip) => ({
    type: LOAD_ONE_CLIP,
    clip
});

const getClipsByUser = (userClips) => ({
    type: LOAD_CLIPS_BY_USER,
    userClips
});

const getClipsByCurrentUser = (personalClips) => ({
    type: LOAD_CLIPS_BY_CURRENT_USER,
    personalClips
});

const createClip = (newClip) => ({
    type: CREATE_CLIP,
    newClip
});

const modifyClip = (updatedClip) => ({
    type: UPDATE_CLIP,
    updatedClip
});

const removeClip = (clipId) => ({
    type: DELETE_CLIP,
    clipId
});

export const fetchAllClips = () => async dispatch => {
    try {
        const response = await csrfFetch('/api/clips');
        const clips = await response.json();
        if (response.ok) {
            dispatch(getClips(clips));
            return clips;
        } else {
            const errorMessages = await response.json();
            return errorMessages;
        }
    } catch (error) {
        return { server: "Something went wrong. Please try again" };
    }
};

export const fetchOneClip = (clipId) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/clips/${clipId}`);
        const clip = await response.json();

        if (response.ok) {
            dispatch(getClipDetails(clip));
            return clip;
        } else {
            const errorMessages = await response.json();
            return errorMessages;
        }
    } catch (error) {
        return { server: "Something went wrong. Please try again" };
    }
};

export const fetchClipsByUser = (userId) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/clips/users/${userId}`);
        const clips = await response.json();

        if (response.ok) {
            dispatch(getClipsByUser(clips));
            return clips;
        } else {
            const errorMessages = await response.json();
            return errorMessages;
        }
    } catch (error) {
        return { server: "Something went wrong. Please try again" };
    }
};

export const fetchClipsByCurrentUser = () => async dispatch => {
    try {
        const response = await csrfFetch(`/api/clips/current`);
        const clips = await response.json();

        if (response.ok) {
            dispatch(getClipsByCurrentUser(clips));
            return clips;
        } else {
            const errorMessages = await response.json();
            return errorMessages;
        }
    } catch (error) {
        return { server: "Something went wrong. Please try again" };
    }
};

export const postClip = (clipData) => async dispatch => {
    try {
        const response = await csrfFetch('/api/clips/new', {
            method: 'POST',
            body: clipData
        });
        const newClip = await response.json();

        if (response.ok) {
            dispatch(createClip(newClip));
            return newClip;
        } else {
            const errorMessages = await response.json();
            return errorMessages;
        }
    } catch (error) {
        return { server: "Something went wrong. Please try again" };
    }
};

export const updateClip = (clipData) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/clips/${clipData.id}`, {
            method: 'PUT',
            body: JSON.stringify(clipData)
        });
        const updatedClip = await response.json();

        if (response.ok) {
            dispatch(modifyClip(updatedClip));
            return updatedClip;
        } else {
            const errorMessages = await response.json();
            return errorMessages;
        }
    } catch (error) {
        return { server: "Something went wrong. Please try again" };
    }
};

export const deleteClip = (clipId) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/clips/${clipId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            dispatch(removeClip(clipId));
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
    allClips: {},
    clipDetails: {},
    clipsByUser: {},
    clipsByCurrentUser: {}
};

const clipsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CLIPS:
          return { ...state, allClips: action.allClips }
        case LOAD_ONE_CLIP:
          return { ...state, clipDetails: action.clip }
        case LOAD_CLIPS_BY_USER:
          return { ...state, clipsByUser: action.userClips }
        case LOAD_CLIPS_BY_CURRENT_USER:
          return { ...state, clipsByCurrentUser: action.personalClips }
        case CREATE_CLIP:
          return { ...state, clipsByCurrentUser: {...state.clipsByCurrentUser, [action.newClip.id]: action.newClip } }
        case UPDATE_CLIP:
          return { ...state, clipDetails: action.updatedClip }
        case DELETE_CLIP: {             
            const newState = { ...state };
            newState.allClips = Object.fromEntries(
                Object.entries(newState.allClips).filter(([id]) => id !== action.clipId)
            );
            return newState;
        }
        default:
          return state
    }
};

export default clipsReducer;