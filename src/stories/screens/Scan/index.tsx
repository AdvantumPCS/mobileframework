import * as React from "react";
import {
	Container,
	Header,
	Title,
	Button,
	Icon,
	Left,
	Body,
	Right,
	View,
	Footer,
	FooterTab,
	Text,
} from "native-base";

import styles from "./styles";
import { BackHandler, ScrollView } from "react-native";
import { NavigationActions } from "react-navigation";

export interface Props {
	readonly data: any;
	readonly navigation: any;
	onScan: any;
}

export interface State {
	scanObj: any;
	loading: boolean;
	username: any;
}

class ScanScreen extends React.Component<Props, State> {
	public _isMounted = false;

	public async componentDidMount() {
		BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
	}

	public async componentWillMount() {
		this._isMounted = true;
		this.showLoading();
	}

	public async componentWillUnmount() {
		this._isMounted = false;
		BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
	}

	public handleBackPress = async () => {
		await this.props.navigation.dispatch(NavigationActions.back());
	}

	showLoading() {
		if (this._isMounted === true) {
			this.setState({ loading: true });
		}
	}

	hideLoading() {
		if (this._isMounted === true) {
			this.setState({ loading: false });
		}
	}

	dateRegex(dateTime: any) {

		if (dateTime === undefined || dateTime === null) {
			return "";
		} else {
			return dateTime.replace("T", " ").replace("Z", " ");
		}
	}

	public constructor(props: Props) {
		super(props);
		this.state = {
			scanObj: [],
			loading: false,
			username: "",
		};
	}

	render() {
		return (
			<Container style={styles.container}>
				<Header style={styles.header}>
					<Left>
						<Button transparent>
							<Icon
								active
								name="menu"
								onPress={() => this.props.navigation.navigate("DrawerOpen")}
							/>
						</Button>
					</Left>
					<Body style={{ flex: 3 }}>
						<Title>Scan</Title>
					</Body>
					<Right />
				</Header>
				<View style={{ flex: 1 }}>
					<ScrollView>
						<View style={{ flexDirection: "row", paddingBottom: 5, paddingTop: 5 }}>
							<View style={{ paddingBottom: 5, paddingTop: 50 }}>
							</View>
							<View style={{ flex: 1, paddingRight: 5 }}>
								<Button
									icon
									rounded
									block
									style={styles.button}
									onPress={() => this.props.onScan()}>
									<Icon active name="md-barcode" />
									<Text style={{ fontSize: 10, color: "white", textAlign: "center" }}>Scan</Text>
								</Button>
							</View>
						</View>
					</ScrollView>
					<Footer>
						<FooterTab style={{ backgroundColor: "#40044D" }}>
							<Button
								style={{ paddingLeft: 0, paddingRight: 0 }}
								onPress={() => { this.props.navigation.dispatch(NavigationActions.back()); this.props.navigation.navigate("HomeContainer"); }}>
								<Icon name="md-home" />
							</Button>
							<Button
								style={{ paddingLeft: 0, paddingRight: 0, backgroundColor: "#006064" }}
								active
								onPress={() => undefined}>
								<Icon name="md-barcode" />
							</Button>
							<Button
								style={{ paddingLeft: 0, paddingRight: 0 }}
								onPress={() => { this.props.navigation.dispatch(NavigationActions.back()); this.props.navigation.navigate("SettingContainer"); }}>
								<Icon name="md-settings" />
							</Button>
						</FooterTab>
					</Footer>
				</View>
			</Container >
		);
	}
}

export default ScanScreen;