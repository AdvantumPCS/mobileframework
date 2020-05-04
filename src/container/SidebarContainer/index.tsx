import * as React from "react";
import Sidebar from "../../stories/screens/Sidebar";
import { logoutUser } from "./actions";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
import { NavigationScreenProp } from "react-navigation";

export interface Props {
	navigation: NavigationScreenProp<any, any>;
	logoutUser: Function;
	isLogged: any;
	url: any;
}

export interface State { }

class SidebarContainer extends React.Component<Props, State> {
	public token: any = "";
	public machineAddress: string;

	public getToken = async () => {
		try {
			this.token = await AsyncStorage.getItem("token");
			this.getMachineAddress();
		} catch (error) {
			return error;
		}
	}

	public getMachineAddress = async () => {
		try {
			this.machineAddress = await AsyncStorage.getItem("machine-address");
			this.props.logoutUser(this.props.url, this.token, this.machineAddress);
		} catch (error) {
			return error;
		}
	}

	constructor(props: Props) {
		super(props);
	}

	logout() {
		this.getToken();
	}

	render() {
		return <Sidebar
		onLogout={() => { this.logout(); }} updateLoginStatus={this.props.isLogged} navigation={this.props.navigation} />;
	}
}

function bindAction(dispatch) {
	return {
		logoutUser: (url, token, machineAddress) => dispatch(logoutUser(url, token, machineAddress)),
	};
}

const mapStateToProps = state => ({
	isLogged: state.sidebarReducer.isLogged,
	url: state.configReducer.url,
});

export default connect(mapStateToProps, bindAction)(SidebarContainer);