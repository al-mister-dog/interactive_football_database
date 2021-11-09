import { useState } from "react";
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
  const [interestsValue, setInterestsValue] = useState("")
  const handleTextFieldOpen = () => {
    setTextFieldOpen(true);
  };
  const handleTextFieldClose = () => {
    setTextFieldOpen(false);
  };
  const handleInterestsChange = (event) => {
    setInterestsValue(event.target.value);
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
    if (data.success) {
      getInterests()
    } else {
      console.log('something went wrong')
      //HANDLE ERROR
    }
    
  };
  
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
        {textFieldOpen ? (
          <FormControl variant="standard" className={classes.formControl}>
            <TextField
              // required
              // error={errorDescription && true}
              // helperText={errorDescriptionMessage}
              // id="outlined-required"
              // label="Description"
              value={interestsValue}
              onKeyPress={handleInterestsKeyPress}
              onChange={handleInterestsChange}
            />
            <Button
              // type="submit"
              // color="primary"
              // disabled={isError}
              onClick={onAddInterests}
            >
              add interests
            </Button>
          </FormControl>
        ) : (
          <Typography variant="body1">{interests}</Typography>
        )}
      </div>
    </>
  );
}