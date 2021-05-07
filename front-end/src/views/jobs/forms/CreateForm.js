import { CCard, CCardBody, CCardFooter, CCardHeader } from "@coreui/react";
import { Controller, useForm } from "react-hook-form";
import { TextField, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RichTextEditor, {
  getTextAlignClassName,
  getTextAlignStyles,
} from "react-rte";
import { useHistory } from "react-router";
import axiosInstance from "src/plugins/axios";
import toolbarConfig from "./toolbarConfig";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

const CreateForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const payload = {
      title: data.title,
      description: data.description.toString("html", {
        blockStyleFn: getTextAlignStyles,
      }),
    };
    axiosInstance
      .post("/jobs", payload)
      .then(() => {
        alert("Job Posted Successfully");
        history.goBack();
      })
      .catch(() => {
        alert("Posting Failed");
      });
  };

  return (
    <>
      <CCard>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
          <CCardHeader>Create new Job Posting</CCardHeader>
          <CCardBody>
            <Controller
              name="title"
              control={control}
              render={({ field: { onChange } }) => (
                <TextField
                  label={"Job Title"}
                  variant="outlined"
                  type="string"
                  onChange={onChange}
                />
              )}
            />
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
                  Post Job
                </Button>
              </Grid>
            </Grid>
          </CCardFooter>
        </form>
      </CCard>
    </>
  );
};

export default CreateForm;
