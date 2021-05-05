import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import axiosInstance from "src/plugins/axios";
import { Multiselect } from "multiselect-react-dropdown";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Compose(props) {
  const classes = useStyles();
  const history = useHistory();
  const auth = useSelector((state) => state.auth.id);
  const { control, handleSubmit } = useForm();
  const [users, setUsers] = useState([]);
  const currentUser = users.filter((user) => user._id === auth);

  useEffect(() => {
    axiosInstance.get("messages/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  function onSubmit(data) {
    if (!data.users) data.users = currentUser;
    axiosInstance
      .post("/messages", data)
      .then((response) => {
        alert("Room Created");
        history.goBack();
      })
      .catch((err) => {
        alert("Failed to create Room");
      });
  }

  return (
    <CRow className="justify-content-center">
      <CCol md="6">
        <CCard>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
            <CCardHeader>Create new Chat Room</CCardHeader>
            <CCardBody>
              <Controller
                name="title"
                control={control}
                render={({ field: { onChange } }) => (
                  <TextField
                    label={"Chat Room Title"}
                    variant="outlined"
                    type="string"
                    onChange={onChange}
                    required
                  />
                )}
              />
              <Controller
                name="users"
                control={control}
                render={({ field: { onChange } }) => (
                  <Multiselect
                    options={users}
                    displayValue="name"
                    disablePreSelectedValues={true}
                    placeholder={"Select names to join"}
                    selectedValues={currentUser}
                    onSelect={(list) => onChange(list)}
                    onRemove={(list) => onChange(list)}
                  />
                )}
              />
            </CCardBody>
            <CCardFooter>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item sm={3}>
                  <Button
                    variant="contained"
                    color="default"
                    fullWidth
                    onClick={history.goBack}
                  >
                    Go Back
                  </Button>
                </Grid>
                <Grid item sm={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                  >
                    Create Chat Room
                  </Button>
                </Grid>
              </Grid>
            </CCardFooter>
          </form>
        </CCard>
      </CCol>
    </CRow>
  );
}
