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

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

const toolbarConfig = {
  display: [
    "INLINE_STYLE_BUTTONS",
    "BLOCK_STYLE_BUTTONS",
    "BLOCK_ALIGNMENT_BUTTONS",
    "BLOCK_TYPE_BUTTONS",
    "BLOCK_TYPE_DROPDOWN",
    "HISTORY_BUTTONS",
  ],
  INLINE_STYLE_BUTTONS: [
    { label: "Bold", style: "BOLD" },
    { label: "Italic", style: "ITALIC" },
    { label: "StrikeThrough", style: "STRIKETHROUGH" },
    { label: "Monospace", style: "CODE" },
    { label: "Underline", style: "UNDERLINE" },
  ],
  BLOCK_ALIGNMENT_BUTTONS: [
    { label: "Align Left", style: "ALIGN_LEFT" },
    { label: "Align Center", style: "ALIGN_CENTER" },
    { label: "Align Right", style: "ALIGN_RIGHT" },
    { label: "Align Justify", style: "ALIGN_JUSTIFY" },
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
    { label: "Blockquote", style: "blockquote" },
  ],
  BLOCK_TYPE_DROPDOWN: [
    { label: "Normal", style: "unstyled" },
    { label: "Heading Large", style: "header-one" },
    { label: "Heading Medium", style: "header-two" },
    { label: "Heading Small", style: "header-three" },
  ],
};

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
      .patch("/jobs/" + id, payload)
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
      .get("jobs/" + id)
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
    <>
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
    </>
  );
};

export default ModifyForm;
