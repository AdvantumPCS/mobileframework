import * as React from "react";
import {
	Container,
	Header,
	Title,
	Content,
	Button,
	Icon,
	Left,
	Body,
	Right,
	View,
	Text,
	ListItem,
	Toast,
	Footer,
	FooterTab,
} from "native-base";
import styles from "./styles";
import { BackHandler, AsyncStorage, ActivityIndicator, FlatList } from "react-native";
import { NavigationActions } from "react-navigation";

export interface Props {
	readonly data: any;
	readonly navigation: any;
	sendScan: Function;
}

export interface State {
	scanObj: any;
	loading: boolean;
}

class ManualScan extends React.Component<Props, State> {
	public colour: any;
	public postedAmount: number = 0;
	public amount: number = 0;
	public countColour: string;
	public vesselUid: string = "";
	public _isMounted = false;

	public async componentDidMount() {
		BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
	}

	public async componentWillMount() {
		this._isMounted = true;
		this.showLoading();
		await this.getLocalScans();
	}

	public async componentWillUnmount() {
		this._isMounted = false;
		BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
	}

	public async clearItem() {
		if (this._isMounted === true) {
			if (this.state.scanObj != undefined || this.state.scanObj != null) {
				this.setState({ scanObj: this.state.scanObj.filter(element => element.isPosted === false) });
				await AsyncStorage.setItem("localScan", JSON.stringify(this.state.scanObj));
			}
		}
	}

	public sendScan() {
		
	}

	public getLocalScans = async (): Promise<any> => {
		this.amount = 0;
		this.postedAmount = 0;
		let scans = [];

		try {
			if (this._isMounted === true) {
				scans = JSON.parse(await AsyncStorage.getItem("localScan"));
				this.setState({ scanObj: scans });
				console.log("state: ", this.state.scanObj);
				this.amount = this.state.scanObj.length;
				this.postedAmount = this.state.scanObj.filter(element => element.isPosted === true).length;

				this.failPost();
				this.hideLoading();
			}
		} catch (error) {
			return error;
		}
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

	public handleBackPress = async () => {
		await this.props.navigation.dispatch(NavigationActions.back());
	}

	dateRegex(dateTime: any) {

		if (dateTime === undefined || dateTime === null) {
			return "";
		} else {
			return dateTime.replace("T", " ").replace("Z", " ");
		}
	}

	isPosted(isPosted: any) {

		if (isPosted === true) {
			this.colour = "green";
		} else {
			this.colour = "red";
		}
	}

	failPost() {

		if (this.postedAmount > 0) {
			this.countColour = "red";
		} else {
			this.countColour = "white";
		}
	}

	moreInfo = (obj: any) => {
		Toast.show({
			text: this.object(obj),
			duration: 10000,
			position: "bottom",
			textStyle: { textAlign: "left" },
			buttonText: "Close",
		});
	}

	public object(object: any) {
		return ("Scan: " + object.description + "\n" +
			"Tag Date: " + this.dateRegex(object.scanDateTime) + "\n" +
			"Posted: " + object.isPosted + "\n" +
			"Device: " + object.device);
	}

	public constructor(props: Props) {
		super(props);
		this.state = {
			scanObj: [],
			loading: false,
		};
		this.sendScan = this.sendScan.bind(this);
		this.clearItem = this.clearItem.bind(this);
	}

	renderItem = ({ item }) => {
		return (
			<ListItem
				icon
				button
				style={{ flex: 1, height: 150 }}
				onPress={() => this.moreInfo(item)}
			>
				<View style={{ flexDirection: "column", flex: 1 }}>
					<Icon active name="md-barcode" />
				</View>
				{this.isPosted(item.isPosted)}
				<View style={{ flexDirection: "column", flex: 4 }}>
					<Text style={{ color: "white", textAlign: "left" }}>Scan: {item.description}</Text>
					<Text style={{ color: "white", textAlign: "left" }}>Date/Time: {this.dateRegex(item.scanDateTime)}</Text>
					<View style={{ flexDirection: "row" }}>
						<Text style={{ color: "white", textAlign: "left" }}>Status: </Text>
						<Text style={{ color: this.colour, textAlign: "left" }}> {item.isPosted === true ? "Sent" : "Failed"}</Text>
					</View>
				</View>
			</ListItem>
		);
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
						<Title>Local Scan List</Title>
					</Body>
					<Right />
				</Header>
				<Content>
					{
						this.state.loading &&
						<View>
							<ActivityIndicator size="large" color="#00ff00" />
						</View>
					}
					<FlatList
						data={this.state.scanObj}
						extraData={this.state}
						renderItem={this.renderItem}
						keyExtractor={item => item.scanDateTime}
					/>
				</Content>
				<View>
					<View style={{ flexDirection: "row" }}>
						<Text style={{ color: this.countColour, textAlign: "center" }}>{String(this.postedAmount)}</Text>
						<Text style={{ color: "white", textAlign: "center" }}> of {String(this.amount)} records not sent</Text>
					</View>
					<View style={{ flexDirection: "row", paddingBottom: 5, paddingTop: 5 }}>
						<View style={{ flex: 1, paddingRight: 5 }}>
							<Button
								rounded
								block
								style={styles.button}
								onPress={() => this.sendScan()}>
								<Text style={{ fontSize: 12, color: "white", textAlign: "center" }}>Send Scan</Text>
							</Button>
						</View>
						<View style={{ flex: 1 }}>
							<Button
								rounded
								block
								style={styles.button}
								onPress={() => this.clearItem()}>
								<Text style={{ fontSize: 12, color: "white", textAlign: "center" }}>Clear Sent Scan</Text>
							</Button>
						</View>
					</View>
				</View>
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
			</Container>
		);
	}
}

export default ManualScan;