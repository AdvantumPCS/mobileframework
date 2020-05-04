import * as ActionTypes from "./types";

const initialState = {
	isLogged: true,
	hasError: false,
	isLoading: false,
	username: "",
	password: "",
};

export default function (state = initialState, action: any) {
	const { type } = action;

	switch (type) {
		case ActionTypes.IS_LOGGED:
			return Object.assign({}, state, {
				isLogged: action.isLogged,
			});
		case ActionTypes.LOGOUT_HAS_ERROR:
			return Object.assign({}, state, {
				hasError: action.hasError,
			});
		case ActionTypes.LOGOUT:
			return Object.assign({}, state, {
				state: initialState,
			});
		default:
			return state;
	}
}
