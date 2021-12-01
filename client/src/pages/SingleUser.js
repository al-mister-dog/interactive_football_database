import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context";

import UserAvatar from "../components/SingleUserPage/UserInfo/UserAvatar";
import UserAbout from "../components/SingleUserPage/UserInfo/UserAbout";
import UserTables from "../components/SingleUserPage/UserInfo/UserTables";
import UserBookmarks from "../components/SingleUserPage/UserInfo/UserBookmarks";

import { CssBaseline, Container, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import hostUrl from "../api/servers";

import api from "../api";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 70,
    display: "flex",
    flexDirection: "row",
    "@media (max-width: 780px)": {
      flexDirection: "column",
    },
  },
  avatarBox: {
    display: "flex",
    flexDirection: "column",
    boxShadow: "none",
    "@media (max-width: 780px)": {
      flexDirection: "row",
    },
  },
  infoBox: {
    width: "80%",
    margin: "auto",
    marginTop: "0",
    flexGrow: 1,
    "@media (max-width: 780px)": {
      width: "100%",
      margin: 0,
    },
  },
}));

export default function SingleUser() {
  const classes = useStyles();
  const { id } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [profilePic, setProfilePic] = useState("/broken-image.jpg");
  const [followers, setFollowers] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [favouriteTeams, setFavouriteTeams] = useState([]);
  const [interests, setInterests] = useState([]);
  const [userTables, setUserTables] = useState([]);
  const [bookmarkList, setBookmarkList] = useState([]);

  const {
    getTableData,
    getUserTableTitle,
    user,
    getTeamData,
    getUserTable,
    getUserPicForTable,
    getTeamLogo,
  } = useGlobalContext();

  const handleMyTablesClick = async (
    user_table_id,
    user_id,
    title,
    username,
    url
  ) => {
    await getUserPicForTable(user_id);
    await getUserTable(user_table_id);
    getUserTableTitle(user_id, title, username);
    getTableData(url);
  };

  const handleClickTeam = (teamId, teamName) => {
    getTeamLogo(teamId);
    getTeamData(teamId, teamName);
  };

  const handleDeleteTable = async (id) => {
    try {
      const response = await api.deleteTable({ id });
      if (response.status === 200) {
        console.log("all good");
        getUserTables();
      } else {
        console.log("try");
        return;
      }
    } catch (error) {
      console.log("catch");
      return;
    }
  };

  async function getProfileUser() {
    try {
      const response = await api.getUser(id);
      const data = await response.json();
      if (response.status === 200) {
        setProfileUser(data[0]);
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getProfilePic = async (id) => {
    try {
      const result = await api.profilePic(id);
      const data = await result.json();
      if (data.length > 0) {
        const path = data[0].path;
        const imageUrl = `${hostUrl}${path}`;
        setProfilePic(imageUrl);
      }
    } catch (error) {
      return;
    }
  };

  async function getFollowers() {
    try {
      const response = await api.getFollowers(id);
      const data = await response.json();
      console.log(data);
      setFollowers(data);
    } catch (error) {
      return;
    }
  }

  const getFollowingList = async () => {
    const response = await api.getFollowingList(id);
    const data = await response.json();
    setFollowingList(data);
  };

  const getFavouriteTeams = async (id) => {
    const result = await api.getFavouriteTeams(id);
    const data = await result.json();
    setFavouriteTeams(data);
  };

  const getInterests = async () => {
    console.log("id" + id);
    const response = await api.getInterests(id);
    const data = await response.json();
    if (data.length > 0) {
      setInterests(data[0].text);
    } else {
      setInterests("");
    }
    console.log(data.length);
  };

  async function getUserTables() {
    const response = await api.getUserTables(id);
    const data = await response.json();
    setUserTables(data);
  }

  const getBookmarkedUserTables = async () => {
    const result = await api.getBookmarkedUserTables(id);
    const data = await result.json();
    setBookmarkList(data);
  };

  const handleDeleteBookmark = async (id) => {
    const response = await api.deleteBookmark({ id });
    const data = response.json();
    if (data.success) {
      console.log(data);
    }
    getBookmarkedUserTables();
  };

  useEffect(() => {
    getProfileUser(user);
    getProfilePic(id);
    getFavouriteTeams(id);
    getFollowers();
    getFollowingList();
    getInterests();
    getBookmarkedUserTables();
    getUserTables();
  }, [id, user]);

  if (user === undefined) {
    return <p>loading...</p>;
  }
  if (!profileUser) {
    return <h2 className="section-title">no user to display</h2>;
  } else {
    const { username, id } = profileUser;
    return (
      <CssBaseline>
        <Container className={classes.container}>
          <Box className={classes.avatarBox}>
            <UserAvatar
              user={user}
              profileUser={profileUser}
              id={id}
              getFollowers={getFollowers}
              followers={followers}
              username={username}
              profilePic={profilePic}
            />
          </Box>
          <Box className={classes.infoBox}>
            <UserAbout
              user={user}
              id={id}
              username={username}
              favouriteTeams={favouriteTeams}
              interests={interests}
              handleClickTeam={handleClickTeam}
              getFavouriteTeams={getFavouriteTeams}
              followingList={followingList}
              getInterests={getInterests}
            />
            <UserTables
              user={user}
              id={id}
              username={username}
              userTables={userTables}
              handleMyTablesClick={handleMyTablesClick}
              handleDeleteTable={handleDeleteTable}
            />
            <UserBookmarks
              user={user}
              id={id}
              username={username}
              bookmarkList={bookmarkList}
              handleMyTablesClick={handleMyTablesClick}
              handleDeleteBookmark={handleDeleteBookmark}
            />
          </Box>
        </Container>
      </CssBaseline>
    );
  }
}
