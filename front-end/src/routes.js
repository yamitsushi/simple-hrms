import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Setting = React.lazy(() => import("./views/pages/setting/Setting"));

const Employees = React.lazy(() => import("./views/employees/Employees"));
const Jobs = React.lazy(() => import("./views/jobs/Jobs"));
const CreateJobs = React.lazy(() => import("./views/jobs/forms/CreateForm"));
const ModifyJobs = React.lazy(() => import("./views/jobs/forms/ModifyForm"));
const Recruitments = React.lazy(() =>
  import("./views/recruitments/Recruitments")
);
const Applicants = React.lazy(() => import("./views/applicants/Applicants"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/setting", name: "Setting", component: Setting },
  { path: "/employees", name: "HR Information System", component: Employees },
  { path: "/jobs/create", name: "Create new Job", component: CreateJobs },
  { path: "/jobs/:id", name: "Update Job", component: ModifyJobs },
  { path: "/jobs", name: "Job Posting", component: Jobs },
  {
    path: "/recruitments/:id",
    name: "Applicant Listing",
    component: Applicants,
  },
  {
    path: "/recruitments",
    name: "Recruitment Listing",
    component: Recruitments,
  },
];

export default routes;
