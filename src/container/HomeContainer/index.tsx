import * as React from "react";
import { tagPost } from "./actions";
import { connect } from "react-redux";
import HomeScreen from "../../stories/screens/Home";

export interface Props {
	readonly navigation: any;
	url: any;
	version: any;
	bearer: any;
	userId: any;
}

export interface State {
}

class HomeContainer extends React.Component<Props, State> {

	public constructor(props: Props) {
		super(props);
	}

	public async componentWillMount() {
	}



	render() {
		return <HomeScreen
		navigation={this.props.navigation}
		data={undefined} />;
	}
}

function bindAction(dispatch): Object {
	return {
		// tslint:disable-next-line: max-line-length
		tagPost: (machineAddress, url, tokenNum, version, tallyObj, vesselUid, index, navigation) => dispatch(tagPost(machineAddress, url, tokenNum, version, tallyObj, vesselUid, index, navigation)),
	};
}

const mapStateToProps = state => ({
	url: state.configReducer.url,
	version: state.configReducer.version,
	bearer: state.loginReducer.bearer_auth,
	userId: state.loginReducer.userId,
});

export default connect(mapStateToProps, bindAction)(HomeContainer);