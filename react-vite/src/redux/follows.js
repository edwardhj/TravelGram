import { csrfFetch } from "./csrf";

const GET_FOLLOWS_BY_USER = 'follows/getfollows'
const GET_FOLLOWING_BY_USER = 'follows/getfollowing'
const ADD_FOLLOW = 'follows/addFollow'
const UPDATE_FOLLOWING = 'follows/updateFollowing'
const DELETE_FOLLOW = 'follows/deleteFollow'

const getFollowers = (follows) => {
  return {
    type: GET_FOLLOWS_BY_USER,
    follows
  }
}

const getFollowing = (following) => {
  return {
    type: GET_FOLLOWING_BY_USER,
    following
  }
}

const addFollow = (newFollowing) => {
  return {
    type: ADD_FOLLOW,
    newFollowing
  }
}

const updateFollow = (updatedFollowing) => {
    return {
        type: UPDATE_FOLLOWING,
        updatedFollowing
    }
}

const deleteFollowing = (userId) => {
  return {
    type: DELETE_FOLLOW,
    userId
  }
}

export const fetchFollowers = (userId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/followers/${userId}`);
        const followers = await response.json();

        if (response.ok) {
            dispatch(getFollowers(followers));
            return followers;
        } else {
            const errorMessages = await response.json();
            return errorMessages;
        }
    } catch (error) {
        return { server: "Something went wrong. Please try again" };
    }
};

export const fetchFollowing = (userId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/following/${userId}`);
        const following = await response.json();

        if (response.ok) {
            dispatch(getFollowing(following));
            return following;
        } else {
            const errorMessages = await response.json();
            return errorMessages;
        }
    } catch (error) {
        return { server: "Something went wrong. Please try again" };
    }
};

export const createFollow = (followData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/following/${followData.following_user_id}`, {
            method: 'POST',
            body: JSON.stringify(followData)
        });
        const newFollow = await response.json();

        if (response.ok) {
            dispatch(addFollow(newFollow));
            return newFollow;
        } else {
            const errorMessages = await response.json();
            return errorMessages;
        }
    } catch (error) {
        return { server: "Something went wrong. Please try again" };
    }
};

export const modifyFollow = (follow) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/following/${follow.following_user_id}`, {
            method: 'PUT',
            body: JSON.stringify(follow)
        });
        const updatedFollow = await response.json();

        if (response.ok) {
            dispatch(updateFollow(updatedFollow));
            return updatedFollow;
        } else {
            const errorMessages = await response.json();
            return errorMessages;
        }
    } catch (error) {
        return { server: "Something went wrong. Please try again" };
    }
};

export const fetchDeleteFollow = (userId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/following/${userId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            dispatch(deleteFollowing(userId));
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
    followers: {},
    following: {}
};

const followsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FOLLOWS_BY_USER:
            return { ...state, followers: action.follows };
        case GET_FOLLOWING_BY_USER:
            return { ...state, following: action.following };
        case ADD_FOLLOW:
            return { ...state, following: { ...state.following, [action.newFollowing.id]: action.newFollowing } };
        case UPDATE_FOLLOWING:
            return { ...state, following: { ...state.following, [action.updatedFollowing.id]: action.updatedFollowing } };
        case DELETE_FOLLOW: {
            const newFollowing = { ...state.following };
            delete newFollowing[action.userId];
            return { ...state, following: newFollowing };
        }
        default:
            return state;
    }
};

export default followsReducer;
