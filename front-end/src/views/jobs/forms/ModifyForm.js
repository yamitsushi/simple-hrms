import { CCard, CCardBody, CCardFooter } from "@coreui/react";
import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  Grid,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RichTextEditor, {
  getTextAlignClassName,
  getTextAlignStyles,
  getTextAlignBlockMetadata,
} from "react-rte";
import { useHistory, useParams } from "react-router";
import axiosInstance from "src/plugins/axios";
import { useEffect } from "react";
import toolbarConfig from "./toolbarConfig";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

const ModifyForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const { control, handleSubmit, setValue } = useForm();

  const onSubmit = (data) => {
    const payload = {
      title: data.title,
      description: data.description.toString("html", {
        blockStyleFn: getTextAlignStyles,
      }),
      status: data.status,
    };
    axiosInstance
      .patch(`/jobs/${id}`, payload)
      .then(() => {
        alert("Job Updated Successfully");
        history.goBack();
      })
      .catch(() => {
        alert("Posting Failed");
      });
  };

  useEffect(() => {
    axiosInstance
      .get(`jobs/${id}`)
      .then(({ data }) => {
        setValue("title", data.title);
        setValue("status", data.status);
        axiosInstance
          .get(data.description)
          .then(({ data }) => {
            setValue(
              "description",
              RichTextEditor.createValueFromString(data, "html", {
                customBlockFn: getTextAlignBlockMetadata,
              })
            );
          })
          .catch(() => alert("Failed"));
      })
      .catch(() => alert("Failed"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CCard>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
        <CCardBody>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={12} sm={6} lg={3}>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    label={"Job Title"}
                    variant="outlined"
                    type="string"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Controller
                name="status"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="status-label">Current Status</InputLabel>
                    <Select
                      labelId="status-label"
                      variant="outlined"
                      {...field}
                    >
                      <MenuItem value={"Active"}>Active</MenuItem>
                      <MenuItem value={"Closed"}>Closed</MenuItem>
                      <MenuItem value={"Disabled"}>Disabled</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
          <Controller
            name="description"
            control={control}
            defaultValue={RichTextEditor.createEmptyValue()}
            render={({ field }) => (
              <RichTextEditor
                blockStyleFn={getTextAlignClassName}
                toolbarConfig={toolbarConfig}
                {...field}
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
                Update Job
              </Button>
            </Grid>
          </Grid>
        </CCardFooter>
      </form>
    </CCard>
  );
};

export default ModifyForm;
