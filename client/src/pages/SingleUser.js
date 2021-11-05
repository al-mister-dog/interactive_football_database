import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context";

import UserAvatar from "../components/SingleUserPage/UserInfo/UserAvatar";
import UserAbout from "../components/SingleUserPage/UserInfo/UserAbout";
import UserTables from "../components/SingleUserPage/UserInfo/UserTables";
import UserBookmarks from "../components/SingleUserPage/UserInfo/UserBookmarks";

import { CssBaseline, Container, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 70,
    display: "flex",
    flexDirection: "row",
    "@media (max-width: 780px)": {
      flexDirection: "column"
    },
  },
  avatarBox: {
    display: "flex",
    flexDirection: "column",
    boxShadow: "none",
    "@media (max-width: 780px)": {
      flexDirection: "row"
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
  const [userTables, setUserTables] = useState([]);
  const [bookmarkList, setBookmarkList] = useState([]);

  const {
    getTableData,
    getUserTableTitle,
    user,
    getTeamData,
    getUserTable,
    getUserPicForTable,
    getTeamLogo
  } = useGlobalContext();
  
  const handleMyTablesClick = async (user_table_id, user_id, title, username, url) => {
    await getUserPicForTable(user_id)
    await getUserTable(user_table_id);
    getUserTableTitle(user_id, title, username);
    getTableData(url);
  };

  const handleClickTeam = (teamId, teamName) => {
    getTeamLogo(teamId)
    getTeamData(teamId, teamName);
  };

  const handleDeleteTable = async (id) => {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    };
    const response = await fetch(
      `/api/users/delete-table`,
      options
    );
    const data = response.json();
    getUserTables();
  };

  async function getProfileUser() {
    try {
      const response = await fetch(
        `/api/users/get-single-user/?id=${id}`
      );
      const data = await response.json();
      setProfileUser(data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const getProfilePic = async (id) => {
    const result = await fetch(
      `/api/users/profile-pic/?id=${id}`
    );
    const data = await result.json();
    if (data.length > 0) {
      const path = data[0].path;
      const imageUrl = `${path}`;
      setProfilePic(imageUrl);
    }
  };

  async function getFollowers() {
    try {
      const response = await fetch(
        `/api/social/get-followers/?id=${id}`
      );
      const data = await response.json();
      setFollowers(data);
    } catch (error) {
      console.log(error);
    }
  }

  const getFollowingList = async () => {
    const result = await fetch(
      `/api/social/get-user-followers/?id=${id}`
    );
    const data = await result.json();
    setFollowingList(data);
  };

  const getFavouriteTeams = async (id) => {
    const result = await fetch(
      `/api/social/favourite-teams/?id=${id}`
    );
    const data = await result.json();
    setFavouriteTeams(data);
  };

  async function getUserTables() {
    const response = await fetch(
      `/api/users/get-user-tables/?userId=${id}`
    );
    const data = await response.json();
    console.log("getUserTables", data)
    setUserTables(data);
  }

  const getBookmarkedUserTables = async () => {
    const result = await fetch(
      `/api/social/get-user-bookmarks/?id=${id}`
    );
    const data = await result.json();
    console.log("getBookmarkedUserTables", data);
    setBookmarkList(data);
  };

  const handleDeleteBookmark = async (id) => {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    };
    const response = await fetch(
      "/api/social/bookmark",
      options
    );
    const data = response.json();
    if (data.success) {
      console.log(data)
    }
    getBookmarkedUserTables();
  };

  useEffect(() => {
    getProfileUser(user);
    getProfilePic(id);
    getFavouriteTeams(id);
    getFollowers();
    getFollowingList();
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
              handleClickTeam={handleClickTeam}
              getFavouriteTeams={getFavouriteTeams}
              followingList={followingList}
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
