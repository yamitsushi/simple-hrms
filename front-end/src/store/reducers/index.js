import { combineReducers } from "redux";

import SidebarReducer from "./sidebarReducer";
import AuthReducer from "./authReducer";
import EmployeeReducer from "./employeeReducer";

export default combineReducers({
  sidebar: SidebarReducer,
  auth: AuthReducer,
  employee: EmployeeReducer,
});
