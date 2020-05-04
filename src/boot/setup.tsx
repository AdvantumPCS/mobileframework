import { AppLoading } from "expo";
import * as React from "react";
import { StyleProvider } from "native-base";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import App from "../App";
import getTheme from "../theme/components";
import variables from "../theme/variables/platform";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

export interface Props { }

export interface State {
	store: Object;
	isLoading: boolean;
	isReady: boolean;
}

export default class Setup extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			store: configureStore(() => this.setState({ isLoading: false })),
			isReady: false,
		};
	}

	componentWillMount() {
		this.loadFonts();
	}

	async loadFonts() {
		await Font.loadAsync({
			"Roboto": require("../../node_modules/native-base/Fonts/Roboto.ttf"),
			"Roboto_medium": require("../../node_modules/native-base/Fonts/Roboto_medium.ttf"),
			...Ionicons.font,
		});

		this.setState({ isReady: true });
	}

	render() {
		if (!this.state.isReady || this.state.isLoading) {
			return <AppLoading />;
		}

		return (
			<StyleProvider style={getTheme(variables)}>
				<Provider store={this.state.store}>
					<App />
				</Provider>
			</StyleProvider>
		);
	}
}