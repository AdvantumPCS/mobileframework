import * as React from "react";
import { Image } from "react-native";
import {
	Container,
	Content,
	Header,
	Body,
	Button,
	Text,
	View,
	Title,
} from "native-base";
import styles from "../Login/styles";

export interface Props {
	readonly loginForm: any;
	readonly onLogin: Function;
	readonly disableLogin: boolean;
	readonly navigation: any;
}

export interface State {
	active: string;
}

class Login extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			active: "true",
		};
	}

	render() {
		return (
			<Container>
				<Header style={{ height: 200, backgroundColor: "#41007B" }}>
					<Body style={{ alignItems: "center" }}>
						<Image
							source={require("../../../../assets/advantum.png")}
							style={{
								width: 120,
								height: 120,
								resizeMode: "contain",
								padding: 5,
							}} />
						<View style={{ flex: 1 }}>
							<Title style={{ alignContent: "center", flexDirection: "row", color: "black" }}>Mobile Framework</Title>
						</View>
					</Body>
				</Header>
				<Content>
					{this.props.loginForm}
					<View padder>
						<Button
							block
							disabled={this.props.disableLogin}
							onPress={() => this.props.onLogin()}
							rounded
							style={styles.btn}
						>
							<Text>Login</Text>
						</Button>
					</View>
				</Content>

				<Text style={{ alignContent: "center", flexDirection: "row", color: "black" }}>Version 1.0.0</Text>
			</Container>
		);
	}
}

export default Login;