import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Paper,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";

import ListIcon from "@material-ui/icons/List";
import SearchIcon from "@material-ui/icons/Search";

import { makeStyles } from "@material-ui/core/styles";
import { useGlobalContext } from "../../../context";

const useStyles = makeStyles((theme) => ({
  searchBar: {
    display: "flex",
    alignItems: "center",
    width: 230,
    height: 35,
    marginLeft: 30,
  },
  list: {
    position: "fixed",
    width: 230,
  },
  listItem: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      background: "rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
    },
  },
  hidden: {
    display: "none",
  },
}));

export default function SearchBar() {
  const classes = useStyles();
  const { user, filter, getTeamData, setTableTitle } = useGlobalContext();
  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const [menuItem, setMenuItem] = useState("players");
  const [open, setOpen] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const node = useRef();

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleClickMenuItem = (menuItem) => {
    setMenuItem(menuItem);
    handleCloseMenu();
  };

  const handleClickList = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };
  const handleClickListItem = async (item) => {
    setOpen(false);
    if (menuItem === "users") {
      setSearchValue("");
      return;
    } else if (menuItem === "players") {
      filter([{ field: "playerId", value: item.id }]);
      setTableTitle(item.name);
      setSearchValue("");
      console.log(searchValue)
    } else if (menuItem === "teams") {
      getTeamData(item.id);
      setTableTitle(item.name);
      setSearchValue("");
    }
  };

  const handleChangeSearch = async (e) => {
    setSearchValue(e.target.value);
    if (e.target.value === "") {
      setSearchList([]);
      setOpen(false);
    } else {
      setOpen(true);
      const response = await fetch(
        `/api/search/${menuItem}/?searchValue=${e.target.value}`
      );
      const data = await response.json();
      if (data.length === 0) {
        setOpen(false);
      }
      const searchList = data.map((dataItem) => {
        const item = {
          name: dataItem.Name || dataItem.teamName || dataItem.username,
          id: dataItem.playerId || dataItem.teamId || dataItem.id,
        };
        return item;
      });
      setSearchList(searchList);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickList);

    return () => {
      document.removeEventListener("mousedown", handleClickList);
    };
  }, []);
  return (
    <>
      <div>
        <Paper component="form" className={classes.searchBar}>
          <div>
            <IconButton
              id="basic-button"
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={handleClickMenu}
            >
              <ListIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleClickMenuItem("players")}>
                Players
              </MenuItem>
              <MenuItem onClick={() => handleClickMenuItem("teams")}>
                Teams
              </MenuItem>
              {user.id && (
                <MenuItem onClick={() => handleClickMenuItem("users")}>
                  Users
                </MenuItem>
              )}
            </Menu>
          </div>
          <InputBase
            value={searchValue}
            placeholder={`search ${menuItem}`}
            onChange={(e) => handleChangeSearch(e)}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Paper ref={node} className={classes.list}>
          {open && (
            <List>
              {searchList.map((item) => {
                return (
                  <Link
                    style={{ textDecoration: "none" }}
                    to={menuItem === "users" ? `/user/${item.id}` : `/table`}
                  >
                    <ListItem
                      className={classes.listItem}
                      key={item.id}
                      onClick={() => handleClickListItem(item)}
                    >
                      <Typography> {item.name}</Typography>
                    </ListItem>
                  </Link>
                );
              })}
            </List>
          )}
        </Paper>
      </div>
    </>
  );
}
