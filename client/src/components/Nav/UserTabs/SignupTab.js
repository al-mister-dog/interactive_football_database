import * as React from "react";
import { useState } from "react";
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
    height: 350,
    backgroundColor: "white",
    boxShadow: 24,
    padding: 4,
    borderRadius: "10px",
  },
  box: {
    display: "flex",
    flexDirection: "column",
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
  btnSuccess: {
    backgroundColor: "#ffb300",
  },
}));

export default function ModalSave() {
  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [errorNameMessage, setErrorNameMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailMessage, setErrorEmailMessage] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState(
    "Please include number"
  );
  const [errorPasswordRepeat, setErrorPasswordRepeat] = useState(false);
  const [errorPasswordRepeatMessage, setErrorPasswordRepeatMessage] =
    useState("");

  const [signedUp, setSignedUp] = useState(false);
  const [signingUp, setSigningUp] = useState(false)
  const [msg, setMsg] = useState("");

  const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const validPassword = /^(?=.*[a-z])(?=.*\d).*$/;

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setSignedUp(false);
    setMsg("");
    setUsername("");
    setEmail("");
    setPassword("");
    setPasswordRepeat("");
  };

  const handleChangeName = (event) => {
    setUsername(event.target.value);
    setErrorName(false);
    setErrorNameMessage("");
    if (event.target.value.length < 3) {
      setErrorName(true);
      setErrorNameMessage("Must be at least 3 characters");
    } else {
      setErrorName(false);
      setErrorNameMessage("");
    }
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    setErrorEmail(false);
    setErrorEmailMessage("");
    if (!validEmail.test(event.target.value)) {
      setErrorEmail(true);
      setErrorEmailMessage("Must be valid email");
    } else {
      setErrorEmail(false);
      setErrorEmailMessage("");
    }
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    setErrorPassword(false);
    setErrorPasswordMessage("");
    if (!validPassword.test(event.target.value)) {
      setErrorPassword(true);
      setErrorPasswordMessage("must include number");
    } else if (event.target.value.length < 6) {
      setErrorPassword(true);
      setErrorPasswordMessage("must be at least 6 characters");
    } else {
      setErrorPassword(false);
      setErrorPasswordMessage("");
    }
  };
  const handleChangePasswordRepeat = (event) => {
    setPasswordRepeat(event.target.value);
    setErrorPasswordRepeat(false);
    setErrorPasswordRepeatMessage("");
    if (event.target.value !== password) {
      setErrorPasswordRepeat(true);
      setErrorPasswordRepeatMessage("passwords must match");
    } else {
      setErrorPasswordRepeat(false);
      setErrorPasswordRepeatMessage("");
    }
  };

  const onClickSignup = () => {
    checkFields();
  };
  const checkFields = () => {
    if (!username) {
      setErrorName(true);
      setErrorNameMessage("Please enter this field");
    }
    if (!email) {
      setErrorEmail(true);
      setErrorEmailMessage("Please enter this field");
    }
    if (!password) {
      setErrorPassword(true);
      setErrorPasswordMessage("Please enter this field");
    }
    if (!passwordRepeat) {
      setErrorPasswordRepeat(true);
      setErrorPasswordRepeatMessage("Please enter this field");
    }
    if (username && email && password && passwordRepeat) {
      submitUserInfo();
    }
  };
  const submitUserInfo = async () => {
    try {
      setSigningUp(true)
      const response = await api.signup({username, email, password});
      const data = await response.json();
      if (response.status === 502) {
        setMsg(data.message);
        return;
      } else if (data.success) {
        setMsg("signed up! check email to activate");
        setSignedUp(true);
        setSigningUp(false)
      }
    } catch (error) {
      setMsg("there was an error. please try again later")
    }
  };

  const handleKeypressSignup = (e) => {
    if (e.code === "Enter") {
      onClickSignup();
    }
  };

  return (
    <>
      <Tab className={classes.tab} label="signup" onClick={handleModalOpen} />
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
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
              required
              error={errorName && true}
              helperText={errorNameMessage}
              id="username"
              label="Name"
              value={username}
              onKeyPress={handleKeypressSignup}
              onChange={handleChangeName}
            />
            <TextField
              required
              error={errorEmail && true}
              helperText={errorEmailMessage}
              id="email"
              label="Email"
              value={email}
              onKeyPress={handleKeypressSignup}
              onChange={handleChangeEmail}
            />
            <TextField
              required
              error={errorPassword && true}
              helperText={errorPasswordMessage}
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onKeyPress={handleKeypressSignup}
              onChange={handleChangePassword}
            />
            <TextField
              required
              error={errorPasswordRepeat && true}
              helperText={errorPasswordRepeatMessage}
              id="password-repeat"
              label="Retype Password"
              type="password"
              value={passwordRepeat}
              onKeyPress={handleKeypressSignup}
              onChange={handleChangePasswordRepeat}
            />
          </div>
          <div className={classes.submit} style={{ flexGrow: 1 }}>
            <Typography
              variant="subtitle2"
              style={{ textAlign: "center" }}
              color={`${signedUp ? "success" : "error"}`}
            >
              {msg}
            </Typography>
            {signedUp ? (
              <Button onClick={handleModalClose} className={classes.btnSuccess}>
                Close
              </Button>
            ) : (
              <Button
                disabled={
                  errorName ||
                  errorEmail ||
                  errorPassword ||
                  errorPasswordRepeat ||
                  signingUp
                    ? true
                    : false
                }
                className={classes.btn}
                onClick={onClickSignup}
              >
                Sign Up!
              </Button>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
}
