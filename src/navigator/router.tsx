import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;

import Login from "../container/LoginContainer";
import ConfigPage from "../container/ConfigPageContainer";
import Sidebar from "../container/SidebarContainer";
import ExpoScannerContainer from "../container/ExpoScannerContainer";
import HomeContainer from "../container/HomeContainer";
import ScanContainer from "../container/ScanContainer";
import SettingContainer from "../container/SettingContainer";
import PasswordContainer from "../container/PasswordContainer";
import ManualScanContainer from "../container/ManualScanContainer";

export const LoginStack = StackNavigator(
	{
		Login: { screen: Login },
		ConfigPage: { screen: ConfigPage },
	},
	{
		initialRouteName: "Login",
		headerMode: "none",
	},
);

export const LoadStack = StackNavigator(
	{
		Login: { screen: Login },
		ConfigPage: { screen: ConfigPage },
		ExpoScannerPage: { screen: ExpoScannerContainer },
		HomeContainer: { screen: HomeContainer },
		SettingContainer: { screen: SettingContainer },
		ScanContainer: { screen: ScanContainer },
		PasswordPage: { screen: PasswordContainer },
		ManualScanPage: { screen: ManualScanContainer },
	},
	{
		headerMode: "none",
	},
);

export const DischargeStack = StackNavigator(
	{
		Login: { screen: Login },
		ConfigPage: { screen: ConfigPage },
		ExpoScannerPage: { screen: ExpoScannerContainer },
		HomeContainer: { screen: HomeContainer },
		SettingContainer: { screen: SettingContainer },
		ScanContainer: { screen: ScanContainer },
		PasswordPage: { screen: PasswordContainer },
		ManualScanPage: { screen: ManualScanContainer },
	},
	{
		headerMode: "none",
	},
);

export const MainStack = StackNavigator(
	{
		LoginStack: { screen: LoginStack },
		LoadStack: { screen: LoadStack },
		DischargeStack: { screen: DischargeStack },
	},
	{
		initialRouteName: "LoginStack",
		headerMode: "none",
	},
);

export const Drawer = DrawerNavigator(
	{
		MainStack: { screen: MainStack },
	},
	{
		drawerWidth: deviceWidth - 50,
		drawerPosition: "left",
		contentComponent: (props: any) => <Sidebar {...props} />,
	},
);