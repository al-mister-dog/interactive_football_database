//TODOS
//organise context page
//look for overlapping functions
//try to separate concerns

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { tabs } from "./data/menuData";
const AppContext = React.createContext();
const host = "https://footy-app-server-test.herokuapp.com/";
const menuTabs = tabs;
const toolbarTypes = {
  canEdit: false,
  canAdd: false,
};
function createStringQuery(selected) {
  const queryArray = [];
  for (let i = 0; i < selected.length; i++) {
    const field = `field=${selected[i].field}`;
    queryArray.push(field);
    const value = `value=${selected[i].value}`;
    queryArray.push(value);
  }
  const query = queryArray.join("&");
  return query;
}

const AppProvider = ({ children }) => {
  //USER STATE
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    id: null,
    username: "",
  });
  const [users, setUsers] = useState();
  const [userTable, setUserTable] = useState({});
  const [profilePic, setProfilePic] = useState("");
  const [favouriteTeams, setFavouriteTeams] = useState([]);

  //TABLE STATE
  const [toolbarType, setToolbarType] = useState(toolbarTypes);
  const [tableData, setTableData] = useState([{}]);
  const [fields, setFields] = useState(Object.keys(tableData[0]));
  const [teamId, setTeamId] = useState("");
  const [fieldValuePairs, setFieldValuePairs] = useState([]);
  const [direction, setDirection] = useState(false);
  const [tableIsFiltered, setTableIsFiltered] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [sortedIndex, setSortedIndex] = useState(null);
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState(null);
  const [customFunc, setCustomFunc] = useState("");
  const [currentQuery, setCurrentQuery] = useState("");
  const [tableTitle, setTableTitle] = useState("loading...");
  const [lastTableTitle, setLastTableTitle] = useState("");
  const [toolbarImage, setToolbarImage] = useState("");

  //UI STATE
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //TABLE FUNCTIONS
  const getPlayerData = () => {
    const id = "";
    const string = `/api/table/get-data/?id=${id}`;
    setTableTitle("All Players");
    setToolbarImage("");
    getTableData(string);
    setToolbarType(() => {
      const newToolbarType = { ...toolbarTypes, canEdit: true };
      return newToolbarType;
    });
  };

  const getTeamData = (id, teamName) => {
    const string = `/api/table/get-data/?id=${id}`;
    getTableData(string);
    setTeamId(id);
    if (teamName) {
      setTableTitle(`${teamName}: players`);
      setLastTableTitle(`${teamName}: players`);
    } else {
      setTableTitle(lastTableTitle);
    }

    setToolbarType(() => {
      const newToolbarType = { ...toolbarTypes, canEdit: true };
      return newToolbarType;
    });
  };

  const getTeamPageData = async (id) => {
    const string = `/api/table/get-team-page-data/${id}`;
    getTableData(string);
    setTeamId(id);
    setToolbarType(toolbarTypes);
    getTeamLogo(id);
  };

  const getAllTeams = async () => {
    const string = `/api/table/get-all-teams`;
    setTableTitle("All Teams");
    getTableData(string);
    setToolbarType(toolbarTypes);
    setToolbarImage("");
  };

  const getTeamLogo = async (id) => {
    const response = await fetch(
      `https://footy-app-server-test.herokuapp.com/api/table/team-logo/?id=${id}`
    );
    const data = await response.json();
    const teamLogo = data[0].imageUrl;
    setToolbarImage(teamLogo);
  };

  const getStat = async (stat, title) => {
    const string = `/api/table/get-prepared-stat/?stat=${stat}`;
    getTableData(string);
    setTableTitle(title);
    setToolbarType(toolbarTypes);
    setToolbarImage("");
  };

  const filter = async (selected) => {
    let filterQuery = createStringQuery(selected);
    const string = `/api/table/filter/?${filterQuery}&id=${teamId}`;
    getTableData(string);
    setCurrentQuery(string);
  };

  const sortByField = async (selectedField) => {
    const string = `/api/table/sort/?field=${selectedField}&direction=${direction}&id=${teamId}`;
    getTableData(string);
    setCurrentQuery(string);
  };

  const sortFilteredResults = async (selectedField) => {
    let filterQuery = createStringQuery(fieldValuePairs);
    const string = `/api/table/sort-filtered/?direction=${direction}&id=${teamId}&${filterQuery}&fieldToOrderBy=${selectedField}`;
    getTableData(string);
    setCurrentQuery(string);
  };

  const getTableData = async (string) => {
    const response = await fetch(
      `https://footy-app-server-test.herokuapp.com${string}`
    );
    const data = await response.json();
    setTable(data);
  };

  const setTable = (data) => {
    setTableData(data);
    setFields(Object.keys(data[0]));
  };

  const reset = () => {
    setFieldValuePairs([]);
    setDirection(false);
    setSortedIndex(null);
    setCurrentSelectedIndex(null);
    setCustomFunc("");
    setSelectedIndexes([]);
    setTableIsFiltered(false);
    teamId ? getTeamData(teamId) : getPlayerData();
  };

  const resetExceptFilterToggle = () => {
    setFieldValuePairs([]);
    setDirection(false);
    setSortedIndex(null);
    setCurrentSelectedIndex(null);
    setCustomFunc("");
    setSelectedIndexes([]);
    setTableTitle(lastTableTitle)
    teamId ? getTeamData(teamId) : getPlayerData();
  };

  const resetTableStyles = () => {
    setSortedIndex(null);
    setCurrentSelectedIndex(null);
    setCustomFunc("");
    setSelectedIndexes([]);
    setTableIsFiltered(false);
  };

  //MENU FUNCTIONS
  function handleMenuItem(menuTitle, title, id, url, stat) {
    if (stat) {
      getStat(stat, title);
    }
    if (menuTitle === "League Tables") {
      handleLeagueTableMenu();
    }
    if (menuTitle === "Players") {
      handlePlayersMenu(title, id);
    }
    if (menuTitle === "Teams") {
      handleTeamsMenu(title, id);
    }
    if (menuTitle === "Stats") {
      handleStatsMenu(title, url, id);
    }
  }
  function handleLeagueTableMenu() {
    return;
  }
  function handlePlayersMenu(title, id) {
    if (title === "All Players") {
      setTableTitle("All Players");
      getPlayerData();
    } else {
      getTeamData(id, title);
    }
  }
  function handleTeamsMenu(title, id) {
    if (title === "All Teams") {
      setTableTitle("All Teams");
      getAllTeams();
    } else {
      setTeamId(id);
      setTableTitle(`${title}: (club info)`);
      getTeamPageData(id);
    }
  }
  function handleStatsMenu(title, url, id) {
    if (url) {
      getUserTable(id);
      setTableTitle(title);
    }
  }

  //USER FUNCTIONS

  async function addTablesToStatMenu(id) {
    console.log(id);
    const response = await fetch(
      `https://footy-app-server-test.herokuapp.com/api/users/get-user-tables/?userId=${id}`
    );
    const data = await response.json();
    if (data.length === 0) {
      return;
    } else {
      setMenu(data);
    }
  }

  async function getUserTable(id) {
    const response = await fetch(
      `https://footy-app-server-test.herokuapp.com/api/users/user-table-info/?id=${id}`
    );
    const data = await response.json();
    setUserTable(data[0]);
  }

  async function setMenu(data) {
    if (data) {
      data.forEach((element, index) => {
        const mostRecentEntry = data[index];
        const newStat = {
          id: mostRecentEntry.id,
          title: mostRecentEntry.title,
          url: mostRecentEntry.url,
        };

        const myStats = menuTabs[3].items[0].items;
        menuTabs[3].items[0].items = [...myStats, newStat];
      });
    } else {
      menuTabs[3].items[0].items = [];
    }
  }

  function getUserTableTitle(userId, tableTitle, username, fromRandomFunc) {
    let featured = '';
    if (fromRandomFunc) {
      featured = 'Featured Table: '
    }
    
    const title = (
      <Link
        to={`user/${userId}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >{`${featured}'${tableTitle}' by ${username}`}</Link>
    );
    setTableTitle(title);
    setToolbarType(() => {
      const newToolbarType = { ...toolbarTypes, canAdd: true };
      return newToolbarType;
    });
  }

  const getUsers = async () => {
    const response = await fetch(
      "https://footy-app-server-test.herokuapp.com/api/users/get-users"
    );
    const data = await response.json();
    const userData = data.map((user) => {
      return {
        id: user.id,
        username: user.username,
      };
    });
    setUsers(userData);
  };

  const checkToken = async () => {
    const tokenString = localStorage.getItem("token");
    const response = await fetch(
      `https://footy-app-server-test.herokuapp.com/api/auth/get-token/?token=${tokenString}`
    );
    const data = await response.json();
    const token = data;
    if (token.tokenInDB) {
      setLoggedIn(true);
      getUserByToken(token);
    }
  };

  const getUserByToken = async (token) => {
    const id = token.id;
    const response = await fetch(
      `https://footy-app-server-test.herokuapp.com/api/users/get-single-user/?id=${id}`
    );
    const data = await response.json();
    const existingUser = data[0];
    if (existingUser) {
      console.log(existingUser);
      getProfilePic(existingUser.id);
      setUser(existingUser);
      addTablesToStatMenu(existingUser.id);
    }
  };

  const getProfilePic = async (id) => {
    const result = await fetch(
      `https://footy-app-server-test.herokuapp.com/api/users/profile-pic/?id=${id}`
    );
    const data = await result.json();
    if (data.length > 0) {
      const path = data[0].path;
      const host = `https://footy-app-server-test.herokuapp.com`;
      const imageUrl = `${host}${path}`;
      console.log(imageUrl);
      setProfilePic(imageUrl);
    }
  };

  const getUserPicForTable = async (id) => {
    const result = await fetch(
      `https://footy-app-server-test.herokuapp.com/api/users/profile-pic/?id=${id}`
    );
    const data = await result.json();
    if (data.length > 0) {
      const path = data[0].path;
      const host = `https://footy-app-server-test.herokuapp.com`;
      const imageUrl = `${host}${path}`;
      setToolbarImage(imageUrl);
    }
  };

  const getFavouriteTeams = async (id) => {
    const result = await fetch(
      `https://footy-app-server-test.herokuapp.com/api/social/favourite-teams/?id=${id}`
    );
    const data = await result.json();
    setFavouriteTeams(data);
  };

  async function getRandomUserTable() {
    const randomUrlResponse = await fetch(
      `https://footy-app-server-test.herokuapp.com/api/table/get-random-url`
    );
    const randomUrldata = await randomUrlResponse.json();
    if (randomUrldata.length === 0) {
      return;
    }
    const userTable = randomUrldata[0];
    const urlId = userTable.id;
    const userId = userTable.user_id;
    const url = userTable.url;
    const username = userTable.username;
    const tableTitle = userTable.title;
    const fromRandomFunc = true;
    await getUserPicForTable(userId);
    await getUserTable(urlId); //should be userTableId
    getTableData(url);
    getUserTableTitle(userId, tableTitle, username, fromRandomFunc);
  }

  useEffect(() => {
    checkToken();
    getUsers();
    getRandomUserTable();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        getTeamData,
        filter,
        sortByField,
        sortFilteredResults,
        tableData,
        fields,
        teamId,
        setTeamId,
        direction,
        setDirection,
        fieldValuePairs,
        setFieldValuePairs,
        tableIsFiltered,
        selectedIndexes,
        sortedIndex,
        currentSelectedIndex,
        customFunc,
        setCustomFunc,
        reset,
        resetExceptFilterToggle,
        setSelectedIndexes,
        setCurrentSelectedIndex,
        setTableIsFiltered,
        setSortedIndex,
        resetTableStyles,
        getTeamPageData,
        addTablesToStatMenu,
        handleMenuItem,
        menuTabs,
        tableTitle,
        setUser,
        users,
        user,
        loggedIn,
        setLoggedIn,
        currentQuery,
        setMenu,
        getRandomUserTable,
        setTableTitle,
        toolbarType,
        setToolbarType,
        checkToken,
        favouriteTeams,
        setFavouriteTeams,
        getFavouriteTeams,
        getProfilePic,
        profilePic,
        getUserTableTitle,
        getTableData,
        userTable,
        getUserTable,
        toolbarImage,
        setToolbarImage,
        getUserPicForTable,
        getTeamLogo,
        setLastTableTitle
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
