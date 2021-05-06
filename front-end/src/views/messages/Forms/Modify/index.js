import React, { useEffect, useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import axiosInstance from "src/plugins/axios";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import { useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Upload(props) {
  const classes = useStyles();
  const id = useParams().id;
  const room = useSelector(
    (state) => state.message.filter((item) => item._id === id)[0]
  );
  const [users, setUsers] = useState([]);

  const { control, handleSubmit, setValue } = useForm();
  const [modal, setModal] = useState(false);

  function onSubmit(data) {
    axiosInstance.patch(`/messages/${id}`, data);
  }

  useEffect(() => {
    setValue("title", "test");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  useEffect(() => {
    axiosInstance.get("messages/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", padding: "10px" }}
      className={classes.root}
    >
      <CButton color="primary" block onClick={() => setModal(true)}>
        Modify Room
      </CButton>
      <CModal show={modal} onClose={setModal}>
        <CModalHeader>Update Room</CModalHeader>
        <CModalBody>
          <Controller
            name="title"
            control={control}
            render={({ field: { onChange } }) => (
              <TextField
                label={"Change Title Here"}
                variant="outlined"
                type="string"
                onChange={onChange}
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
                placeholder={"Select names to join"}
                selectedValues={room.users}
                onSelect={(list) => onChange(list)}
                onRemove={(list) => onChange(list)}
              />
            )}
          />
        </CModalBody>
        <CModalFooter>
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
                onClick={() => setModal(false)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item sm={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </CModalFooter>
      </CModal>
    </form>
  );
}
