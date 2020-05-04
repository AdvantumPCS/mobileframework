export const LOGOUT = "LOGOUT";
export const IS_LOGGED = "IS_LOGGED";
export const LOGOUT_HAS_ERROR = "LOGOUT_HAS_ERROR";

export function logout(index: any) {
	return { type: LOGOUT, index };
}
