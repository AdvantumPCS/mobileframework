import * as React from "react";
import { sendScan } from "./actions";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
import ManualScan from "../../stories/screens/ManualScan";

export interface Props {
	readonly navigation: any;
	sendScan: Function;
	url: any;
	version: any;
	bearer: any;
	userId: any;
}

export interface State {
}

class ManualScanContainer extends React.Component<Props, State> {
	tokenNum: string;
	machineAddress: string;

	public constructor(props: Props) {
		super(props);
	}

	public async componentWillMount() {
		await this.getMachineAddress();
		await this.getToken();
	}

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

	public postScan = (scan: any, vesselUid: any, index: any) => {
		if (scan !== null || scan !== undefined) {
			this.props.sendScan(this.machineAddress, this.props.url, this.tokenNum, this.props.version, scan, vesselUid, index, this.props.navigation);
		}
	}

	render() {
		return <ManualScan
		navigation={this.props.navigation}
		sendScan={this.postScan.bind(this)}
		data={undefined} />;
	}
}

function bindAction(dispatch): Object {
	return {
		// tslint:disable-next-line: max-line-length
		sendScan: (description, longitude, latitude, device, dateTime, code, url, tokenNum, version, machineAddress, userId) => dispatch(sendScan(description, longitude, latitude, device, dateTime, code, url, tokenNum, version, machineAddress, userId)),
	};
}

const mapStateToProps = state => ({
	url: state.configReducer.url,
	version: state.configReducer.version,
	bearer: state.loginReducer.bearer_auth,
	userId: state.loginReducer.userId,
});

export default connect(mapStateToProps, bindAction)(ManualScanContainer);