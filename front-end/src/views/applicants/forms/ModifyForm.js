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
import { remove, update } from "src/store/actions/applicantAction";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

function Content({ user }) {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const classes = useStyles();

  const onSubmit = (data) => {
    axiosInstance
      .patch(`/recruitments/applicants/${user._id}`, data)
      .then((response) => {
        dispatch(update(response.data));
        alert("Application Updated Succesfully");
      })
      .catch(() => {
        alert("Cannot Update Application");
      });
  };

  const onDeleteForm = () => {
    axiosInstance
      .delete(`/recruitments/applicants/${user._id}`)
      .then((_response) => {
        dispatch(remove(user._id));
        alert("Application Deleted Successfully");
      })
      .catch(() => {
        alert("Unable to delete account");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
      <CModalHeader>
        <CModalTitle>Update Application</CModalTitle>
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
              disabled
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
              disabled
            />
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              onChange={(e, v) => onChange(v)}
              options={[
                "New Applicant",
                "Screening",
                "Interviewing",
                "Negotiating",
                "Hired",
              ]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  type="text"
                  onChange={(e) => onChange(e.target.value)}
                  label={value ? "New Status" : user.status || "New Status"}
                />
              )}
            />
          )}
        />
        <Controller
          name="remark"
          control={control}
          freeSolo
          render={({ field: { onChange, value } }) => (
            <TextField
              label={"Write a Remark"}
              variant="outlined"
              type="string"
              fullWidth
              onChange={onChange}
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
              Delete Application
            </Button>
          </Grid>
          <Grid item sm={3}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Update Application
            </Button>
          </Grid>
        </Grid>
      </CModalFooter>
    </form>
  );
}

export default Content;
