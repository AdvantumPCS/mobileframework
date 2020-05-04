import axios from "axios";
import { Toast } from "native-base";
import { AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";

export function isPosting(bool: boolean) {
	return {
		type: "DATA_POSTED",
		isLoading: bool,
	};
}

export const success = (chassisNo: string) => {
	Toast.show({
		text: `Chassis #: ${chassisNo} Posted`,
		duration: 2000,
		position: "top",
		textStyle: { textAlign: "center" },
		type: "success",
	});
};

export const fail = (chassisNo: string) => {
	Toast.show({
		text: `Chassis #: ${chassisNo} not Posted`,
		duration: 2000,
		position: "top",
		textStyle: { textAlign: "center" },
		type: "danger",
	});
};

export const tallyPost = (
	machineAddress: string,
	urlOauth: string,
	bearerAuthorization: string,
	version: string,
	tallyObjList: any,
	vesselUid: any,
	index: number,
	navigation: any,
) => {
	return dispatch => {
		dispatch(isPosting(true));

		let headers = {
			"Content-Type": "application/json",
			"Authorization": bearerAuthorization,
			"Machine-Address": machineAddress,
		};

		for (let i = 0; i < tallyObjList.length; i++) {
			if (tallyObjList[i].isPosted === false) {

				let data = {
					"description": tallyObjList[i].description,
					"longitude": tallyObjList[i].longitude,
					"latitude": tallyObjList[i].latitude,
					"device": tallyObjList[i].device,
					"scanDateTime": tallyObjList[i].tagDate,
					"code": tallyObjList[i].code,
					"scanType": tallyObjList[i].scanType,
					"user": tallyObjList[i].userId,
					"location": tallyObjList[i].location,
				};

				console.log("check data: ", data);

				axios
					.post(`${urlOauth}/api/${version}/scan-motor-vehicles`, data, {
						headers: headers,
					})
					.then((Response: any) => {
						console.log(Response.data);
						success(tallyObjList[i].description);

						tallyObjList[i].isPosted = true;
						AsyncStorage.setItem(`vehicleTally${vesselUid}-${index}`, JSON.stringify(tallyObjList));
						navigation.dispatch(NavigationActions.back());
						navigation.navigate("ManualScanTallyListConainer");
					})
					.catch(err => {
						console.log("Axios Error: ", err);
						fail(tallyObjList[i].description);
					});
			}
		}
	};
};

export default {
	tallyPost,
};