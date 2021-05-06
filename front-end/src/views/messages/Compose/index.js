import { CButton, CCol, CInput, CRow } from "@coreui/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axiosInstance from "src/plugins/axios";
import Modify from "../Forms/Modify";
import Upload from "../Forms/Upload";

export default function Compose(props) {
  const id = useParams().id;
  const { control, handleSubmit } = useForm();

  function onSubmit(data) {
    axiosInstance.post(`messages/${id}`, data);
  }

  if (id)
    return (
      <CRow>
        <CCol sm="2">
          <Modify />
        </CCol>
        <CCol sm="2">
          <Upload />
        </CCol>
        <CCol sm="8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", padding: "10px" }}
          >
            <Controller
              name="message"
              control={control}
              render={({ field: { onChange } }) => (
                <CInput
                  placeholder="Type a Message"
                  onChange={onChange}
                  required
                />
              )}
            />
            <CButton color="primary" type={"submit"}>
              Send
            </CButton>
          </form>
        </CCol>
      </CRow>
    );
  else return "";
}
