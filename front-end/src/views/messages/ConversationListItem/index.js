import React from "react";
import moment from "moment";

import "./ConversationListItem.css";
import { NavLink } from "react-router-dom";

export default function ConversationListItem(props) {
  const { _id, title, lastMessage } = props.data;

  return (
    <>
      <NavLink
        to={`/messages/${_id}`}
        className="conversation-list-item"
        activeStyle={{ background: "#eeeef1" }}
        strict
      >
        <div>
          <small className="text-muted">
            {lastMessage.sender?.name ?? "System Message"}
          </small>
          <small className="text-muted float-right mt-1">
            {moment(lastMessage.date).fromNow()}
          </small>
        </div>
        <div className="text-truncate font-weight-bold">{title}</div>
        <div className="small text-muted text-truncate">
          {lastMessage.isDocument
            ? `uploaded ${lastMessage.document.name}`
            : lastMessage.text.length > 75
            ? lastMessage.text.substring(0, 75) + "..."
            : lastMessage.text}
        </div>
      </NavLink>
    </>
  );
}
