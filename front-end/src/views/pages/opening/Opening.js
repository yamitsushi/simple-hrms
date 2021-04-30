import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CInput,
  CInputFile,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CWidgetProgressIcon,
} from "@coreui/react";
import axiosInstance from "src/plugins/axios";
import { Controller, useForm } from "react-hook-form";
import { sanitize } from "dompurify";

const Opening = () => {
  const [jobs, setJobs] = useState([]);
  const [modal, setModal] = useState(false);
  const [highlight, setHighlight] = useState({});
  const { control, handleSubmit } = useForm();

  useEffect(() => {
    axiosInstance
      .get("/openings")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((err) => alert("Error Found"));
  }, []);

  const handleEvent = ({ _id, title, description }) => {
    axiosInstance.get(description).then((response) => {
      setHighlight({
        id: _id,
        title: title,
        description: response.data,
      });
      setModal(true);
    });
  };

  const submitForm = (data) => {
    const form = new FormData();

    form.append("name", data.name);
    form.append("email", data.email);
    form.append("bio", data.bio);

    axiosInstance
      .post("/openings/" + highlight.id, form, {
        headers: { "content-Type": "multipart/form-data" },
        contentType: false,
        processData: false,
      })
      .then(() => {
        alert("Resume Submitted");
      })
      .catch(() => {
        alert("Error while sending");
      });
  };

  return (
    <main className="c-main">
      <CContainer fluid>
        <CCard>
          <CCardHeader>List of all Available Jobs</CCardHeader>
          <CCardBody>
            <CFormGroup row>
              {jobs.map((job, index) => (
                <CCol xs="12" sm="6" md="3" key={index}>
                  <CWidgetProgressIcon
                    header={job.title}
                    color="gradient-info"
                    inverse
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEvent(job)}
                  ></CWidgetProgressIcon>
                </CCol>
              ))}
            </CFormGroup>
          </CCardBody>
        </CCard>

        <CModal
          show={modal}
          onClose={() => setModal(false)}
          color="info"
          size="lg"
        >
          <CForm onSubmit={handleSubmit(submitForm)}>
            <CModalHeader>
              <CModalTitle>{highlight.title}</CModalTitle>
            </CModalHeader>
            <CModalBody>
              {
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitize(highlight.description),
                  }}
                />
              }
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="name-input">Full Name</CLabel>
                </CCol>
                <CCol xs="12" md="10">
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange } }) => (
                      <CInput
                        id="name-input"
                        placeholder="Please Enter Full Name"
                        required
                        onChange={onChange}
                      />
                    )}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="email-input">Email</CLabel>
                </CCol>
                <CCol xs="12" md="10">
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange } }) => (
                      <CInput
                        type="email"
                        id="email-input"
                        placeholder="Please enter your email"
                        autoComplete="email"
                        required
                        onChange={onChange}
                      />
                    )}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row encType="multipart/form-data">
                <CLabel col md="2" htmlFor="file-input">
                  BIO
                </CLabel>
                <CCol xs="12" md="10">
                  <Controller
                    name="bio"
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
              <CButton type="submit" size="lg" color="primary">
                Submit Resume
              </CButton>
            </CModalFooter>
          </CForm>
        </CModal>
      </CContainer>
    </main>
  );
};

export default Opening;
