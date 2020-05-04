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
	Toast,

} from "native-base";

import styles from "./styles";
import { BackHandler, ScrollView } from "react-native";
import { NavigationActions } from "react-navigation";

export interface Props {
	readonly data: any;
	readonly navigation: any;
	sendScan: Function;
}

export interface State {

}

class ManualScanTallyList extends React.Component<Props, State> {

	public _isMounted = false;

	public async componentDidMount() {
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
		await this.props.navigation.dispatch(NavigationActions.back());
	}

	public constructor(props: Props) {
		super(props);
		this.state = {
		};
	}

	public aboutUs() {
		Toast.show({
			text: "Port Computer Services (trade name ADVANTUM), a subsidiary of the Shipping Association of Jamaica Property Limited, was established in 1981 to provide information technology infrastructure and systems support to the local port community and the wider Caribbean maritime sector. ADVANTUM holds the distinction of being the pioneer in the computerization of the Port of Kingston, one of the Hemisphere’s premier and most strategically located transshipment ports.",
			duration: 10000,
			position: "top",
			textStyle: { textAlign: "center" },
		});
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
						<Title>Setting</Title>
					</Body>
					<Right />
				</Header>
				<View style={{ flex: 1 }}>
					<ScrollView>
						<View style={{ paddingBottom: 5, paddingTop: 50 }}>
							{/* <Button
								icon
								rounded
								block
								style={styles.button}
								onPress={() => undefined}>
								<Icon active name="md-person" />
								<Text style={{ fontSize: 15, color: "white", textAlign: "center" }}>My Profile</Text>
							</Button> */}
						</View>
						<View style={{ paddingBottom: 5, paddingTop: 5 }}>
							<Button
								icon
								rounded
								block
								style={styles.button}
								onPress={() => this.aboutUs()}>
								<Icon active name="md-help" />
								<Text style={{ fontSize: 15, color: "white", textAlign: "center" }}>About Us</Text>
							</Button>
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
								style={{ paddingLeft: 0, paddingRight: 0 }}
								onPress={() => { this.props.navigation.dispatch(NavigationActions.back()); this.props.navigation.navigate("ScanContainer"); }}>
								<Icon name="md-barcode" />
							</Button>
							<Button
								style={{ paddingLeft: 0, paddingRight: 0, backgroundColor: "#006064" }}
								active
								onPress={() => undefined}>
								<Icon name="md-settings" />
							</Button>
						</FooterTab>
					</Footer>
				</View>
			</Container>
		);
	}
}

export default ManualScanTallyList;