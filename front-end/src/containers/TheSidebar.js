import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { set } from "../store/actions/sidebarAction";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

// sidebar nav config
import navigation from "./_nav";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebar.show);
  const position = useSelector((state) => state.auth.position);

  const filter = navigation.filter((item) =>
    !item.lock ? true : item.lock === position
  );

  return (
    <CSidebar show={show} onShowChange={(val) => dispatch(set(val))}>
      <CSidebarBrand className="d-md-down-none" to="/">
        <h1>HRMS Demo</h1>
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={filter}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
