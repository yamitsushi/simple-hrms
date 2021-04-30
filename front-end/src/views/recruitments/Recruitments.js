import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "src/plugins/axios";
import { makeStyles } from "@material-ui/core/styles";
import { purge, set } from "src/store/actions/jobAction";
import { TextField, Grid } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Table from "./Table";

const gridStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

function Recruitments() {
  const gridClasses = gridStyles();
  const dispatch = useDispatch();
  const select = useSelector((state) => state.job);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(purge());
    axiosInstance.get("/recruitments").then((response) => {
      dispatch(set(response.data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const departments = ["Active", "Closed"];

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
      </Grid>
      <Table table={filtered} />
    </>
  );
}

export default Recruitments;
