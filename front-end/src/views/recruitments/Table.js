import React from "react";
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
import { useHistory } from "react-router";
import TablePaginationActions from "src/components/table/TablePaginationActions";

const Listing = ({ table }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const history = useHistory();

  const openSelected = (item) => {
    history.push(`/recruitments/${item._id}`);
  };

  let handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  let handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
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
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="default"
                    onClick={() => openSelected(item)}
                  >
                    Select
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
