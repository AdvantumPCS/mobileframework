import * as React from "react";
import { Item, Input, Icon, Form, Toast } from "native-base";
import { Field, reduxForm } from "redux-form";
import Login from "../../stories/screens/Login";
import { loginUser } from "./actions";
import { connect } from "react-redux";
import { loadConfig } from "../ConfigPageContainer/actions";
import { Keyboard } from "react-native";
import NetInfo, { NetInfoSubscription, NetInfoState } from "@react-native-community/netinfo";

export interface Props {
	navigation: any;
	valid: boolean;
	username: any;
	password: any;
	url: any;
	basicAuth: any;
	bearerAuth: any;
	version: any;
	loginUser: Function;
	loadConfig: Function;
	isLogged: boolean;
	loginError: boolean;
	isLoginLoading: boolean;
}

export interface State {
	loginPressCheck: boolean;
	isConnected: boolean | null;
}

class LoginForm extends React.Component<Props, State> {
	textInput: any;
	user: string = "";
	pass: string = "";
	check: number = 0;
	_subscription: NetInfoSubscription | null = null;

	constructor(props: Props) {
		super(props);

		this.state = {
			loginPressCheck: false,
			isConnected: undefined,
		};
	}

	componentWillUnmount() {
		Keyboard.dismiss();
		this._subscription && this._subscription();
	}

	componentDidMount() {
		this.props.loadConfig();
		this._subscription = NetInfo.addEventListener(
			this._handleConnectivityChange,
		);
	}

	_handleConnectivityChange = (state: NetInfoState) => {
		this.setState({
			isConnected: state.isConnected,
		});
	};

	renderInput({ input, meta: { touched, error } }: any) {
		return (
			<Item error={error && touched}>
				<Icon active color="#40044D" name={input.name === "username" ? "person" : "unlock"} />
				<Input
					ref={c => {
						this.textInput = c;
					}}
					placeholder={input.name === "username" ? "Username" : "Password"}
					secureTextEntry={input.name === "password" ? true : false}
					onChangeText={input.onChange}
					{...input}
				/>
			</Item>
		);
	}

	login() {
		if (this.state.isConnected === true) {
			if (this.props.valid) {
				this.props.loginUser(
					this.user,
					this.pass,
					this.props.url,
					this.props.basicAuth,
					this.props.bearerAuth,
					this.props.version,
					this.props.navigation,
				);

			}
		} else {

			Toast.show({
				text: "No Internet Connection",
				duration: 2000,
				position: "top",
				textStyle: { textAlign: "center" },
				type: "danger",
			});
		}
	}

	render() {
		const form = (
			<Form>
				<Field
					name="username"
					component={this.renderInput}
					onChange={text => { this.user = text; }}
				/>
				<Field
					name="password"
					component={this.renderInput}
					onChange={text => { this.pass = text; }}
				/>
			</Form>
		);
		return (
			<Login
				loginForm={form}
				navigation={this.props.navigation}
				onLogin={this.login.bind(this)}
				disableLogin={this.props.isLogged || this.props.isLoginLoading}
			/>
		);
	}
}
const LoginContainer = reduxForm({
	form: "login",
})(LoginForm);

function bindAction(dispatch) {
	return {
		// tslint:disable-next-line: variable-name
		loginUser: (username: string, password: string, url: string, basicAuth: string, bearer_auth: string, version: string, navigation: any) =>
			dispatch(
				loginUser(username, password, url, basicAuth, bearer_auth, version, navigation),
			),
		loadConfig: () => dispatch(loadConfig()),
	};
}

const mapStateToProps = state => ({
	username: state.loginReducer.username,
	password: state.loginReducer.password,
	isLogged: state.loginReducer.isLogged,
	loginError: state.loginReducer.loginError,
	isLoginLoading: state.loginReducer.isLoading,
	url: state.configReducer.url,
	basicAuth: state.configReducer.basic_auth,
	bearerAuth: state.configReducer.bearer_auth,
	version: state.configReducer.version,
});

export default connect(
	mapStateToProps,
	bindAction,
)(LoginContainer);
