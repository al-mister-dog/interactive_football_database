import * as React from "react";
import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import SignupTab from "./SignupTab";
import LoginTab from "./LoginTab";

const useStyles = makeStyles((theme) => ({
  notLoggedInTabs: {
    margin: 0,
    minWidth: "100px",
    "@media (max-width: 780px)": {
      padding: 0,
      minWidth: "50px",
      minHeight: "20px",
      fontSize: ".8rem",
    },
  },
}));

export default function ModalSave() {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.notLoggedInTabs}
        indicatorColor="primary"
      >
        <SignupTab />
        <LoginTab />
      </Tabs>
    </div>
  );
}
