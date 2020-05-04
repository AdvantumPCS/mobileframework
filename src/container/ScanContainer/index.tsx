import * as React from "react";
import { connect } from "react-redux";
import { sendScan } from "./actions";
import { loadConfig } from "../ConfigPageContainer/actions";
import ScanScreen from "../../stories/screens/Scan";
import { AsyncStorage, Platform } from "react-native";
import NetInfo, { NetInfoSubscription, NetInfoState } from "@react-native-community/netinfo";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export interface Props {
	readonly navigation: any;
	getTaggedList: Function;
	loadConfig: Function;
	getRoute: Function;
	sendScan: Function;
	url: any;
	version: any;
	bearer: any;
	username: any;
	userId: any;
}

export interface State {
	isConnected: boolean | null;
	hasCameraPermission: any;
	deviceName: any;
	scan: any;
	routeInfo: any;
	location: any;
	locationManifest: [];
	locationId: any;
}

class ScanComponent extends React.Component<Props, State> {
	driverObj: Array<Object>;
	tokenNum: string;
	machineAddress: string;
	public _isMounted = false;
	_subscription: NetInfoSubscription | null = null;

	public constructor(props: Props) {
		super(props);
		this.state = {
			isConnected: undefined,
			scan: "",
			hasCameraPermission: undefined,
			deviceName: "",
			routeInfo: [],
			location: "",
			locationManifest: [],
			locationId: "",
		};
	}

	public async componentWillMount() {
		this._isMounted = true;
		await this.getMachineAddress();
		await this.getToken();
		await this._getDeviceNameAsync();
	}

	componentDidMount() {
		this.deviceCheck();
		this._subscription = NetInfo.addEventListener(
			this._handleConnectivityChange,
		);
	}

	componentWillUnmount() {
		this._isMounted = false;
		this._subscription && this._subscription();
	}

	_getDeviceNameAsync = () => {
		let deviceName = Constants.deviceName;
		this.setState({ deviceName });
	}

	_handleConnectivityChange = (state: NetInfoState) => {
		this.setState({
			isConnected: state.isConnected,
		});
	};

	public getToken = async (): Promise<any> => {
		try {
			this.tokenNum = await AsyncStorage.getItem("token");
			return this.tokenNum;
		} catch (error) {
			return error;
		}
	}

	public getMachineAddress = async (): Promise<any> => {
		try {
			this.machineAddress = await AsyncStorage.getItem("machine-address");
			return this.machineAddress;
		} catch (error) {
			return error;
		}
	}

	public openLink = (item) => {
		this.props.navigation.navigate("ExpoScannerPage", {
			name: "Scan",
			onBarcodeScan: this.onBarcodeScan,
		});
		this.setState({routeInfo: item})
	}

	handleBarCodeScanned = ({ type, data }) => {
		alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	}

	onBarcodeScan = async data => {
		if (this._isMounted === true) {
			this.setState({ scan: data.scan });
			let scanObj;
			scanObj = await AsyncStorage.getItem("localScan");
			this.props.sendScan(data.scan, this.state.location.coords.longitude, this.state.location.coords.latitude, this.state.deviceName, this.dateTime(), this.codeGenerator(), this.props.url, this.tokenNum, this.props.version, this.machineAddress, this.props.userId, scanObj);
		}
	}

	codeGenerator() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
			// tslint:disable-next-line: no-bitwise
			let r = (Math.random() * 16) | 0,
				// tslint:disable-next-line: no-bitwise
				v = c === "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	}

	public dateTime() {
		let today = new Date();
		let month = (parseInt(String(today.getMonth() + 1), 10) < 10 ? "0" : "") + parseInt(String(today.getMonth() + 1), 10);
		let day = (today.getDate() < 10 ? "0" : "") + today.getDate();
		let date = today.getFullYear() + "-" + month + "-" + day;
		let hour = (today.getHours() < 10 ? "0" : "") + today.getHours();
		let min = (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
		let sec = (today.getSeconds() < 10 ? "0" : "") + today.getSeconds();
		let time = hour + ":" + min + ":" + sec;
		return date + "T" + time + "Z";
	}

	public deviceCheck() {
		if (Platform.OS === "android" && !Constants.isDevice) {
			console.log("This will not work on Sketch in an Android emulator. Try it on your device!");
		} else {
			this._getLocationAsync();
		}
	}

	_getLocationAsync = async () => {
		try {
			if (this._isMounted === true) {
				let { status } = await Permissions.askAsync(Permissions.LOCATION);
				if (status !== "granted") {
					console.log("Permission to access location was denied");
				}

				let location = await Location.getCurrentPositionAsync({});
				this.setState({ location });
			}
		} catch (error) {
			alert(error);
			console.log(error);
		}
	}

	render() {
		return <ScanScreen
			navigation={this.props.navigation}
			onScan={this.openLink.bind(this)}
			data={undefined} />;
	}
}

function bindAction(dispatch): Object {
	return {
		loadConfig: () => dispatch(loadConfig()),
		sendScan: (description, longitude, latitude, device, dateTime, code, url, tokenNum, version, machineAddress, userId, scanObj) => dispatch(sendScan(description, longitude, latitude, device, dateTime, code, url, tokenNum, version, machineAddress, userId, scanObj)),
	};
}

const mapStateToProps = state => ({
	url: state.configReducer.url,
	version: state.configReducer.version,
	bearer: state.loginReducer.bearer_auth,
	username: state.loginReducer.username,
	userId: state.loginReducer.userId,
});

export default connect(mapStateToProps, bindAction)(ScanComponent);