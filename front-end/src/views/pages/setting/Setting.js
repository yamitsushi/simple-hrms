import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "src/plugins/axios";

const Setting = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    axiosInstance
      .post("/change-password", data)
      .then((response) => {
        alert("Password Changed Succesfully");
      })
      .catch((err) => {
        alert("Change Password Failed");
      });
  };
  return (
    <>
      <CRow>
        <CCol xs="12" sm="6">
          <CCard>
            <CCardHeader>Change Password</CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit(onSubmit)}>
                <CRow>
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel htmlFor="old_password">Old Password</CLabel>
                      <CInput
                        {...register("old_password", { required: true })}
                        id="old_password"
                        type="password"
                        required
                      />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel htmlFor="password">New Password</CLabel>
                      <CInput
                        {...register("password", { required: true })}
                        id="password"
                        type="password"
                        required
                      />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel htmlFor="confirm_password">
                        Confirm Password
                      </CLabel>
                      <CInput
                        {...register("confirm_password", { required: true })}
                        id="confirm_password"
                        type="password"
                        required
                      />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12">
                    <CButton color="primary" type="submit">
                      Change Password
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Setting;
