import * as React from "react";
import { useState } from "react";
import { useGlobalContext } from "../../context";

import { makeStyles } from "@material-ui/core/styles";
import { Modal, Box } from "@material-ui/core";
import {
  FormControl,
  TextField,
  Button,
  Tooltip,
  Typography,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    boxShadow: 24,
    padding: "10px",
    borderRadius: "10px",
  },
  formControl: {
    display: "flex",
    flexDirection: "column",
  },
  btn: {
    backgroundColor: theme.palette.primary,
  },
}));

export default function ModalSave() {
  const classes = useStyles();
  const { addTablesToStatMenu, user, currentQuery, setTableTitle } = useGlobalContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorTitleMessage, setErrorTitleMessage] = useState("");
  const [errorDescription, setErrorDescription] = useState(false);
  const [errorDescriptionMessage, setErrorDescriptionMessage] = useState("");
  const handleModalOpen = () => {
    setIsError(false);
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setIsError(false);
    setMsg("");
    setTitle("");
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const checkFields = () => {
    if (!title) {
      setErrorTitle(true);
      setErrorTitleMessage("Please enter this field");
    }
    if (!description) {
      setErrorDescription(true);
      setErrorDescriptionMessage("Please enter this field");
    }
    if (title && description) {
      saveUserTable(title);
      setTitle("");
      setTableTitle(`${title}: saved`)
    }
  };
  const onAddUserTable = () => {
    checkFields();
  };

  async function saveUserTable() {
    const url = currentQuery;
    const userId = user.id;
    const token = localStorage.getItem("token");

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: url,
        userId: userId,
        title: title,
        description: description,
        token: token,
      }),
    };
    const response = await fetch(
      "/api/users/save-user-table",
      options
    );
    const data = await response.json();
    if (data.error) {
      setMsg(data.msg);
      setIsError(true);
    } else {
      setModalOpen(false);
      addTablesToStatMenu(user.id);
    }
  }

  return (
    <div>
      <Tooltip title="add to My Tables">
        <IconButton onClick={handleModalOpen}>
          <SaveIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <FormControl variant="standard" className={classes.formControl}>
            <TextField
              required
              error={errorTitle && true}
              helperText={errorTitleMessage}
              id="outlined-required"
              label="Title"
              value={title}
              onChange={handleTitleChange}
            />
            <TextField
              required
              error={errorDescription && true}
              helperText={errorDescriptionMessage}
              id="outlined-required"
              label="Description"
              value={description}
              onChange={handleDescriptionChange}
            />
            <Button
              type="submit"
              color="primary"
              disabled={isError}
              onClick={onAddUserTable}
            >
              add table
            </Button>
          </FormControl>
          <Typography color="error">{msg}</Typography>
        </Box>
      </Modal>
    </div>
  );
}
