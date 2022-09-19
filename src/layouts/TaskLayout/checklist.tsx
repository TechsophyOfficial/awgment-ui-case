import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import DoneIcon from "@mui/icons-material/Done";
import {
  getChecklistItemInstanceById,
  completeChecklistItemInstances,
} from "../../services/checklistService";
import { Box, Paper, Toolbar, Button } from "@mui/material";
import DataTable from "../../components/DataTable";
import {
  CHECKLIST_ITEM_INSTANCE,
} from "../../constants/endpoints";
import AppConfig from "src/appConfig";

const MyChecklists = ({ selectedTask }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      height: "100%",
      width: "100%",
      position: "relative",
    },
    sidebar: {
      backgroundColor: "white",
      width: 275,
      height: "100%",
      overflowX: "hidden",
      overflowY: "scroll",
      "&::-webkit-scrollbar": {
        width: "6px",
        display: "block",
      },
      "&::-webkit-scrollbar-thumb": {
        // @ts-ignore
        backgroundColor: theme?.palette?.primary.main,
      },
    },
    content: {
      flexGrow: 1,
      width: `calc(100% - 275px)`,
      backgroundColor: "#e4e4f0",
    },
    pageContent: {
      margin: 1.5,
      padding: 3,
    },
    toolbarWrapper: {
      padding: "0px",
    },
    actionButton: {
      position: "absolute",
      left: "0px",
      marginLeft: "10px",
    },
  }));

  const classes = useStyles();
  const [checklistItemIntances, setChecklistItemIntances] = useState([]);
  const [selectedChecklistItems, setSelectedChecklistItems] = useState([]);
  const appData:any = useContext(AppConfig);

  const fetchChecklistItemInstanceById = async () => {
    const { checklistInstanceId } = selectedTask;
    if (checklistInstanceId) {
      const CHECKLIST_ITEM_INSTANCE_ENDPOINT = `${appData.apiGatewayUrl}${CHECKLIST_ITEM_INSTANCE}`;
      const { success, data } = await getChecklistItemInstanceById(
        CHECKLIST_ITEM_INSTANCE_ENDPOINT,
        checklistInstanceId
      );
      if (success && data) {
        const completedItems = data.data.filter(({ isCompleted }) => {
          return isCompleted;
        });
        const completedItemsId = completedItems.map(({ id: itemId }) => {
          return itemId;
        });
        setSelectedChecklistItems(completedItemsId);
        const formattedData = data.data.map(
          ({ id: itemId, item, createdBy, createdOn, isCompleted }) => {
            return {
              id: itemId,
              createdBy,
              createdOn,
              name: item.name,
              isCompleted,
              description: item.description,
            };
          }
        );
        setChecklistItemIntances(formattedData);
      } // Add error
    } else {
      setSelectedChecklistItems([]);
      setChecklistItemIntances([]);
      // Show no case instance id error
    }
  };

  const isRowCompleted = (item) => {
    return item?.isCompleted ? true : false;
  };

  useEffect(() => {
    fetchChecklistItemInstanceById();
    // eslint-disable-next-line
  }, [selectedTask]);

  const onCompleteChecklistItemInstances = async () => {
    const CHECKLIST_ITEM_INSTANCE_ENDPOINT = `${appData.apiGatewayUrl}${CHECKLIST_ITEM_INSTANCE}`;
    const { success } = await completeChecklistItemInstances(CHECKLIST_ITEM_INSTANCE_ENDPOINT, {
      idList: selectedChecklistItems,
    });
    if (success) {
      alert("success");
    } else {
      alert("error");
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Paper className={classes.pageContent} elevation={3}>
          <Toolbar className={classes.toolbarWrapper}>
            {checklistItemIntances.length ? (
              <Button
                variant="outlined"
                // disabled={activeChecklistIntance.isCompleted}
                startIcon={<DoneIcon />}
                className={classes.actionButton}
                onClick={onCompleteChecklistItemInstances}
              >
                Complete
              </Button>
            ) : (
              <Box></Box>
            )}
          </Toolbar>
          {checklistItemIntances.length ? (
            <DataTable
              tableData={checklistItemIntances}
              emptyTableText="No Checklist Group found"
              selectedList={selectedChecklistItems}
              isRowDisabled={(item) => isRowCompleted(item)}
              updateSelectedList={(data) => setSelectedChecklistItems(data)}
            />
          ) : (
            <Box fontWeight="fontWeightMedium" m={1}>
              No Checklist Item Instance found
            </Box>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default MyChecklists;
