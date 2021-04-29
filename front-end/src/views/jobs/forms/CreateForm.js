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
