import React from "react";
import Login from "../index";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

const onLogin = jest.fn();
const loginForm = React.Component;
const disableLogin = false;
const navigation = jest.fn();

it("renders correctly", () => {
  const tree = renderer
    .create(
      <Login
        onLogin={onLogin}
        loginForm={loginForm}
        disableLogin={disableLogin}
        navigation={navigation}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
