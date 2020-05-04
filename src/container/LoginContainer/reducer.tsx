import * as ActionTypes from "./types";

const initialState = {
	isLogged: false,
	loginError: false,
	isLoading: false,
	username: "",
	userId: "",
};

export default function (state = initialState, action: any) {
	const { type, payload } = action;

	switch (type) {
		case ActionTypes.IS_LOGGED:
			return Object.assign({}, state, {
				isLogged: action.isLogged,
			});
		case ActionTypes.LOGIN_HAS_ERROR:
			return Object.assign({}, state, {
				loginError: action.loginError,
			});
		case ActionTypes.LOGIN_IS_LOADING:
			return Object.assign({}, state, {
				isLoading: action.isLoading,
			});
		case ActionTypes.LOGIN:
			return Object.assign({}, state, {
				isLogged: true,
				username: payload.username,
				userId: payload.uid,
			});
		case ActionTypes.LOGOUT:
			return Object.assign({}, state, {
				state: initialState,
			});
		default:
			return state;
	}
}
