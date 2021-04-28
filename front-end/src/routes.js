import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Setting = React.lazy(() => import("./views/pages/setting/Setting"));

const Employees = React.lazy(() => import("./views/employees/Employees"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/setting", name: "Setting", component: Setting },
  { path: "/employees", name: "HR Information System", component: Employees },
];

export default routes;
