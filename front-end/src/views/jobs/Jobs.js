import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "src/plugins/axios";
import { makeStyles } from "@material-ui/core/styles";
import { purge, set } from "src/store/actions/jobAction";
import { TextField, Grid, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Table from "./Table";
import { useHistory } from "react-router";

const gridStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

function Jobs() {
  const gridClasses = gridStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const select = useSelector((state) => state.job);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(purge());
    axiosInstance.get("/jobs").then((response) => {
      dispatch(set(response.data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const departments = ["Active", "Closed", "Disabled"];

  const openCreate = () => {
    history.push("/jobs/create");
  };

  const filtered = filter ? select.filter((e) => e.status === filter) : select;

  return (
    <>
      <Grid
        className={gridClasses.root}
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item md={3} sm={6} xs={12}>
          <Autocomplete
            className={gridClasses.paper}
            onChange={(e, v) => setFilter(v)}
            options={departments}
            renderInput={(params) => (
              <TextField
                {...params}
                type="text"
                onChange={(e) => setFilter(e.target.value)}
                label="Choose Status"
              />
            )}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Button
            className={gridClasses.paper}
            variant="contained"
            color="primary"
            onClick={openCreate}
            fullWidth
          >
            Post New Job
          </Button>
        </Grid>
      </Grid>
      <Table table={filtered} />
    </>
  );
}

export default Jobs;
