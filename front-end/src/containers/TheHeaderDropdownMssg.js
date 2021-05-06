import React, { useEffect } from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import axiosInstance from "src/plugins/axios";
import { useDispatch, useSelector } from "react-redux";
import { set } from "src/store/actions/messageAction";
import moment from "moment";
import { add, update } from "src/store/actions/messageAction";

import websocket from "src/plugins/socket.io";

const TheHeaderDropdownMssg = () => {
  const user = useSelector((state) => state.auth);
  const rooms = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance.get("/messages").then((response) => {
      dispatch(set(response.data));
    });

    websocket.on(`create:${user.id}`, (data) => {
      dispatch(add(data));
    });

    websocket.on(`update:${user.id}`, (data) => {
      dispatch(update(data));
    });
    return () => {
      websocket.off(`create:${user.id}`);
      websocket.off(`update:${user.id}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const notification = rooms.filter((room) => !room.updated?.includes(user.id));

  const itemsCount = notification.length;

  return (
    <CDropdown inNav className="c-header-nav-item mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-envelope-open" />
        <CBadge shape="pill" color="info">
          {itemsCount}
        </CBadge>
      </CDropdownToggle>

      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light">
          <strong>
            You have{" "}
            {itemsCount === 0
              ? "no new Message"
              : `${itemsCount} new Message${itemsCount > 1 ? "s" : ""}`}
          </strong>
        </CDropdownItem>

        {notification.slice(0, 5).map((item, index) => (
          <CDropdownItem to={`/messages/${item._id}`} key={index} exact>
            <div className="message" style={{ minWidth: "250px" }}>
              <div>
                <small className="text-muted">
                  {item.lastMessage.sender?.name ?? "System Message"}
                </small>
                <small className="text-muted float-right mt-1">
                  {moment(item.lastMessage.date).fromNow()}
                </small>
              </div>
              <div className="text-truncate font-weight-bold">{item.title}</div>
              <div className="small text-muted text-truncate">
                {item.lastMessage.isDocument
                  ? `uploaded ${item.lastMessage.document.name}`
                  : item.lastMessage.text.length > 75
                  ? item.lastMessage.text.substring(0, 75) + "..."
                  : item.lastMessage.text}
              </div>
            </div>
          </CDropdownItem>
        ))}

        <CDropdownItem
          to={"/messages"}
          className="text-center border-top"
          exact
        >
          <strong>View all messages</strong>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownMssg;
