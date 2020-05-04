import * as ActionTypes from "./types";
import { AsyncStorage } from "react-native";

const saveHasError = (bool: any) => {
	return {
		type: ActionTypes.SAVED_HAS_ERROR,
		hasError: bool,
	};
};

const configIsLoading = (bool: any) => {
	return {
		type: ActionTypes.CONFIG_IS_LOADING,
		configIsLoading: bool,
	};
};

const isLoad = (config: any) => {
	return {
		type: ActionTypes.LOAD,
		payload: config,
	};
};

const isSave = (config: any) => {
	return {
		type: ActionTypes.SAVE,
		payload: config,
	};
};

export const loadConfig = () => {
	return dispatch => {
		AsyncStorage.getItem("configObject").then(result => {
			const obj = JSON.parse(result);
			dispatch(isLoad(obj));
		});
	};
};

// tslint:disable-next-line: variable-name
export const saveConfig = (url: string, version: string, bearer_auth: string, basic_auth: string, itemSelected: string) => {
	return dispatch => {

		const configObject = {
			"url": url,
			"version": version,
			"bearer_auth": bearer_auth,
			"basic_auth": basic_auth,
			"itemSelected": itemSelected,
		};

		AsyncStorage.setItem("configObject", JSON.stringify(configObject)).then(() => {
			loadConfig();
			if (configObject !== null) {
				dispatch(saveHasError(false));
				dispatch(isSave(configObject));
			} else {
				dispatch(saveHasError(true));
			}
		});
	};
};

export default {
	saveHasError,
	configIsLoading,
	saveConfig,
	loadConfig,
};