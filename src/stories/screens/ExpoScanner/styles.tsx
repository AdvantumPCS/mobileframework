import { StyleSheet } from "react-native";

const styles: any = StyleSheet.create({
	head: { height: 40, backgroundColor: "#3c3cfb" },
	container: {
		backgroundColor: "#3c3cfb",
		flex: 1,
		padding: 16,
		paddingTop: 30,
	},
	header: {
		backgroundColor: "#3c3cfb",
	},
	row: {
		flex: 1,
		alignItems: "center",
	},
	text: {
		alignItems: "center",
		margin: 6,
		color: "#ffffff",
		fontWeight: "bold",
	},
	mt: {
		marginTop: 18,
	},
	card: {
		height: 80,
		borderLeftColor: "#3399FF",
		borderLeftWidth: 5,
		backgroundColor: "#3399FF",
	},
	cardItem: {
		height: 120,
		backgroundColor: "#3399FF",
	},
	button: {
		backgroundColor: "#4b00a8",
	},
	buttonText: {
		color: "#ffffff",
	},
});
export default styles;
