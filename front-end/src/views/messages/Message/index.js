import React from "react";
import moment from "moment";
import "./Message.css";
import { useSelector } from "react-redux";
import axiosInstance from "src/plugins/axios";
import fileDownload from "js-file-download";

export default function Message(props) {
  const user = useSelector((state) => state.auth);
  const { sender, date, text, timer, isDocument, document } = props;

  const downloadFile = ({ name, directory }) => {
    axiosInstance.get(directory).then((response) => {
      fileDownload(response.data, name + ".pdf");
    });
  };
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
          {isDocument ? (
            <div
              className="bubble-file"
              title={moment(date).format("MMMM D, YYYY HH:mm")}
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => downloadFile(document)}
            >
              <h3>{document.name}</h3>
              <sup>Click to Download</sup>
            </div>
          ) : (
            <div
              className="bubble"
              title={moment(date).format("MMMM D, YYYY HH:mm")}
            >
              {text}
            </div>
          )}
        </div>
      ) : (
        <div className="timestamp">{text}</div>
      )}
    </div>
  );
}
