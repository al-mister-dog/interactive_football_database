import * as React from "react";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import { makeStyles } from "@material-ui/core/styles";
import EditOptions from "../components/TableToolBars/EditOptions";
import UserOptions from "../components/TableToolBars/UserOptions";

import {
  Paper,
  Toolbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Avatar,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  table: {
    width: "60%",
    margin: "auto",
    "@media (max-width: 780px)": {
      width: "100%",
    },
  },
  container: {
    maxHeight: 440,
  },
  cell: {
    minWidth: "10px",
    maxWidth: "100px",
  },
  cellRow: {
    "&:hover": {
      background: theme.palette.active.primary,
      cursor: "pointer",
    },
  },
  cellColumn: {
    "&:hover": {
      background: theme.palette.active.secondary,
      cursor: "pointer",
    },
  },
  selectedCell: {
    background: theme.palette.active.primary,
  },
  sortedCell: {
    background: theme.palette.active.secondary,
  },
  sticky: {
    position: "sticky",
    left: 0,
    background: "white",
    zIndex: 4,
  },
  stickyColumn: {
    position: "sticky",
    left: 0,
    background: "white",
    zIndex: 5,
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    boxShadow: 24,
    padding: 4,
  },
  toolbarImage: {
    width: "25px",
  },
}));

export default function StickyHeadTable() {
  const classes = useStyles();
  const {
    tableData,
    fields,
    teamId,
    filter,
    sortByField,
    sortFilteredResults,
    direction,
    setDirection,
    fieldValuePairs,
    setFieldValuePairs,
    tableIsFiltered,
    selectedIndexes,
    sortedIndex,
    currentSelectedIndex,
    customFunc,
    setCustomFunc,
    reset,
    setSelectedIndexes,
    setCurrentSelectedIndex,
    setTableIsFiltered,
    setSortedIndex,
    tableTitle,
    setTableTitle,
    toolbarType,
    toolbarImage,
    setToolbarImage,
    setToolbarType,
  } = useGlobalContext();

  const toolbarTypes = {
    canEdit: false,
    canAdd: false,
  };

  const [switchValue, setSwitchValue] = useState(false);
  const [filterManyChecked, setFilterManyChecked] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  function checkCellDisabled(val, i) {
    console.log(tableTitle)
    if (typeof tableTitle === 'object') {
      return true
    }
    if (tableTitle.includes('club info')) {
      return true;
    }
    if (fields.length === 2) {
      return true
    }
    if (fields[i] === "Name") {
      return true;
    }
    return false;
  }

  const onClickColumnCell = (val, i) => {
    const cellDisabled = checkCellDisabled(val, i);
    if (cellDisabled) {
      return;
    }
    setTableTitle("editing...");
    setToolbarImage("");
    setToolbarType(() => {
      const newToolbarType = { ...toolbarTypes, canEdit: true };
      return newToolbarType;
    });
    setCellsToStyle(i, "sorted");
    setDirection(!direction);
    sortFields(val);
  };

  const onClickRowCell = (val, i) => {
    const cellDisabled = checkCellDisabled(val, i);
    if (cellDisabled) {
      return;
    }
    setTableTitle("editing...");
    setToolbarImage("");
    setToolbarType(() => {
      const newToolbarType = { ...toolbarTypes, canEdit: true };
      return newToolbarType;
    });
    setTableIsFiltered(true);
    setCellsToStyle(i, "filtered");
    filterValues(val, i);
  };

  const setCellsToStyle = (i, selectedCustomFunc) => {
    setCustomFunc(selectedCustomFunc);
    setCurrentSelectedIndex(i);
    if (selectedCustomFunc === "sorted") {
      return;
    }
    filterManyChecked
      ? setSelectedIndexes((selectedIndexes) => {
          let newSelectedIndexes = [...selectedIndexes, i];
          console.log(newSelectedIndexes);
          return newSelectedIndexes;
        })
      : setSelectedIndexes(() => {
          let newSelectedIndexes = [i];
          return newSelectedIndexes;
        });
  };

  const sortFields = (selectedField) => {
    if (tableIsFiltered) {
      sortFilteredResults(selectedField, teamId);
    } else {
      sortByField(selectedField, teamId);
    }
  };

  const filterValues = (val, i) => {
    let fieldValuePair = { field: fields[i], value: val };
    if (filterManyChecked) {
      setFieldValuePairs([...fieldValuePairs, fieldValuePair]);
      filter([...fieldValuePairs, fieldValuePair], teamId);
    } else {
      setFieldValuePairs([fieldValuePair]);
      filter([fieldValuePair], teamId);
    }
  };

  const handleSwitchChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSwitchChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSwitchChangeFilterMany = () => {
    setTableTitle("editing...");
    setToolbarType(() => {
      const newToolbarType = { ...toolbarTypes, canEdit: true };
      return newToolbarType;
    });
    setSwitchValue(!switchValue);
    setFilterManyChecked(!filterManyChecked);
    reset();
  };

  useEffect(() => {
    function setStyles() {
      if (customFunc === "filtered") {
        setSortedIndex(null);
      }
      if (customFunc === "sorted") {
        setSortedIndex(currentSelectedIndex);
      }
    }
    setStyles();
  }, [customFunc, currentSelectedIndex]);

  return (
    <Paper className={classes.table}>
      <Toolbar style={{ display: "flex", flexDirection: "row-reverse" }}>
        {toolbarType.canEdit && (
          <EditOptions
            handleSwitchChangeFilterMany={handleSwitchChangeFilterMany}
            switchValue={switchValue}
          />
        )}
        {toolbarType.canAdd && <UserOptions />}
        <Typography variant="h6" style={{ flexGrow: 2, textAlign: "center" }}>
          {tableTitle}
        </Typography>
        {toolbarImage ? (
          <Avatar src={toolbarImage} alt={tableTitle} /> //alt="toolbar image"
        ) : (
          <span style={{ fontSize: "2rem" }}>⚽</span>
        )}
      </Toolbar>

      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {fields.map((field, i) => {
                return (
                  <TableCell
                    key={i}
                    className={`${classes.cell} ${classes.cellColumn} ${
                      i === 0 && classes.stickyColumn
                    }`}
                    onClick={() => onClickColumnCell(field, i)}
                  >
                    {field}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((obj, i) => {
                let arr = Object.values(obj);
                return (
                  <TableRow key={i}>
                    {arr.map((val, i) => {
                      return (
                        <TableCell
                          key={i}
                          className={`${classes.cell} ${classes.cellRow} ${
                            selectedIndexes.includes(i) && classes.selectedCell
                          } ${sortedIndex === i && classes.sortedCell} ${
                            i === 0 && classes.sticky
                          }`}
                          onClick={() => onClickRowCell(val, i)}
                        >
                          {val}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {tableData.length > 10 &&
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleSwitchChangePage}
        onRowsPerPageChange={handleSwitchChangeRowsPerPage}
      />}
    </Paper>
  );
}
