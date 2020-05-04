import * as React from "react";
import { Platform, BackHandler, Image } from "react-native";
import {
	Container,
	Content,
	Header,
	Body,
	Button,
	Text,
	View,
} from "native-base";
import { NavigationActions } from "react-navigation";
import styles from "../ConfigPage/styles";

export interface Props {
	configForm: any;
	onSave: Function;
	load: Function;
	navigation: any;
}

export interface State { }

class Login extends React.Component<Props, State> {
	componentDidMount() {
		BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
	}

	public handleBackPress = async () => {
		this.props.navigation.dispatch(NavigationActions.back());
		this.props.navigation.dispatch(NavigationActions.back());
	}

	render() {
		return (
			<Container>
				<Header style={{ height: 140, backgroundColor: "#41007B" }}>
					<Body style={{ alignItems: "center" }}>
						<Image
							source={require("../../../../assets/advantum.png")}
							style={{
								width: 80,
								height: 80,
								resizeMode: "contain",
							}} />
						<View padder>
							<Text
								style={{ color: Platform.OS === "ios" ? "#000" : "#FFF" }}
							/>
						</View>
						<Text style={{ flex: 1, color: "white" }}>Version 1.0.0</Text>
					</Body>
				</Header>
				<Content>
					{this.props.configForm}
					<View style={{ padding: 5 }}>
						<Button
							block
							rounded
							style={styles.btn}
							onPress={() => this.props.onSave()}>
							<Text>Save</Text>
						</Button>
					</View>
				</Content>
			</Container>
		);
	}
}

export default Login;