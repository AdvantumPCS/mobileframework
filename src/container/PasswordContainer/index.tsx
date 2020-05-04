import * as React from "react";
import { connect } from "react-redux";
import Password from "../../stories/screens/Password";
import { loadConfig } from "../ConfigPageContainer/actions";

export interface Props {
	readonly navigation: any;
	loadConfig: Function;
}
export interface State { }

class PasswordContainer extends React.Component<Props, State> {

	public constructor(props: Props) {
		super(props);
	}

	render() {
		return <Password navigation={this.props.navigation} data={undefined} />;
	}
}

function bindAction(dispatch): Object {
	return {
		loadConfig: () => dispatch(loadConfig()),
	};
}

const mapStateToProps = state => ({
	itemSelected: state.configReducer.itemSelected,
});

export default connect(mapStateToProps, bindAction)(PasswordContainer);