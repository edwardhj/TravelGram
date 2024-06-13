import { csrfFetch } from "./csrf";

const GET_USER = 'session/getUser';
const GET_USERS = 'session/getUsers';
const SET_USER = 'session/setUser';
const UPDATE_USER = 'session/updateUser'
const REMOVE_USER = 'session/removeUser';

const getUser = (user) => ({
  type: GET_USER,
  user
});

const getUsers = (users) => ({
  type: GET_USERS,
  users
}); 

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const updateUser = user => ({
  type: UPDATE_USER,
  user
});

const removeUser = () => ({
  type: REMOVE_USER
});

export const thunkGetUser = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/users/${userId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getUser(data));
    return data;
  }
}

export const thunkGetAllUsers = () => async dispatch => {
  const response = await csrfFetch("/api/users/");
  if (response.ok) {
    const data = await response.json();
    dispatch(getUsers(data.users));
    return data;
  }
};

export const thunkAuthenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/");
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const thunkLogin = (credentials) => async dispatch => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkEditProfile = (updatedUser) => async dispatch => {
  const response = await fetch("/api/auth/editprofile", {
    method: "PUT",
    body: updatedUser
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(updateUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: user
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return data;
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkLogout = () => async (dispatch) => {
  await fetch("/api/auth/logout");
  dispatch(removeUser());
};

const initialState = { user: null, viewedUser: {}, allUsers: {} };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, viewedUser: action.user }
    case GET_USERS:
      return { ...state, allUsers: action.users };
    case SET_USER:
      return { ...state, user: action.payload };
    case UPDATE_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default sessionReducer;
