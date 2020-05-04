import * as React from "react";
import { connect } from "react-redux";
import { tallyPost } from "./actions";
import ManualScanTallyList from "../../stories/screens/Setting";
import { AsyncStorage } from "react-native";

export interface Props {
	readonly navigation: any;
	getTaggedList: Function;
	tallyPost: Function;
	url: any;
	version: any;
	bearer: any;
}

export interface State {
}

class ManualScanTallyListContainer extends React.Component<Props, State> {
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

	public postTally = (scan: any, vesselUid: any, index: any) => {

		if (scan !== null || scan !== undefined) {
			this.props.tallyPost(this.machineAddress, this.props.url, this.tokenNum, this.props.version, scan, vesselUid, index, this.props.navigation);
		}
	}

	render() {
		return <ManualScanTallyList
			navigation={this.props.navigation}
			sendScan={this.postTally.bind(this)}
			data={undefined} />;
	}
}

function bindAction(dispatch): Object {
	return {
		// tslint:disable-next-line: max-line-length
		tallyPost: (machineAddress, urlOauth, bearerAuthorization, version, tallyObj, vesselUid, index, navigation) => dispatch(tallyPost(machineAddress, urlOauth, bearerAuthorization, version, tallyObj, vesselUid, index, navigation)),
	};
}

const mapStateToProps = state => ({
	data: state.manualScanListReducer.list,
	url: state.configReducer.url,
	version: state.configReducer.version,
	bearer: state.loginReducer.bearer_auth,
});

export default connect(mapStateToProps, bindAction)(ManualScanTallyListContainer);