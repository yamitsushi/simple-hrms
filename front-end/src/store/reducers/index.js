import SidebarReducer from "./sidebarReducer";

import { combineReducers } from "redux";

export default combineReducers({
  sidebar: SidebarReducer,
});
