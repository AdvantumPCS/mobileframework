import * as React from "react";
import { Item, Input, Form, Toast } from "native-base";
import { Field, reduxForm } from "redux-form";
import Config from "../../stories/screens/ConfigPage";
import { saveConfig, loadConfig } from "./actions";
import { connect } from "react-redux";

export interface Props {
	navigation: any;
	valid: boolean;
	url: any;
	version: any;
	bearer_auth: any;
	basic_auth: any;
	itemSelected: any;
	saveConfig: Function;
	loadConfig: Function;
	load: Function;
	hasError: boolean;
	isLoading: boolean;
	initialValues: any;
}

export interface State {
	url: any;
	version: any;
	bearer_auth: any;
	basic_auth: any;
	itemSelected: any;
}

class ConfigForm extends React.Component<Props, State> {
	textInput: any;
	_isMounted = false;
	url: any;

	constructor(props: Props) {
		super(props);

		this.state = {
			url: "",
			version: "v1.0",
			bearer_auth: "Bearer ",
			basic_auth: "Basic YXBtMi1jbGllbnQ6MVowbS1yX3V4NkNZSzRZV203TQ==",
			itemSelected: "reader",
		};
	}

	componentWillReceiveProps(newProps) {
		if (this._isMounted === true) {
			this.setState({ url: newProps.initialValues.url });
			this.setState({ version: newProps.initialValues.version });
			this.setState({ bearer_auth: newProps.initialValues.bearer_auth });
			this.setState({ basic_auth: newProps.initialValues.basic_auth });
			this.setState({ itemSelected: newProps.initialValues.itemSelected });
			this.forceUpdate();
		}
	}

	componentDidUpdate() {
		if (this.props.hasError) {
			Toast.show({
				text: "Enter Valid URL, Version, Bearer or Basic Authorization!",
				duration: 2000,
				position: "top",
				textStyle: { textAlign: "center" },
			});
		}
	}

	componentDidMount() {
		this._isMounted = true;
		this.props.loadConfig();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	renderInput({ input, meta: { touched, error } }: any) {
		return (
			<Item rounded error={error && touched}>
				<Input
					ref={c => { this.textInput = c; }}
					placeholder={input.name === "url" ? "URL" : input.name === "version" ? "Version" :
						input.name === "bearer_auth" ? "Bearer Authorization" : "Basic Authorization"}
					onChangeText={input.onChange}
					{...input}
				/>
			</Item>
		);
	}

	submit() {
		if (this.props.valid) {
			this.props.saveConfig(this.url, this.state.version, this.state.bearer_auth, this.state.basic_auth, this.state.itemSelected);
			Toast.show({
				text: "Configuration was saved",
				duration: 2000,
				position: "top",
				textStyle: { textAlign: "center" },
				type: "success",
			});
		} else {
			Toast.show({
				text: "Enter Valid URL, Version, Bearer & Basic Authorization!",
				duration: 2000,
				position: "top",
				textStyle: { textAlign: "center" },
				type: "danger",
			});
		}
	}

	load() {
		if (this.props.valid) {
			if (this._isMounted === true) {
				this.props.loadConfig();
				this.setState({ url: "" });
				this.setState({ version: "v1.0" });
				this.setState({ bearer_auth: "Bearer " });
				this.setState({ basic_auth: "Basic YXBtMi1jbGllbnQ6MVowbS1yX3V4NkNZSzRZV203TQ==" });
				this.setState({ itemSelected: "reader" });
				this.forceUpdate();

				Toast.show({
					text: "Setting Loaded",
					duration: 2000,
					position: "top",
					textStyle: { textAlign: "center" },
					type: "success",
				});
			}
		} else {
			Toast.show({
				text: "Setting Loading Failed",
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
					name="url"
					component={this.renderInput}
					onChange={text => {
						if (this._isMounted === true) {
							this.setState({ url: text });
							this.url = text;
						}
					}}
				/>
				<Field
					name="version"
					component={this.renderInput}
					onChange={text => {
						if (this._isMounted === true) {
							this.setState({ version: text });
						}
					}}
				/>
				<Field
					name="bearer_auth"
					component={this.renderInput}
					onChange={text => {
						if (this._isMounted === true) {
							this.setState({ bearer_auth: text });
						}
					}}
				/>
				<Field
					name="basic_auth"
					component={this.renderInput}
					onChange={text => {
						if (this._isMounted === true) {
							this.setState({ basic_auth: text });
							this.forceUpdate();
						}
					}}
				/>
				{/* <ListItem>
					<Left>
						<Text>Reader  </Text>
						<Radio onPress={() => { if (this._isMounted === true) { this.setState({ itemSelected: "reader" }); } }}
							selected={this.state.itemSelected === "reader"} />
					</Left>
					<Left>
						<Text>Mobile  </Text>
						<Radio onPress={() => { if (this._isMounted === true) { this.setState({ itemSelected: "mobile" }); } }}
							selected={this.state.itemSelected === "mobile"} />
					</Left>
				</ListItem> */}
			</Form>
		);

		return (
			<Config navigation={this.props.navigation}
				configForm={form}
				onSave={() => this.submit()}
				load={() => this.load()}
			/>
		);
	}
}

const ConfigContainer = reduxForm({
	form: "config",
	enableReinitialize: true,
})(ConfigForm);

function bindAction(dispatch) {
	return {
		// tslint:disable-next-line: max-line-length tslint:disable-next-line: variable-name
		saveConfig: (url: string, version: string, bearer_auth: string, basic_auth: string, itemSelected: string) => dispatch(saveConfig(url, version, bearer_auth, basic_auth, itemSelected)),
		loadConfig: () => dispatch(loadConfig()),
	};
}

const mapStateToProps = state => ({
	initialValues: {
		"url": state.configReducer.url,
		"version": state.configReducer.version,
		"bearer_auth": state.configReducer.bearer_auth,
		"basic_auth": state.configReducer.basic_auth,
		"itemSelected": state.configReducer.itemSelected,
	},
	hasError: state.configReducer.hasError,
	isLoading: state.configReducer.isLoading,
});

export default connect(
	mapStateToProps,
	bindAction,
)(ConfigContainer);
