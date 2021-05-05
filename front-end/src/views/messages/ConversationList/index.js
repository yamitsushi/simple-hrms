import React, { useState } from "react";
import ConversationListItem from "../ConversationListItem";
import Toolbar from "../Toolbar";
import { CButton, CInput } from "@coreui/react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

export default function ConversationList(props) {
  const history = useHistory();
  const rooms = useSelector((state) => state.message);
  const [search, setSearch] = useState("");

  let filter = search
    ? rooms.filter((room) =>
        room.title.toLowerCase().includes(search.toLowerCase())
      )
    : rooms;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Toolbar
        title={
          <CInput
            placeholder="Search Messages"
            onChange={(e) => setSearch(e.target.value)}
          />
        }
        rightItems={
          <CButton onClick={() => history.push("/messages/create")}>
            Create
          </CButton>
        }
      />
      {filter.map((conversation, index) => (
        <ConversationListItem key={index} data={conversation} />
      ))}
    </div>
  );
}
