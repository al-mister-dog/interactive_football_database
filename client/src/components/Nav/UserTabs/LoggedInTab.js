import { useState } from "react";
import { Menu, MenuItem, Chip, Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../context";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  chip: {
    marginTop: 7,
    '@media (max-width: 780px)' : {
      marginTop: 0
    }
  }
}))
export default function LoggedInTab() {
  const classes = useStyles()
  const { user, setUser, setMenu, setLoggedIn, profilePic, reset } = useGlobalContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  function onLogout() {
    removeToken()
    setMenu(null);
    setLoggedIn(false);
    setUser({
      id: null,
      username: "",
    });
    reset()
    handleClose();
  }

  async function removeToken() {
    const token = JSON.parse(localStorage.getItem("token"));
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token
      }),
    };
    const response = await fetch(
      "https://footy-app-server-test.herokuapp.com/api/auth/token/remove-token",
      options
    );
    const data = response.json();
    console.log(data)
    localStorage.removeItem("token");
  }

  return (
    <>
      <Chip
        className={classes.chip}
        avatar={<Avatar alt={user.username} src={profilePic} />}
        label={user.username}
        size="medium"
        color="secondary"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Link
          to={`/user/${user.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Link to="/table" style={{ textDecoration: "none", color: "inherit" }}>
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </Link>
      </Menu>
    </>
  );
}
