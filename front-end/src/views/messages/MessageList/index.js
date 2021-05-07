import React, { useEffect, useRef, useState } from "react";
import Toolbar from "../Toolbar";
import Message from "../Message";
import moment from "moment";
import axiosInstance from "src/plugins/axios";
import { useParams } from "react-router-dom";
import websocket from "src/plugins/socket.io";
import { useSelector } from "react-redux";

export default function MessageList(props) {
  const id = useParams().id;
  const title = useSelector(
    (state) => state.message.filter((state) => state._id === id)[0].title
  );
  const [room, setRoom] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    axiosInstance.get(`/messages/${id}`).then((response) => {
      setRoom(response.data);
      scrollToBottom();
    });
    console.log(room);

    websocket.on(`chat:${id}`, (data) => {
      setRoom((currentRoom) => ({
        ...currentRoom,
        ...{ messages: [...currentRoom.messages, data] },
      }));
      websocket.emit(`chat`, { room: id });
      scrollToBottom();
    });
    return () => {
      websocket.off(`chat:${id}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
      <Toolbar title={title} />

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
