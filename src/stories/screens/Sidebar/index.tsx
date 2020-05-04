import * as React from "react";
import { Text, Container, List, ListItem, Content } from "native-base";
import { NavigationActions } from "react-navigation";
import { AsyncStorage } from "react-native";

const routes = [
	{
		route: "PasswordPage",
		caption: "Config Page",
	},
	{
		route: "Login",
		caption: "Logout",
	},
];

export interface Props {
	navigation: any;
	updateLoginStatus: any;
	onLogout: any;
}

export interface State { }

const resetAction = NavigationActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: "Login" })],
});

export default class Sidebar extends React.Component<Props, State> {
	tokenNum: any;

	public getToken = async (): Promise<any> => {
		try {
			this.tokenNum = await AsyncStorage.getItem("token");
			return this.tokenNum;
		} catch (error) {
			return error;
		}
	}

	render() {
		this.getToken();
		return (
			<Container>
				<Content>
					<List
						style={{ marginTop: 40 }}
						dataArray={routes}
						renderRow={data => {
							return (
								<ListItem
									button
									onPress={() => {
										if (data.route === "Login") {
											this.props.onLogout();
											this.props.navigation.dispatch(resetAction);

										} else {
											if (String(this.tokenNum) !== "null") {
												this.props.navigation.navigate(data.route);
											} else {
												this.props.navigation.navigate(data.route);
											}
										}
									}}
								>
									<Text>{data.caption}</Text>
								</ListItem>
							);
						}}
					/>
				</Content>
			</Container>
		);
	}
}