import SidebarReducer from "./sidebarReducer";
import AuthReducer from "./authReducer";

import { combineReducers } from "redux";

export default combineReducers({
  sidebar: SidebarReducer,
  auth: AuthReducer,
});
