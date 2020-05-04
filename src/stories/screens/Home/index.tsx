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
import { BackHandler, ScrollView, Keyboard } from "react-native";
import { NavigationActions } from "react-navigation";

export interface Props {
	readonly data: any;
	readonly navigation: any;
}

export interface State {
}

class ManualScanList extends React.Component<Props, State> {
	public _isMounted = false;

	public async componentDidMount() {
		Keyboard.dismiss();
		BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
	}

	public async componentWillMount() {
		this._isMounted = true;
	}

	public async componentWillUnmount() {
		this._isMounted = false;
		BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
	}

	public handleBackPress = async () => {
		return true;
	}

	public constructor(props: Props) {
		super(props);
		this.state = {
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
						<Title>Home</Title>
					</Body>
					<Right />
				</Header>
				<View style={{ flex: 1 }}>
					<ScrollView>
						<View style={{ paddingBottom: 5, paddingTop: 50 }}>
							<Button
								icon
								rounded
								block
								style={styles.button}
								onPress={() => undefined}>
								<Icon active name="md-locate" />
								<Text style={{ fontSize: 15, color: "white", textAlign: "center" }}>Button Rounded</Text>
							</Button>
						</View>
						<View style={{ paddingBottom: 5, paddingTop: 5 }}>
							<Button
								icon
								block
								style={styles.button}
								onPress={() => undefined}>
								<Icon active name="md-warning" />
								<Text style={{ fontSize: 15, color: "white", textAlign: "center" }}>Button Normal</Text>
							</Button>
						</View>
						<View style={{ paddingBottom: 5, paddingTop: 5 }}>
							<Button
								style={styles.button}
								onPress={() => this.props.navigation.navigate("ManualScanPage")}>
								<Text style={{ fontSize: 15, color: "white", textAlign: "center" }}>Iconless Blockless Button</Text>
							</Button>
						</View>
					</ScrollView>
					<Footer>
						<FooterTab style={{ backgroundColor: "#40044D" }}>
							<Button
								style={{ paddingLeft: 0, paddingRight: 0, backgroundColor: "#006064" }}
								active
								onPress={() => undefined}>
								<Icon name="md-home" />
							</Button>
							<Button
								style={{ paddingLeft: 0, paddingRight: 0 }}
								onPress={() => { this.props.navigation.dispatch(NavigationActions.back()); this.props.navigation.navigate("ScanContainer"); }}>
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
			</Container>
		);
	}
}

export default ManualScanList;