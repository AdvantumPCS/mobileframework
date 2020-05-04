export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const IS_LOGGED = "IS_LOGGED";

export const LOGIN_HAS_ERROR = "LOGIN_HAS_ERROR";

export const LOGIN_IS_LOADING = "LOGIN_IS_LOADING";

export const GET_MACHINE_ADDRESS = "GET_MACHINE_ADDRESS";

/*
 * other constants
 */
/*
 * action creators
 */
export function login(text: any) {
	return { type: LOGIN, text };
}
export function logout(index: any) {
	return { type: LOGOUT, index };
}
