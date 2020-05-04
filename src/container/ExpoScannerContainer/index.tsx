import * as React from "react";
import { connect } from "react-redux";
import ExpoScanner from "../../stories/screens/ExpoScanner";
import { loadConfig } from "../ConfigPageContainer/actions";

export interface Props {
	readonly navigation: any;
	loadConfig: Function;
	itemSelected: any;
}

export interface State { }

class ExpoScannerContainer extends React.Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		this.state = { };
	}

	render() {
		return <ExpoScanner navigation={this.props.navigation} data={undefined} />;
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

export default connect(mapStateToProps, bindAction)(ExpoScannerContainer);