import React from "react";
import moment from "moment";
import "./Message.css";
import { useSelector } from "react-redux";

export default function Message(props) {
  const user = useSelector((state) => state.auth);
  const { sender, date, text, timer } = props;
  return (
    <div
      className={`message ${
        sender ? (sender._id === user.id ? "mine" : "") : ""
      }`}
    >
      {timer > 10 ? (
        <div className="timestamp">
          {moment(date).format("MMMM D, YYYY HH:mm")}
        </div>
      ) : (
        ""
      )}

      {sender ? (
        <div className="bubble-container">
          <div
            className="bubble"
            title={moment(date).format("MMMM D, YYYY HH:mm")}
          >
            {text}
          </div>
        </div>
      ) : (
        <div className="timestamp">{text}</div>
      )}
    </div>
  );
}
