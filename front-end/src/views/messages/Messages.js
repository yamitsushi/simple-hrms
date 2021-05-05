import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import React from "react";
import Compose from "./Compose";
import ConversationList from "./ConversationList";
import MessageList from "./MessageList";
import { useParams } from "react-router-dom";

export default function Messenger(props) {
  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardBody
            style={{
              display: "grid",
              gridTemplateColumns: "auto",
              gridTemplateRows: "auto",
              height: "73vh",
            }}
          >
            <div
              style={{
                gridColumn: "1 / span 1",
                gridRow: "1 / span 2",
                overflowY: "scroll",
                position: "relative",
                minWidth: "150px",
              }}
            >
              <ConversationList />
            </div>

            <div
              style={{
                gridColumn: "2 / span 4",
                gridRow: "1 / span 2",
                overflowY: "scroll",
                position: "relative",
              }}
            >
              {useParams().id ? <MessageList /> : ""}
            </div>
            <div
              style={{
                gridColumn: "1 / span 5",
                gridRow: "3 / span 1",
                position: "relative",
              }}
            >
              <Compose />
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}
