/* eslint-disable react/prop-types */
import React from "react";
import { useTable, usePagination } from "react-table";
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Pagination,
  PaginationItem,
  Stack,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useApp } from "../../context/AppContext";

const Table = ({ data, columns, onEdit, onDelete, count, onPageChange }) => {
  const columnData = React.useMemo(() => columns, [columns]);
  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
      {
        columns: columnData,
        data,
        initialState: { pageIndex: 0 },
        manualPagination: true,
        pageCount: count,
      },
      usePagination
    );

  const { setOpenModal } = useApp();

  return (
    <TableContainer sx={{ padding: "20px" }}>
      {data?.length > 0 ? (
        <>
          <MUITable {...getTableProps()}>
            <TableHead>
              {headerGroups?.map((headerGroup) => (
                <TableRow
                  {...headerGroup?.getHeaderGroupProps()}
                  key={headerGroup.id}
                >
                  {headerGroup.headers?.map((column) => (
                    <TableCell
                      sx={{ fontWeight: "bold" }}
                      {...column.getHeaderProps()}
                      key={column.id}
                    >
                      {column.render("Header")}
                    </TableCell>
                  ))}
                  <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {page?.map((row, idx) => {
                prepareRow(row);
                return (
                  <TableRow
                    sx={{
                      backgroundColor: idx % 2 === 0 ? "#f8f8f8" : "white",
                    }}
                    {...row.getRowProps()}
                    key={row.id}
                  >
                    {row?.cells?.map((cell) => (
                      <TableCell {...cell.getCellProps()} key={cell.id}>
                        {cell.render("Cell")}
                      </TableCell>
                    ))}
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          onEdit(row.original);
                          setOpenModal(true);
                        }}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => onDelete(row.original._id)}
                        variant="contained"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </MUITable>
          <Stack alignItems="center" m={1}>
            <Pagination
              color="primary"
              sx={{
                width: "100%",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
              }}
              count={count}
              onChange={(e, page) => onPageChange(page)}
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                />
              )}
            />
          </Stack>
        </>
      ) : (
        <p>No data</p>
      )}
    </TableContainer>
  );
};

export default Table;
