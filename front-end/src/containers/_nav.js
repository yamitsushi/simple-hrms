import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    lock: "HRIS Manager",
    name: "HR Information System",
    to: "/employees",
    icon: <CIcon name="cil-building" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    lock: "HRIS Manager",
    name: "Job Posting",
    to: "/jobs",
    icon: <CIcon name="cil-description" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    lock: "HRIS Manager",
    name: "Recruitments",
    to: "/recruitments",
    icon: <CIcon name="cil-file" customClasses="c-sidebar-nav-icon" />,
  },
];

export default _nav;
