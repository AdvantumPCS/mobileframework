
import React from "react";
import { Alert, View, Text, Vibration, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

export interface Props {
	readonly navigation: any;
	data: any;
}

export interface State {
	hasCameraPermission: any;
	type: any;
	scannedItem: any;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: "#fff",
	},
	scanScreenMessage: {
		fontSize: 20,
		color: "white",
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
	},
});

class ExpoScanner extends React.Component<Props, State> {

	scannedCode: any;

	public constructor(props: Props) {
		super(props);

		this.onBarCodeRead = this.onBarCodeRead.bind(this);
		this.renderMessage = this.renderMessage.bind(this);
		this.scannedCode = undefined;

		this.state = {
			hasCameraPermission: undefined,
			type: Camera.Constants.Type.back,
			scannedItem: "",
		};
	}

	async componentWillMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		await this.setState({ hasCameraPermission: status === "granted" });
		await this.resetScanner();
	}

	renderAlert(title, message) {
		Alert.alert(
			title,
			message,
			[
				{ text: "OK", onPress: () => this.resetScanner() },
			],
			{ cancelable: true },
		);
	}

	goBack(data) {
		const { navigation } = this.props;
		navigation.state.params.onBarcodeScan({ scan: data });
		navigation.goBack();
	}

	onBarCodeRead({ type, data }) {
		if ((type === this.state.scannedItem.type && data === this.state.scannedItem.data) || data === null) {
			return;
		}

		Vibration.vibrate(0, true);
		this.setState({ scannedItem: { data, type } });

			this.resetScanner();
			this.goBack(String(data.trim()));

		// if (type.toString().startsWith("org.gs1.EAN")) {
		// 	// Do something for EAN
		// 	this.resetScanner();
		// 	this.goBack(String(data.trim()));

		// } else if (type.toString().startsWith("org.iso.QRCode") || type === 256) {
		// 	// Do samething for QRCode
		// 	this.resetScanner();
		// 	this.goBack(String(data.trim()));
		// } else {
		// 	this.renderAlert(
		// 		"This barcode is not supported.",
		// 		`${type} : ${data}`,
		// 	);
		// }
	}

	renderMessage() {
		if (this.state.scannedItem && this.state.scannedItem.type) {
			const { type, data } = this.state.scannedItem;
			return (
				<Text style={styles.scanScreenMessage}>
					{`Scanned \n ${type} \n ${data}`}
				</Text>
			);
		}
		return <Text style={styles.scanScreenMessage}>Focus the barcode to scan.</Text>;
	}

	resetScanner() {
		this.scannedCode = undefined;
		this.setState({
			scannedItem: {
				type: undefined,
				data: undefined,
			},
		});
	}

	render() {
		const { hasCameraPermission } = this.state;

		if (hasCameraPermission === null) {
			return <Text>Requesting for camera permission</Text>;
		}
		if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>;
		}
		return (
			<View style={styles.container}>
				<View style={{ flex: 1 }}>
					<BarCodeScanner
						onBarCodeScanned={this.onBarCodeRead}
						style={StyleSheet.absoluteFill}
					/>
					{this.renderMessage()}
				</View>
			</View>
		);
	}
}

export default ExpoScanner;
