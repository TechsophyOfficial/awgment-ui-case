import React from "react";
import {
  Paper,
  createStyles,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Checkbox,
} from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import useDataTable from "../hooks/useDataTable";
import { DATA_TABLE_HEADERS } from "../constants/endpoints";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: useTheme().spacing(2),
  },
}));

const DataTable = ({
  tableData,
  selectedList,
  isRowDisabled,
  updateSelectedList,
  emptyTableText,
  tableHeaders = DATA_TABLE_HEADERS,
}) => {
  const classes = useStyles();

  const onAllRowSelect = (event) => {
    if (event.target.checked) {
      const newSelecteds = tableData.map((row) => row.id);
      updateSelectedList(newSelecteds);
      return;
    }
    updateSelectedList([]);
  };

  const { TblContainer, TblHead } = useDataTable(
    tableHeaders,
    tableData.length,
    selectedList.length,
    onAllRowSelect
  );

  const StyledTableRow = withStyles((theme) =>
    createStyles({
      selected: {
        backgroundColor: `#f6f6f6 !important`,
        "&:hover": {
          // backgroundColor: `#f8f9fa !important`,
        },
      },
    })
  )(TableRow);

  const isSelected = (id) => selectedList.indexOf(id) !== -1;
  const onRowSelect = (id) => {
    const selectedIndex = selectedList.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedList, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedList.slice(1));
    } else if (selectedIndex === selectedList.length - 1) {
      newSelected = newSelected.concat(selectedList.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedList.slice(0, selectedIndex),
        selectedList.slice(selectedIndex + 1)
      );
    }
    updateSelectedList(newSelected);
  };

  return (
    <Paper className={classes.pageContent}>
      {tableData.length ? (
        <TblContainer>
          <TblHead />
          <TableBody>
            {tableData.map((item, index) => {
              const { id } = item;
              const labelId = `enhanced-table-checkbox-${index}`;
              const isRowSelected = isSelected(id);
              const isRowDeactive = isRowDisabled ? isRowDisabled(item) : false;

              return (
                <StyledTableRow
                  key={id}
                  hover
                  onClick={() => !isRowDeactive && onRowSelect(id)}
                  role="checkbox"
                  selected={isRowSelected}
                  aria-checked={isRowSelected}
                  tabIndex={-1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isRowSelected}
                      disabled={isRowDeactive}
                      color="primary"
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </TableCell>
                  {DATA_TABLE_HEADERS.map((field) => (
                    <TableCell key={field.id}>{item[field.id]}</TableCell>
                  ))}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </TblContainer>
      ) : (
        <Box fontWeight="fontWeightMedium" m={1}>
          {emptyTableText || "No Record found"}
        </Box>
      )}
    </Paper>
  );
};

export default DataTable;
