import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, FormGroup, Button } from "@material-ui/core";
import axiosInstance from "src/plugins/axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

const Setting = () => {
  const { control, handleSubmit } = useForm();
  const classes = useStyles();

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
            <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
              <CCardHeader>Change Password</CCardHeader>
              <CCardBody>
                <Controller
                  name="old_password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      label="Old Password"
                      variant="outlined"
                      type="password"
                      fullWidth
                      {...field}
                      required
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      label="Password"
                      variant="outlined"
                      type="password"
                      fullWidth
                      {...field}
                      required
                    />
                  )}
                />
                <Controller
                  name="confirm_password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      label="Confirm Password"
                      variant="outlined"
                      type="password"
                      fullWidth
                      {...field}
                      required
                    />
                  )}
                />
              </CCardBody>
              <CCardFooter>
                <Button variant="contained" color="primary" type="submit">
                  Change Password
                </Button>
              </CCardFooter>
            </form>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Setting;
