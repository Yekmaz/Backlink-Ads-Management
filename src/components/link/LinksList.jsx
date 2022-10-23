import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  TableFooter,
  TablePagination,
  Checkbox,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import TrashIcon from "@mui/icons-material/Delete";
import PenIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import TablePaginationActions from "../formelement/TablePaginationActions";

export default function LinksList({ links, handleDelete, handleEdit }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - links.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    links.length > 0 && (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box
          borderRadius={16}
          sx={{
            m: 1,
            backgroundColor: "#EEE",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 950 }} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">URL address</TableCell>
                  <TableCell align="center">Enabled</TableCell>
                  <TableCell align="center">Created at</TableCell>
                  <TableCell align="center">Last edited at</TableCell>
                  <TableCell align="center">Operations</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? links.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : links
                ).map((item) => (
                  <TableRow
                    key={item._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {item.title}
                    </TableCell>
                    <TableCell align="center" sx={{ width: "20rem" }}>
                      {item.url.length > 30
                        ? "..." + item.url.slice(0, 30)
                        : item.url}
                    </TableCell>
                    <TableCell align="center" sx={{ width: "3rem" }}>
                      <Checkbox checked={item.enabled} />
                    </TableCell>
                    <TableCell align="center" sx={{ width: "11rem" }}>
                      {new Intl.DateTimeFormat("default", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      }).format(Date.parse(item.createDate))}
                    </TableCell>
                    <TableCell align="center" sx={{ width: "11rem" }}>
                      {new Intl.DateTimeFormat("default", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      }).format(Date.parse(item.lastEditDate))}
                    </TableCell>
                    <TableCell align="center" sx={{ width: "6rem" }}>
                      <Stack direction="row">
                        <IconButton
                          onClick={() =>
                            handleEdit(
                              item._id,
                              item.title,
                              item.url,
                              item.enabled
                            )
                          }
                          color="primary"
                        >
                          <PenIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(item._id)}
                          color="error"
                        >
                          <TrashIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 69 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={3}
                    count={links.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    )
  );
}
