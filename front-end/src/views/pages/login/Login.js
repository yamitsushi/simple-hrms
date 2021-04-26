import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, FormGroup, Button } from "@material-ui/core";
import axiosInstance from "src/plugins/axios";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    axiosInstance
      .post("/login", data)
      .then((response) => {
        history.push("/dashboard");
      })
      .catch((err) => {
        alert("Authentication Failed");
      });
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="4">
            <CCardGroup>
              <CCard className="p-4">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className={classes.root}
                >
                  <CCardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <Controller
                      name="username"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          label="Username"
                          variant="outlined"
                          type="string"
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
                  </CCardBody>
                  <CCardFooter>
                    <Button variant="contained" color="primary" type="submit">
                      Login
                    </Button>
                  </CCardFooter>
                </form>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
