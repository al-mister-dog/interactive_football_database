import { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import NotLoggedInTabs from "./UserTabs/NotLoggedInTabs";
import LoggedInTab from "./UserTabs/LoggedInTab";
import SearchBar from "./UserTabs/SearchBar";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Collapse from "@material-ui/core/Collapse";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { hasChildren } from "../../menuUtils";
import { useGlobalContext } from "../../context";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "@media (max-width: 780px)": {
      flexDirection: "column",
      justifyContent: "center",
      margin: 0,
      padding: 0,
    },
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    margin: "0.6em",
    "@media (max-width: 780px)": {
      margin: "4.5em",
    },
  },
  tab: {
    fontWeight: 700,
    minWidth: "125px",
    "@media (max-width: 780px)": {
      minWidth: "50px",
      minHeight: "25px",
      fontSize: ".8rem",
    },
  },
  gerneralTabs: {
    "@media (max-width: 780px)": {
      minWidth: "50px",
      fontSize: ".8rem",
      margin: 0,
      padding: 0
    },
  },
  userTabs: {
    margin: "0",
    padding: "0",
  },
}));

export default function Nav() {
  const classes = useStyles();
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    menuTabs,
    user,
    getRandomUserTable,
    loggedIn,
  } = useGlobalContext();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleDrawer = (open, index) => (event) => {
    if (index >= 0) {
      setSelectedIndex(index);
    }
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsSidebarOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      {menuTabs[selectedIndex].items.map((item, index) => {
        return (
          <MenuItem
            key={index}
            item={item}
            menuTitle={menuTabs[selectedIndex].menuTitle}
          />
        );
      })}
    </Box>
  );

  return (
    <>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={getRandomUserTable}
          >
            <Typography variant="h4">Footybase</Typography>
          </Link>
          <Tabs
            className={classes.generalTabs}
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
          >
            {menuTabs.map((tab, index) => {
              const { menuTitle } = tab;
              return (
                <Tab
                  key={index}
                  className={classes.tab}
                  label={menuTitle}
                  onClick={toggleDrawer(true, index)}
                />
              );
            })}
          </Tabs>
          <div className={classes.userTabs}>
            {loggedIn ? <LoggedInTab {...user} /> : <NotLoggedInTabs />}
          </div>
          <SearchBar />
        </Toolbar>
        <Drawer
          anchor="right"
          open={isSidebarOpen}
          onClose={toggleDrawer(false)}
        >
          {list()}
        </Drawer>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </>
  );
}

const MenuItem = ({ item, menuTitle }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} menuTitle={menuTitle} />;
};

const SingleLevel = ({ item, menuTitle }) => {
  const { setIsSidebarOpen, resetTableStyles, handleMenuItem } =
    useGlobalContext();
  const { title, id, url, stat } = item;

  const handleListItem = () => {
    setIsSidebarOpen(false);
    resetTableStyles();
    handleMenuItem(menuTitle, title, id, url, stat);
  };
  const handleLeagueItem = () => {
    setIsSidebarOpen(false);
    resetTableStyles();
  };
  if (menuTitle === "League Tables") {
    return (
      <Link
        to={`/leagues/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ListItem button>
          <ListItemText primary={title} onClick={() => handleLeagueItem()} />
        </ListItem>
      </Link>
    );
  }
  return (
    <Link to="/table" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItem button>
        <ListItemText primary={title} onClick={() => handleListItem()} />
      </ListItem>
    </Link>
  );
};

const MultiLevel = ({ item, menuTitle }) => {
  const { items: children } = item;
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={item.title} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map((child, key) => {
            return (
              <MenuItem
                key={key}
                item={child}
                menuTitle={menuTitle}
                style={{ fontSize: "0.8rem" }}
              />
            );
          })}
        </List>
      </Collapse>
    </>
  );
};
