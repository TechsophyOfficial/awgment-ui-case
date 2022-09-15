import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Table, TableHead, TableRow, TableCell } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  table: {
    "& thead th": {
      fontWeight: "600",
      color: "black", // add color here or add theme provider
      backgroundColor: "white",
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr": {
      backgroundColor: "white",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));

const useDataTable = (tableHeaders, rowCount, numSelected, onSelectAllRows) => {
  const classes = useStyles();

  const TblContainer = (props) => (
    <Table size="small" className={classes.table}>
      {props.children}
    </Table>
  );

  const TblHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            {/* <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllRows}
                        /> */}
          </TableCell>
          {tableHeaders.map((headCell) => (
            <TableCell key={headCell.id}>{headCell.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  return {
    TblContainer,
    TblHead,
  };
};

export default useDataTable;
