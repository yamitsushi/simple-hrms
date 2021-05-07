import React, { useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TableFooter,
  TablePagination,
} from "@material-ui/core";
import fileDownload from "js-file-download";
import axiosInstance from "src/plugins/axios";
import { CModal } from "@coreui/react";
import ModifyForm from "./forms/ModifyForm";
import TablePaginationActions from "src/components/table/TablePaginationActions";

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
      fileDownload(response.data, `${name}.pdf`);
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
