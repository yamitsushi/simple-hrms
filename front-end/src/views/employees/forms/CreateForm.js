import {
  CButton,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { makeStyles } from "@material-ui/core/styles";
import { Controller, useForm } from "react-hook-form";
import { TextField, Grid } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import axiosInstance from "src/plugins/axios";
import { useDispatch } from "react-redux";
import { add } from "src/store/actions/employeeAction";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

function Content({ departments, positions }) {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const classes = useStyles();

  const onSubmit = (data) => {
    axiosInstance
      .post("/staffs", data)
      .then((response) => {
        dispatch(add(response.data));
        alert("Account Created Succesfully");
      })
      .catch(() => {
        alert("Unable to create new account");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
      <CModalHeader>
        <CModalTitle>Add New Employee</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Full Name"
              variant="outlined"
              type="string"
              fullWidth
              {...field}
              required
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Email Address"
              variant="outlined"
              type="string"
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name="department"
          control={control}
          render={({ field: { onChange } }) => (
            <Autocomplete
              onChange={(e, v) => onChange(v)}
              options={departments}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  type="text"
                  onChange={(e) => onChange(e.target.value)}
                  label="Choose Department"
                  required
                />
              )}
            />
          )}
        />
        <Controller
          name="position"
          control={control}
          render={({ field: { onChange } }) => (
            <Autocomplete
              onChange={(e, v) => onChange(v)}
              options={positions}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  type="text"
                  onChange={(e) => onChange(e.target.value)}
                  label="Choose Position"
                  required
                />
              )}
            />
          )}
        />
        <Controller
          name="username"
          control={control}
          defaultValue=""
          freeSolo
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
      </CModalBody>
      <CModalFooter>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item sm={3}>
            <CButton color="primary" type="submit">
              Create Account
            </CButton>
          </Grid>
        </Grid>
      </CModalFooter>
    </form>
  );
}

export default Content;
