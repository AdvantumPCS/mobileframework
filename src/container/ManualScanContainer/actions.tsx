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
) => {
	return async dispatch => {
		dispatch(isPosting(true));
		// let scanObj;
		// scanObj = await AsyncStorage.getItem("localScan");

		console.log("everything1: ", code, description, longitude, latitude, device, scanDateTime,
			machineAddress, urlOauth, bearerAuthorization, version, userId);

		// let headers = {
		// 	"Content-Type": "application/json",
		// 	"Authorization": bearerAuthorization,
		// 	"Machine-Address": machineAddress,
		// };

		// let data = {
		// 	"description": description,
		// 	"longitude": longitude,
		// 	"latitude": latitude,
		// 	"device": device,
		// 	"scanDateTime": scanDateTime,
		// 	"code": code,
		// 	"user": userId,
		// };

		// axios
		// 	.post(`${urlOauth}/api/${version}/scan-details`, data, {
		// 		headers: headers,
		// 	})
		// 	.then(async (Response: any) => {
		// 		console.log(Response);
		// 		success1();

		// 		let dataStore = {
		// 			"description": description,
		// 			"longitude": longitude,
		// 			"latitude": latitude,
		// 			"device": device,
		// 			"scanDateTime": scanDateTime,
		// 			"code": code,
		// 			"user": userId,
		// 			"isPosted": true
		// 		};
	
		// 		if (scanObj === null || scanObj === undefined) {
		// 			scanObj = [];
		// 			let c = scanObj.push(dataStore);
		// 			console.log("undefined error:", c);
		// 			await AsyncStorage.setItem("localScan", JSON.stringify(dataStore));
		// 		} else {
		// 			console.log(scanObj);
		// 			let c = scanObj.push(data);
		// 			console.log(c);
		// 			await AsyncStorage.setItem("localScan", JSON.stringify(dataStore));
		// 		}

		// 	})
		// 	.catch(async err => {
		// 		console.log("Axios Error: ", err);
		// 		fail2();

		// 		let dataStore = {
		// 			"description": description,
		// 			"longitude": longitude,
		// 			"latitude": latitude,
		// 			"device": device,
		// 			"scanDateTime": scanDateTime,
		// 			"code": code,
		// 			"user": userId,
		// 			"isPosted": false
		// 		};
	
		// 		if (scanObj === null || scanObj === undefined) {
		// 			scanObj = [];
		// 			let c = scanObj.push(dataStore);
		// 			console.log("undefined error:", c);
		// 			await AsyncStorage.setItem("localScan", JSON.stringify(dataStore));
		// 		} else {
		// 			console.log(scanObj);
		// 			let c = scanObj.push(data);
		// 			console.log(c);
		// 			await AsyncStorage.setItem("localScan", JSON.stringify(dataStore));
		// 		}
		// 	});
	}
};

export default {
	sendScan,
};