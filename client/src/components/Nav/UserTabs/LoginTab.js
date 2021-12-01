import * as React from "react";
import { useState } from "react";
import { useGlobalContext } from "../../../context";
import { makeStyles } from "@material-ui/core/styles";
import {
  Tab,
  Modal,
  Box,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";

import api from "../../../api"
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
    width: 350,
    height: 250,
    backgroundColor: "white",
    boxShadow: 24,
    padding: 4,
    borderRadius: "10px",
  },
  tab: {
    margin: 0,
    minWidth: "100px",
    "@media (max-width: 780px)": {
      minWidth: "50px",
      minHeight: "20px",
      fontSize: ".8rem",
    },
  },
  textField: {
    paddingTop: "10px",
    display: "flex",
    width: "15rem",
    flexDirection: "column",
  },
  submit: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#c0ca33",
  },
}));

export default function LoginTab() {
  const classes = useStyles();
  const { setLoggedIn, setUser, addTablesToStatMenu, getProfilePic } =
    useGlobalContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  // const validPassword = /^(?=.*[a-z])(?=.*\d).*$/;

  const handleLoginModalOpen = () => {
    setModalOpen(true);
  };
  const handleLoginModalClose = () => {
    setModalOpen(false);
    setEmail("");
    setPassword("");
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    validateLogin();
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    validateLogin();
  };

  const validateLogin = () => {
    if (validEmail.test(email) && password.length > 4) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleKeypressLogin = (e) => {
    if (e.code === "Enter") {
      onClickLogin();
    }
  };

  const onClickLogin = async () => {
    try {
      // const response = await login({ email, password });
      const response = await api.login({ email, password });
      const data = await response.json();
      if (response.status === 401) {
        setMessage(data.message);
        setIsDisabled(true);
        return;
      } else {
        handleLoginSuccess(data);
      }
    } catch (error) {
      setMessage("there was a problem with the server. please try again later");
      setIsDisabled(true);
    }
  };

  const handleLoginSuccess = (data) => {
    const token = data.token;
    localStorage.setItem("token", JSON.stringify(token));
    addTablesToStatMenu(data.id);
    getProfilePic(data.id);
    setUser(data);
    setModalOpen(false);
    setLoggedIn(true);
  };

  return (
    <>
      <Tab
        className={classes.tab}
        label="login"
        onClick={handleLoginModalOpen}
      />

      <Modal
        open={modalOpen}
        onClose={handleLoginModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          className={classes.modal}
          noValidate
          autoComplete="off"
        >
          <div className={classes.textField}>
            <TextField
              id="email"
              label="Email"
              value={email}
              onKeyPress={handleKeypressLogin}
              onChange={handleChangeEmail}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onKeyPress={handleKeypressLogin}
              onChange={handleChangePassword}
            />
          </div>
          <div className={classes.submit} style={{ flexGrow: 1 }}>
            <Typography
              variant="subtitle2"
              style={{ textAlign: "center" }}
              color="error"
            >
              {message}
            </Typography>
            <Button
              className={classes.btn}
              disabled={isDisabled}
              onClick={onClickLogin}
            >
              Log In!
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
