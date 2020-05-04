import * as ActionTypes from "./types";

const initialState = {
	hasError: false,
	configIsLoading: false,
	name: "",
	url: "",
	version: "v1.0",
	bearer_auth: "Bearer ",
	basic_auth: "Basic YXBtMi1jbGllbnQ6MVowbS1yX3V4NkNZSzRZV203TQ==",
	itemSelected: "reader",
};

export default function (state = initialState, action: any) {
	const { type, payload } = action;
	switch (type) {
		case ActionTypes.SAVED_HAS_ERROR:
			return Object.assign({}, state, {
				hasError: action.hasError,
			});
		case ActionTypes.CONFIG_IS_LOADING:
			return Object.assign({}, state, {
				configIsLoading: action.cofigIsLoading,
			});
		case ActionTypes.SAVE:
			return Object.assign({}, state, {
				url: payload.url,
				version: payload.version,
				bearer_auth: payload.bearer_auth,
				basic_auth: payload.basic_auth,
				itemSelected: payload.itemSelected,
			});
		case ActionTypes.LOAD:
			return Object.assign({}, state, {
				url: payload.url,
				version: payload.version,
				bearer_auth: payload.bearer_auth,
				basic_auth: payload.basic_auth,
				itemSelected: payload.itemSelected,
			});
		default:
			return state;
	}
}
