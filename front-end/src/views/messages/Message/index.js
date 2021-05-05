import React from "react";
import moment from "moment";
import "./Message.css";
import { useSelector } from "react-redux";

export default function Message(props) {
  const user = useSelector((state) => state.auth);
  const { _id, sender, date, text, timer } = props;

  if (sender)
    return (
      <div className={`message ${sender._id === user.id ? "mine" : ""}`}>
        {timer ? (
          <div className="timestamp">
            {moment(date).format("MMMM D, YYYY HH:mm")}
          </div>
        ) : (
          ""
        )}
        <div className="bubble-container">
          <div
            className="bubble"
            title={moment(date).format("MMMM D, YYYY HH:mm")}
          >
            {text}
          </div>
        </div>
      </div>
    );
  return (
    <div className="message">
      {timer ? (
        <div className="timestamp">
          {moment(date).format("MMMM D, YYYY HH:mm")}
        </div>
      ) : (
        ""
      )}
      <div className="timestamp">{text}</div>
    </div>
  );
}
