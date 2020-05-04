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

export const success = () => {
	Toast.show({
		text: "Vehicle Posted",
		duration: 2000,
		position: "top",
		textStyle: { textAlign: "center" },
		type: "success",
	});
};

export const fail = () => {
	Toast.show({
		text: "Vehicle not Posted",
		duration: 2000,
		position: "top",
		textStyle: { textAlign: "center" },
		type: "danger",
	});
};

export const tagPost = (
	machineAddress: string,
	urlOauth: string,
	bearerAuthorization: string,
	version: string,
	tagObj: any,
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

		for (let i = 0; i < tagObj.length; i++) {
			if (tagObj[i].isPosted === false) {

				let data = {
					"motorVehicle": String(tagObj[i].vehicleUid),
					"tag": tagObj[i].description,
					"taggedDateTime": tagObj[i].tagDate,
					"taggedBy": tagObj[i].userId,
					"device": tagObj[i].device,
				};

				axios
					.post(`${urlOauth}/api/${version}/motor-vehicle-scanned-tag-assignments`, data, {
						headers: headers,
					})
					.then((Response: any) => {
						console.log(Response);
						success();

						tagObj[i].isPosted = true;
						AsyncStorage.setItem(`vehicleTag${vesselUid}-${index}`, JSON.stringify(tagObj));
						navigation.dispatch(NavigationActions.back());
						navigation.navigate("ManualScanListConainer");
					})
					.catch(err => {
						console.log("Axios Error: ", err);
						fail();
					});
			}
		}
	};
};

export default {
	tagPost,
};