import { Link } from "react-router-dom";
import { useState } from "react";
import EditFavouriteTeams from "../UserButtons/EditFavouriteTeams";
import {
  Card,
  Typography,
  IconButton,
  Tooltip,
  Avatar,
  Modal,
  Box,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  infoBoxCardOne: {
    width: "80%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    boxShadow: "none",
    border: "1px solid #c0ca33",
    "@media (max-width: 780px)": {
      width: "100%",
      marginTop: 10,
      borderRadius: 10,
    },
  },
  infoCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    padding: 20,
    "@media (max-width: 780px)": {
      padding: 10,
    },
  },
  infoCardList: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    "@media (max-width: 780px)": {
      padding: 10,
    },
  },
  avatars: {
    display: "flex",
    flexDirection: "row",
  },
  avatar: {
    maxWidth: "2.5rem",
    maxHeight: "2.5rem",
    marginLeft: "10px",
    "@media (max-width: 780px)": {
      maxWidth: "2rem",
      maxHeight: "2rem",
    },
  },
  followingList: {
    display: "flex",
    flexDirection: "column",
  },
  hidden: {
    display: "none",
  },
  seeMore: {
    marginLeft: "1rem",
  },
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
  scroll: {
    overflow: "hidden",
    overflowY: "scroll",
    width: "100%",
  },
  followerCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: "40%",
    margin: "auto",
    "&:hover": {
      background: "rgba(0, 0, 0, 0.1)",
    },
  },
  followerLink: {
    width: "90%",
    height: "40%",
    textDecoration: "none",
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalAvatar: {
    maxWidth: "2.5rem",
    maxHeight: "2.5rem",
    marginLeft: 10,
    "@media (max-width: 780px)": {
      maxWidth: "2rem",
      maxHeight: "2rem",
    },
  },
}));

export default function UserAbout({
  user,
  id,
  username,
  favouriteTeams,
  handleClickTeam,
  getFavouriteTeams,
  followingList,
}) {
  const [followersModalOpen, setFollowersModalOpen] = useState(false);
  const handleFollowersModalOpen = () => {
    setFollowersModalOpen(true);
  };
  const handleFollowersModalClose = () => {
    setFollowersModalOpen(false);
  };
  const classes = useStyles();
  return (
    <Card className={classes.infoBoxCardOne}>
      <div className={classes.infoCard}>
        <Typography variant="body1">🖐️ Hi, I'm {username} ⚽</Typography>
      </div>

      <div className={classes.infoCardList}>
        <Typography variant="body1">My favourite teams are...</Typography>

        <div className={classes.avatars}>
          {favouriteTeams.map((team) => {
            const { teamName, teamId, imageUrl } = team;
            return (
              <Link key={teamId} to="/table">
                <Tooltip title={teamName}>
                  <Avatar
                    className={classes.avatar}
                    src={imageUrl}
                    onClick={() => handleClickTeam(teamId, teamName)}
                  ></Avatar>
                </Tooltip>
              </Link>
            );
          })}

          <div className={user.id !== id ? classes.hidden : ""}>
            <EditFavouriteTeams
              favouriteTeams={favouriteTeams}
              getFavouriteTeams={getFavouriteTeams}
              id={id}
            />
          </div>
        </div>
      </div>

      <div className={classes.infoCardList}>
        <Typography variant="body1">I'm following...</Typography>

        <div className={classes.avatars}>
          {followingList
            .map((followee) => {
              const imageUrl = `${followee.path}`;
              return (
                <Link
                  key={followee.followee_id}
                  to={`/user/${followee.followee_id}`}
                >
                  <Tooltip title={followee.username}>
                    <Avatar
                      className={classes.avatar}
                      alt={followee.username}
                      src={imageUrl}
                    />
                  </Tooltip>
                </Link>
              );
            })
            .slice(0, 3)}
          {followingList.length > 3 && (
            <IconButton onClick={handleFollowersModalOpen}>
              <Tooltip title="See More">
                <AddIcon />
              </Tooltip>
            </IconButton>
          )}
        </div>
        <Modal open={followersModalOpen} onClose={handleFollowersModalClose}>
          <Box className={classes.modal}>
            <div className={classes.scroll}>
              {followingList.map((followee) => {
                const imageUrl = `${followee.path}`;
                return (
                  <Link
                    className={classes.followerLink}
                    key={followee.followee_id}
                    to={`/user/${followee.followee_id}`}
                    onClick={handleFollowersModalClose}
                  >
                    <Card className={classes.followerCard}>
                      <Typography>{followee.username}</Typography>

                      <Avatar
                        className={classes.modalAvatar}
                        alt={followee.username}
                        src={imageUrl}
                      />
                    </Card>
                  </Link>
                );
              })}
            </div>
          </Box>
        </Modal>
      </div>

      <div className={classes.infoCard}>
        <Typography variant="body1">I'm interested in...</Typography>
      </div>
    </Card>
  );
}
