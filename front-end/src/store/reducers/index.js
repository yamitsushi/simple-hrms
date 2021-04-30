import { combineReducers } from "redux";

import SidebarReducer from "./sidebarReducer";
import AuthReducer from "./authReducer";
import EmployeeReducer from "./employeeReducer";
import JobReducer from "./jobReducer";
import RecruitmentReducer from "./recruitmentReducer";
import ApplicantReducer from "./applicantReducer";

export default combineReducers({
  sidebar: SidebarReducer,
  auth: AuthReducer,
  employee: EmployeeReducer,
  job: JobReducer,
  recruitment: RecruitmentReducer,
  applicant: ApplicantReducer,
});
