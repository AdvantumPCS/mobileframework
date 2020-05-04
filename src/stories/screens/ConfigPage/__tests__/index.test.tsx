import React from "react";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import ConfigPageContainer from "../../../../container/ConfigPageContainer";

const navigation = { state: jest.fn() };

it("renders correctly", () => {
	const tree = renderer.create(<ConfigPageContainer navigation={navigation} />).toJSON();
	expect(tree).toMatchSnapshot();
});
