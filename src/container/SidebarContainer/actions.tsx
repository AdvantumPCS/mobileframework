import * as ActionTypes from "./types";
import { AsyncStorage } from "react-native";
import axios from "axios";

const isLogged = (bool: any) => {
	return {
		type: ActionTypes.IS_LOGGED,
		isLogged: bool,
	};
};

const logoutHasError = (bool: any) => {
	return {
		type: ActionTypes.LOGOUT_HAS_ERROR,
		hasError: bool,
	};
};

const logout = () => {
	return {
		type: ActionTypes.LOGOUT,
	};
};

export const logoutUser = (urlOauth: any, token: any, machineAddress: any) => {
	return dispatch => {

		let headers = {
			"Content-Type": "application/json",
			Authorization: token,
			"Machine-Address": machineAddress,
		};

		axios
			.get(`${urlOauth}/oauth/logout`, {
				headers: headers,
			})
			.then((Response: any) => {
				console.log(Response.data);
				AsyncStorage.removeItem("token");
				AsyncStorage.removeItem("machine-address");
				dispatch(logoutHasError(false));
				dispatch(isLogged(false));
				dispatch(logout());
			})
			.catch(err => {
				console.log("Axios Error: ", err);
				dispatch(logoutHasError(true));
				dispatch(isLogged(true));

			});
	};
};

export default {
	logoutUser,
};