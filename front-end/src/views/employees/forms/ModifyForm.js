import {
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { makeStyles } from "@material-ui/core/styles";
import { Controller, useForm } from "react-hook-form";
import { TextField, Grid, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import axiosInstance from "src/plugins/axios";
import { useDispatch } from "react-redux";
import { remove, update } from "src/store/actions/employeeAction";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

function Content({ departments, positions, user }) {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const classes = useStyles();

  const onSubmit = (data) => {
    axiosInstance
      .patch(`/staffs/${user._id}`, data)
      .then((response) => {
        dispatch(update(response.data));
        alert("Account Updated Succesfully");
      })
      .catch(() => {
        alert("Cannot Update Account");
      });
  };

  const onDeleteForm = () => {
    axiosInstance
      .delete(`/staffs/${user._id}`)
      .then((_response) => {
        dispatch(remove(user._id));
        alert("Account Deleted Successfully");
      })
      .catch(() => {
        alert("Unable to delete account");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
      <CModalHeader>
        <CModalTitle>Update Employee</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              label={value ? "Full Name" : user.name || "Full Name"}
              variant="outlined"
              type="string"
              onChange={onChange}
              fullWidth
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              label={
                value ? "New Email Address" : user.email || "New Email Address"
              }
              variant="outlined"
              type="string"
              onChange={onChange}
              fullWidth
            />
          )}
        />
        <Controller
          name="department"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              onChange={(e, v) => onChange(v)}
              options={departments}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  type="text"
                  onChange={(e) => onChange(e.target.value)}
                  label={
                    value
                      ? "New Department"
                      : user.department || "New Department"
                  }
                />
              )}
            />
          )}
        />
        <Controller
          name="position"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              onChange={(e, v) => onChange(v)}
              options={positions}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  type="text"
                  onChange={(e) => onChange(e.target.value)}
                  label={
                    value ? "New Position" : user.position || "New Position"
                  }
                />
              )}
            />
          )}
        />
        <Controller
          name="username"
          control={control}
          freeSolo
          render={({ field: { onChange, value } }) => (
            <TextField
              label={value ? "New Username" : user.username || "New Username"}
              variant="outlined"
              type="string"
              fullWidth
              onChange={onChange}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              {...field}
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
              onClick={onDeleteForm}
            >
              Delete Account
            </Button>
          </Grid>
          <Grid item sm={3}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Update Account
            </Button>
          </Grid>
        </Grid>
      </CModalFooter>
    </form>
  );
}

export default Content;
