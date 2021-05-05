import { CButton, CInput } from "@coreui/react";
import { Button } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function Compose(props) {
  const id = useParams().id;
  const { control, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  if (id)
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", padding: "10px" }}
      >
        <Controller
          name="message"
          control={control}
          render={({ field: { onChange } }) => (
            <CInput placeholder="Type a Message" onChange={onChange} required />
          )}
        />
        <CButton type={"submit"}>Send</CButton>
        <CButton>Upload</CButton>
      </form>
    );
  else return "";
}
