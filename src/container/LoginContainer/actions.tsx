import * as ActionTypes from "./types";
import axios from "axios";
import { AsyncStorage } from "react-native";
import Constants from "expo-constants";
import { Toast } from "native-base";

const isLogged = (bool: any) => {
	return {
		type: ActionTypes.IS_LOGGED,
		isLogged: bool,
	};
};

const loginError = (bool: any) => {
	return {
		type: ActionTypes.LOGIN_HAS_ERROR,
		loginError: bool,
	};
};

const loginIsLoading = (bool: any) => {
	return {
		type: ActionTypes.LOGIN_IS_LOADING,
		isLoading: bool,
	};
};

const isLoad = (config: any) => {
	return {
		type: ActionTypes.LOGIN,
		payload: config,
	};
};

export const userInfo = (
	urlOauth: string,
	bearerAuthorization: string,
	version: string,
	userName: string,
) => {
	const machineAddress = uuid();
	AsyncStorage.setItem("machine-address", machineAddress);

	let headers = {
		"Content-Type": "application/json",
		Authorization: bearerAuthorization,
		"Machine-Address": machineAddress,
	};

	axios
		.get(
			`${urlOauth}/api/${version}/users/username/flattened?username=${userName}`,
			{
				headers: headers,
			},
		)
		.then((Response: any) => {
			AsyncStorage.setItem("userInfo", JSON.stringify(Response.data)).then(() => {
				if (Response.data !== null) {
					return Response.data;
				}
			});
		})
		.catch(err => {
			console.log("Axios Error: ", err);
		});
};

function uuid() {
	return Constants.installationId;
}

export const loginUser = (
	username: string,
	password: string,
	urlOauth: string,
	basicAuthorization: string,
	bearerAuthorization: string,
	version: string,
	navigation: any,
) => {
	return dispatch => {
		dispatch(loginIsLoading(true));

		let headers = {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: basicAuthorization,
		};

		let data = {
			username: username,
			password: password,
			grant_type: "password",
		};

		const queryString = require("query-string");

		axios
			.post(`${urlOauth}/oauth/token`, queryString.stringify(data), {
				headers: headers,
			})
			.then((Response: any) => {
				if (Response.data.access_token !== "") {
					bearerAuthorization = bearerAuthorization + Response.data.access_token;
					AsyncStorage.setItem("token", bearerAuthorization);

					const machineAddress = uuid();
					AsyncStorage.setItem("machine-address", machineAddress);

					// tslint:disable-next-line: no-shadowed-variable
					let headers = {
						"Content-Type": "application/json",
						Authorization: bearerAuthorization,
						"Machine-Address": machineAddress,
					};

					axios
						.get(
							`${urlOauth}/api/${version}/users/username/flattened?username=${username}`,
							{
								headers: headers,
							},
						)
						// tslint:disable-next-line: no-shadowed-variable
						.then((Response: any) => {
							AsyncStorage.setItem("userInfo", JSON.stringify(Response.data)).then(() => {
								if (Response.data !== null) {
									dispatch(loginIsLoading(false));
									dispatch(loginError(false));
									dispatch(isLogged(true));
									dispatch(isLoad(Response.data));
									navigation.navigate("HomeContainer");
								}
							});
						})
						.catch(err => {
							console.log("Axios Error User Information: ", err);
						});
				}
			})
			.catch(err => {
				console.log("Axios Error Token Error: ", err);
				Toast.show({
					text: "Enter Valid Username & password!",
					duration: 2000,
					position: "top",
					textStyle: { textAlign: "center" },
					type: "danger",
				});
				dispatch(loginError(true));
				dispatch(loginIsLoading(false));
				dispatch(isLogged(false));
			});
		dispatch(loginIsLoading(false));
	};
};

export const logoutUser = () => {
	AsyncStorage.removeItem("token");

	return {
		type: ActionTypes.LOGOUT,
	};
};

export default {
	isLogged,
	loginError,
	loginIsLoading,
	loginUser,
	logoutUser,
};
