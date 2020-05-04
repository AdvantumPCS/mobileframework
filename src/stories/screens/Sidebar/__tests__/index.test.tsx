import React from "react";
import Sidebar from "../index";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

const navigation = { navigate: jest.fn() };
const onLogout = { onLogout: jest.fn() };
const updateLoginStatus = { updateLoginStatus: jest.fn() };

it("renders correctly", () => {
	const tree = renderer.create(<Sidebar onLogout={onLogout} updateLoginStatus={updateLoginStatus} navigation={navigation} />).toJSON();
	expect(tree).toMatchSnapshot();
});
