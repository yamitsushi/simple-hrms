import React, { useState } from "react";
import {
  CButton,
  CCol,
  CFormGroup,
  CInput,
  CInputFile,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { Controller, useForm } from "react-hook-form";
import axiosInstance from "src/plugins/axios";
import { useParams } from "react-router";

export default function Upload() {
  const id = useParams().id;
  const { control, handleSubmit } = useForm();
  const [modal, setModal] = useState(false);

  function onSubmit(data) {
    const form = new FormData();

    form.append("name", data.name);
    form.append("document", data.document);

    axiosInstance
      .post(`/messages/${id}/file`, form, {
        headers: { "content-Type": "multipart/form-data" },
        contentType: false,
        processData: false,
      })
      .then(() => {});
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", padding: "10px" }}
    >
      <CButton color="primary" block onClick={() => setModal(true)}>
        Upload File
      </CButton>
      <CModal show={modal} onClose={setModal}>
        <CModalHeader>
          <CModalTitle>Upload Document</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="name-input">File Name</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field: { onChange } }) => (
                  <CInput
                    id="name-input"
                    placeholder="What would you like to name the file"
                    required
                    onChange={onChange}
                  />
                )}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row encType="multipart/form-data">
            <CLabel col md="3" htmlFor="file-input">
              Document
            </CLabel>
            <CCol xs="12" md="9">
              <Controller
                name="document"
                control={control}
                render={({ field: { onChange } }) => (
                  <CInputFile
                    id="file-input"
                    name="file-input"
                    accept={"application/pdf"}
                    required
                    onChange={(e) => onChange(e.target.files[0])}
                  />
                )}
              />
            </CCol>
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModal(false)}>
            Cancel
          </CButton>
          <CButton color="primary" type="submit">
            Upload
          </CButton>
        </CModalFooter>
      </CModal>
    </form>
  );
}
