import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import loginReducer from "../container/LoginContainer/reducer";
import configReducer from "../container/ConfigPageContainer/reducer";
import sidebarReducer from "../container/SidebarContainer/reducer";
import manualScanListReducer from "../container/HomeContainer/reducer";

export default combineReducers({
	form: formReducer,
	loginReducer,
	configReducer,
	sidebarReducer,
	manualScanListReducer,
});
