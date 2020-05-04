import axios from "axios";
import { Toast } from "native-base";
import { AsyncStorage } from "react-native";

export function isPosting(bool: boolean) {
	return {
		type: "DATA_POSTED",
		isLoading: bool,
	};
}

export const success = () => {
	Toast.show({
		text: "Route Downloaded",
		duration: 2000,
		position: "top",
		textStyle: { textAlign: "center" },
		type: "success",
	});
};

export const success1 = () => {
	Toast.show({
		text: "Scan Sent Successfully",
		duration: 2000,
		position: "top",
		textStyle: { textAlign: "center" },
		type: "success",
	});
};

export const fail = () => {
	Toast.show({
		text: "No Routes available for user",
		duration: 2000,
		position: "top",
		textStyle: { textAlign: "center" },
		type: "danger",
	});
};

export const fail1 = () => {
	Toast.show({
		text: "Unable to connect to server",
		duration: 2000,
		position: "top",
		textStyle: { textAlign: "center" },
		type: "danger",
	});
};

export const fail2 = () => {
	Toast.show({
		text: "Unable to send Scan to server",
		duration: 2000,
		position: "top",
		textStyle: { textAlign: "center" },
		type: "danger",
	});
};

export const sendScan = (
	description: string,
	longitude: string,
	latitude: string,
	device: string,
	scanDateTime: string,
	code: string,
	urlOauth: string,
	bearerAuthorization: string,
	version: string,
	machineAddress: string,
	userId: any,
	scanObj: any,
) => {
	return async dispatch => {
		dispatch(isPosting(true));

		console.log("everything1: ", description, longitude, latitude, device, scanDateTime, machineAddress, urlOauth, bearerAuthorization, version, userId);

		let dataStore = {
			"description": description,
			"longitude": longitude,
			"latitude": latitude,
			"device": device,
			"scanDateTime": scanDateTime,
			"code": code,
			"user": userId,
			"isPosted": true
		};

		if (scanObj === null || scanObj === undefined)
			scanObj.push([dataStore]);
		else
			scanObj.push(dataStore);

		await AsyncStorage.setItem("localScan", JSON.stringify(scanObj));
	}
};

export default {
	sendScan,
};