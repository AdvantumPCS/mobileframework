import React from "react";
import PasswordGesture from "react-native-gesture-password";

export interface Props {
	readonly data: any;
	readonly navigation: any;
}

let Password1 = "125";

export interface State {
	message: any;
	status: any;
}

class Password extends React.Component<Props, State> {
	public constructor(props) {
		super(props);

		this.state = {
			message: "Please input your password.",
			status: "normal",
		};
	}

	onEnd(password) {
		if (password === Password1) {
			this.setState({
				status: "right",
				message: "Password is right, success.",
			});
			this.props.navigation.navigate("ConfigPage");
		} else {
			this.setState({
				status: "wrong",
				message: "Password is wrong, try again.",
			});
		}
	}

	onStart() {
		this.setState({
			status: "normal",
			message: "Please input your password.",
		});
	}

	onReset() {
		this.setState({
			status: "normal",
			message: "Please input your password (again).",
		});
	}

	render() {
		return (
			<PasswordGesture
				ref="pg"
				status={this.state.status}
				message={this.state.message}
				onStart={() => this.onStart()}
				onEnd={(password) => this.onEnd(password)}
				innerCircle={true}
				outerCircle={true}
				normalColor="#40044D"
			/>
		);
	}
}

export default Password;