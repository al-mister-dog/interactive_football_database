import FollowButtons from "../UserButtons/FollowButtons";
import ImageUploader from "../UserButtons/ImageUpload";

import { Card, Badge, Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  avatarCard: {
    "@media (max-width: 780px)": {
      width: "100vw",
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 0"
    },
  },
  avatarHeaders: {
    display: "flex",
    flexDirection: "column",
    "@media (max-width: 780px)": {
      alignSelf: "flex-start",

    },
  },
  avatarHeader: {
    textAlign: "center",
    padding: 10,
    alignSelf: "center",
    "@media (max-width: 780px)": {
      alignSelf: "flex-end",
      display: "flex",
      flexDirection: "column",
      // alignItems: "baseline",
      padding: 0,
      
    },
  },
  avatarSpace: {
    height: "100vh",
    flexGrow: 1,
    "@media (max-width: 780px)": {
      display: "none",
    },
  },
  avatar: {
    width: "15rem",
    height: "15rem",
    "@media (max-width: 780px)": {
      width: "6rem",
      height: "6rem",
    },
  },
  hidden: {
    display: "none",
  },
}));

export default function UserAvatar({
  user,
  profileUser,
  id,
  getFollowers,
  followers,
  username,
  profilePic,
}) {
  const classes = useStyles();
  return (
    <Card
      style={{
        backgroundColor: "transparent",
        padding: 5,
        borderRadius: 10,
        border: "1px solid #c0ca33",
      }}
      className={classes.avatarCard}
    >
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <Avatar className={user.id !== id ? classes.hidden : ""}>
            <ImageUploader user={user}></ImageUploader>
          </Avatar>
        }
      >
        <Avatar alt={username} src={profilePic} className={classes.avatar} />
      </Badge>
      <div className={classes.avatarHeaders}>
        <Typography variant="h5" className={classes.avatarHeader}>
          {username}
        </Typography>
        <FollowButtons
          followers={followers}
          user={user}
          profileUser={profileUser}
          id={id}
          getFollowers={getFollowers}
        ></FollowButtons>
      </div>
      <div className={classes.avatarSpace}></div>
    </Card>
  );
}
