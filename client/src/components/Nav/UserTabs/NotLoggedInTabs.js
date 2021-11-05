import * as React from "react";
import { useState } from "react";
import { useGlobalContext } from "../../../context";

import { makeStyles } from "@material-ui/core/styles";
import { Modal, Box, TextField, Button, Typography } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

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
  modalLogin: {
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
  box: {
    display: "flex",
    flexDirection: "column",
  },
  notLoggedInTabs: {
    margin: 0,
    minWidth: '100px',
    '@media (max-width: 780px)' : {
      padding: 0,
      minWidth: '50px',
      minHeight: '20px',
      fontSize: '.8rem',
    }
  },
  notLoggedInTab: {
    margin: 0,
    minWidth: '100px',
    '@media (max-width: 780px)' : {
      minWidth: '50px',
      minHeight: '20px',
      fontSize: '.8rem',
    }
  },
  textFields: {
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
  const { setLoggedIn, setUser, addTablesToStatMenu, getProfilePic } =
    useGlobalContext();

  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [name, setName] = useState("");
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

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [value, setValue] = useState(0);
  const [signedUp, setSignedUp] = useState(false);

  const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const validPassword = /^(?=.*[a-z])(?=.*\d).*$/;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSignupModalOpen = () => {
    setSignupModalOpen(true);
  };
  const handleSignupModalClose = () => {
    setSignupModalOpen(false);
    setSignedUp(false);
    setMsg("");
    setName("");
    setEmail("");
    setPassword("");
    setPasswordRepeat("");
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
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
      console.log("match");
      setErrorPasswordRepeat(false);
      setErrorPasswordRepeatMessage("");
    }
  };

  const onClickSignup = () => {
    checkFields();
  };
  const checkFields = () => {
    if (!name) {
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
    if (name && email && password && passwordRepeat) {
      submitUserInfo();
    }
  };
  const submitUserInfo = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: name,
        email: email,
        password: password,
      }),
    };
    const response = await fetch(
      "/api/auth/signup",
      options
    );

    const data = await response.json();
    handleResponse(data);
  };
  const [msg, setMsg] = useState("");
  const handleResponse = (data) => {
    if (data.success) {
      setSignedUp(true);
      setMsg("signed up! check email to activate");
    } else {
      setMsg(data[0].msg);
    }
  };

  const handleLoginModalOpen = () => {
    setLoginModalOpen(true);
  };
  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
    setLoginEmail("");
    setLoginPassword("");
  };

  const handleChangeLoginEmail = (event) => {
    setLoginEmail(event.target.value);
  };
  const handleChangeLoginPassword = (event) => {
    setLoginPassword(event.target.value);
  };

  const handleKeypressSignup = (e) => {
    if (e.code === "Enter") {
      onClickSignup();
    }
  };
  const handleKeypressLogin = (e) => {
    if (e.code === "Enter") {
      onClickLogin();
    }
  };
  const onClickLogin = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    };
    const response = await fetch(
      "/api/auth/login",
      options
    );
    const data = await response.json();

    if (data.error) {
      setLoginMessage(data.msg);
    } else {
      const token = data.token;
      localStorage.setItem("token", JSON.stringify(token));
      addTablesToStatMenu(data.id);
      getProfilePic(data.id);
      setUser(data);
      setLoginModalOpen(false);
      setLoggedIn(true);
    }
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange} className={classes.notLoggedInTabs} indicatorColor="primary">
        <Tab className={classes.notLoggedInTab} label="signup" onClick={handleSignupModalOpen} />
        <Tab className={classes.notLoggedInTab} label="login" onClick={handleLoginModalOpen} />
      </Tabs>
      <Modal
        open={signupModalOpen}
        onClose={handleSignupModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          className={classes.modal}
          noValidate
          autoComplete="off"
        >
          <div className={classes.textFields}>
            <TextField
              required
              error={errorName && true}
              helperText={errorNameMessage}
              id="outlined-required"
              label="Name"
              value={name}
              onKeyPress={handleKeypressSignup}
              onChange={handleChangeName}
            />
            <TextField
              required
              error={errorEmail && true}
              helperText={errorEmailMessage}
              id="outlined-required"
              label="Email"
              value={email}
              onKeyPress={handleKeypressSignup}
              onChange={handleChangeEmail}
            />
            <TextField
              required
              error={errorPassword && true}
              helperText={errorPasswordMessage}
              id="outlined-password-repeat-input"
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
              id="outlined-password-repeat-input"
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
              <Button
                onClick={handleSignupModalClose}
                className={classes.btnSuccess}
              >
                Close
              </Button>
            ) : (
              <Button
                disabled={
                  errorName ||
                  errorEmail ||
                  errorPassword ||
                  errorPasswordRepeat
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
      <Modal
        open={loginModalOpen}
        onClose={handleLoginModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          className={classes.modalLogin}
          noValidate
          autoComplete="off"
        >
          <div className={classes.textFields}>
            <TextField
              label="Email"
              value={loginEmail}
              onKeyPress={handleKeypressLogin}
              onChange={handleChangeLoginEmail}
            />
            <TextField
              label="Password"
              type="password"
              autoComplete="current-password"
              value={loginPassword}
              onKeyPress={handleKeypressLogin}
              onChange={handleChangeLoginPassword}
            />
          </div>
          <div className={classes.submit} style={{ flexGrow: 1 }}>
            <Typography
              variant="subtitle2"
              style={{ textAlign: "center" }}
              color="error"
            >
              {loginMessage}
            </Typography>
            <Button className={classes.btn} onClick={onClickLogin}>
              Log In!
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
