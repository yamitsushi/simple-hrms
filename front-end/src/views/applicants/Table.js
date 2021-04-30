import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  TableFooter,
  TablePagination,
} from "@material-ui/core";
import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  KeyboardArrowRight,
  KeyboardArrowLeft,
} from "@material-ui/icons";
import fileDownload from "js-file-download";
import axiosInstance from "src/plugins/axios";
import { CModal } from "@coreui/react";
import ModifyForm from "./forms/ModifyForm";

const paginateStyle = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = paginateStyle();

  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {<FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {<KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {<KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {<LastPageIcon />}
      </IconButton>
    </div>
  );
}

const Listing = ({ table }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [modify, setModify] = useState(false);
  const [user, setUser] = useState({});

  const openSelected = (item) => {
    setUser(item);
    setModify(true);
  };

  let handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  let handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const downloadResume = ({ name, bio }) => {
    axiosInstance.get(bio).then((response) => {
      fileDownload(response.data, name + ".pdf");
    });
  };
  return (
    <>
      <CModal show={modify} onClose={() => setModify(false)} color="info">
        <ModifyForm user={user} />
      </CModal>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Remark</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? table.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : table
            ).map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.remark}</TableCell>
                <TableCell width="300">
                  <Button
                    variant="contained"
                    color="default"
                    onClick={() => downloadResume(item)}
                  >
                    BIO
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => openSelected(item)}
                  >
                    Modify
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={table.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default Listing;
