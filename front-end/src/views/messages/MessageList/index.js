import React, { useEffect, useState } from "react";
import Toolbar from "../Toolbar";
import Message from "../Message";
import moment from "moment";
import { CButton } from "@coreui/react";
import axiosInstance from "src/plugins/axios";
import { useParams } from "react-router-dom";

export default function MessageList(props) {
  const id = useParams().id;
  const [room, setRoom] = useState([]);

  useEffect(() => {
    axiosInstance.get(`/messages/${id}`).then((response) => {
      setRoom(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const renderMessages = () => {
    let messages = [];
    let timestamp;

    messages = room.messages?.map((message) => {
      let config = {
        timer: 0,
        isToday: false,
      };
      if (timestamp) {
        let duration = timestamp.diff(timestamp).as("minutes");

        if (duration < 10) timestamp = moment(message.date);
        else config.timer = duration;
      } else {
        config.timer = 100;
        timestamp = moment(message.date);
      }

      config.isToday = moment(message.date);

      return <Message key={message._id} {...message} {...config} />;
    });
    return messages;
  };

  return (
    <div className="message-list">
      <Toolbar
        title={room.room?.title}
        rightItems={<CButton>Update</CButton>}
      />

      <div
        style={{
          padding: "10px",
          paddingBottom: "70px",
        }}
      >
        {renderMessages()}
      </div>
    </div>
  );
}
