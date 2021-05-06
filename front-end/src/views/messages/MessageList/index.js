import React, { useEffect, useRef, useState } from "react";
import Toolbar from "../Toolbar";
import Message from "../Message";
import moment from "moment";
import { CButton } from "@coreui/react";
import axiosInstance from "src/plugins/axios";
import { useParams } from "react-router-dom";
import websocket from "src/plugins/socket.io";

export default function MessageList(props) {
  const id = useParams().id;
  const [room, setRoom] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    axiosInstance.get(`/messages/${id}`).then((response) => {
      setRoom(response.data);
      scrollToBottom();
    });

    websocket.on(`chat:${id}`, (data) => {
      setRoom((currentRoom) => ({
        ...currentRoom,
        ...{ messages: [...currentRoom.messages, data] },
      }));
      websocket.emit(`chat:${room._id}`);
      scrollToBottom();
    });
    return () => {
      websocket.off(`chat:${id}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const renderMessages = () => {
    let timestamp;

    const output = room.messages?.map((message, index) => {
      let config = {
        timer: 0,
        isToday: false,
      };
      if (timestamp) {
        config.timer = moment(message.date).diff(timestamp, "minutes");
      } else {
        config.timer = 100;
      }
      timestamp = moment(message.date);

      return <Message key={index} {...message} {...config} />;
    });
    return output;
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
        }}
      >
        {renderMessages()}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
