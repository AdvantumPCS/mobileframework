export const SAVE = "SAVE";
export const LOAD = "LOAD";

export const SAVED_HAS_ERROR = "SAVED_HAS_ERROR";

export const CONFIG_IS_LOADING = "CONFIG_IS_LOADING";

/*
 * other constants
 */
/*
 * action creators
 */
export function save(text: any) {
	return { type: SAVE, text };
}
export function load(text: any) {
	return { type: LOAD,  text};
}
