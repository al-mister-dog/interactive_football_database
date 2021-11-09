import { useState, useEffect, useRef } from "react";
import {
  IconButton,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";

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
    backgroundColor: "white",
    boxShadow: 24,
    padding: "10px",
    borderRadius: "10px",
  },
  interestsTitle: {
    display: "flex",
    alignItems: "flex-start",
  },
}));

export default function EditInterests({ id, user, interests, getInterests }) {
  const classes = useStyles();
  const [textFieldOpen, setTextFieldOpen] = useState(false);
  const [interestsValue, setInterestsValue] = useState("");
  const [errorInterests, setErrorInterests] = useState(false);
  const [errorInterestsMessage, setErrorInterestsMessage] = useState("");
  const node = useRef();

  const handleTextFieldOpen = () => {
    setTextFieldOpen(true);
  };
  const handleTextFieldClose = () => {
    setTextFieldOpen(false);
  };
  const handleInterestsChange = (event) => {
    setInterestsValue(event.target.value);
    if (event.target.value.length > 5) {
      setErrorInterests(true);
      setErrorInterestsMessage('must be less than 255 characters')
    } else {
      setErrorInterests(false);
      setErrorInterestsMessage('')
    }
  };
  const handleInterestsKeyPress = (event) => {
    if (event.code === "Enter") {
      setTextFieldOpen(false);
      onAddInterests();
    }
  };
  const onAddInterests = () => {
    handleTextFieldClose();
    addInterests();
  };

  const addInterests = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: user.id,
        text: interestsValue,
      }),
    };
    const response = await fetch(
      "https://footy-app-server-test.herokuapp.com/api/social/interests",
      options
    );
    const data = await response.json();
    // if (data.success) {
    //   getInterests()
    //   console.log('on add interest' + data)
    // } else {
    //   console.log('something went wrong')
    // }
  };

  const handleClickTextField = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setTextFieldOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickTextField);

    return () => {
      document.removeEventListener("mousedown", handleClickTextField);
    };
  }, []);
  
  return (
    <>
      <div className={classes.infoCard}>
        <div className={classes.interestsTitle}>
          <Typography variant="body1">I'm interested in...</Typography>
          {user.id === id && (
            <>
              {!textFieldOpen && (
                <IconButton onClick={handleTextFieldOpen}>
                  <EditIcon />
                </IconButton>
              )}
            </>
          )}
        </div>
        <div ref={node}>
        {textFieldOpen ? (
          <FormControl variant="standard" className={classes.formControl}>
            <TextField
              required
              error={errorInterests && true}
              helperText={errorInterestsMessage}
              id="outlined-required"
              value={interestsValue}
              onKeyPress={handleInterestsKeyPress}
              onChange={handleInterestsChange}
            />
            <Button
              // type="submit"
              color="primary"
              disabled={errorInterests}
              onClick={onAddInterests}
            >
              add interests
            </Button>
          </FormControl>
        ) : (
          <Typography variant="body1">{interests}</Typography>
        )}
        </div>

      </div>
    </>
  );
}
