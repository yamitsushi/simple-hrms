import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "src/plugins/axios";
import { makeStyles } from "@material-ui/core/styles";
import { purge, set } from "src/store/actions/employeeAction";
import { TextField, Grid, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { CModal } from "@coreui/react";
import Table from "./Table";
import CreateForm from "./forms/CreateForm";

const gridStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

function Employees() {
  const gridClasses = gridStyles();
  const dispatch = useDispatch();
  const select = useSelector((state) => state.employee);
  const [filter, setFilter] = useState("");
  const [create, setCreate] = useState(false);

  useEffect(() => {
    dispatch(purge());
    axiosInstance.get(`/staffs`).then((response) => {
      dispatch(set(response.data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => select[1], [select]);
  const departments = [...new Set(select.map((item) => item.department))];
  const positions = [...new Set(select.map((item) => item.position))];

  const filtered = filter
    ? select.filter((e) => e.department === filter)
    : select;

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
                label="Choose Department"
              />
            )}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Button
            className={gridClasses.paper}
            variant="contained"
            color="primary"
            onClick={() => setCreate(true)}
            fullWidth
          >
            Add New Employee
          </Button>

          <CModal show={create} onClose={() => setCreate(false)} color="info">
            <CreateForm departments={departments} positions={positions} />
          </CModal>
        </Grid>
      </Grid>
      <Table table={filtered} departments={departments} positions={positions} />
    </>
  );
}

export default Employees;
