import { useState, useEffect } from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../../api"
const useStyles = makeStyles((theme) => ({
  avatarHeader: {
    textAlign: "center",
    padding: 10,
    alignSelf: "center",
    "@media (max-width: 780px)": {
      alignSelf: "flex-end",
      display: "flex",
      flexDirection: "column",
      padding: 0,
    },
  },
  userProfile: {
    display: "none",
  },
}));

export default function FollowButton({
  user,
  profileUser,
  id,
  getFollowers,
  followers,
}) {
  const classes = useStyles();
  const [following, setFollowing] = useState(true);

  const onFollow = async () => {
    const followerId = user.id;
    const followeeId = profileUser.id;
    try {
      const response = await api.follow({ followerId, followeeId });
      console.log(response);
      getFollowers();
    } catch (error) {
      console.log(error);
    }
  };

  const onUnfollow = async () => {
    const followerId = user.id;
    const followeeId = profileUser.id;
    try {
      const response = await api.unfollow({ followerId, followeeId });
      console.log(response);
      getFollowers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    function checkIfFollowing() {
      const follower = followers.find((flr) => flr.follower_id === user.id);
      follower ? setFollowing(true) : setFollowing(false);
    }
    checkIfFollowing();
  }, [followers, user.id]);
  //keep an eye on user.id dependency
  return (
    <>
      <Typography variant="body1" className={classes.avatarHeader}>
        {followers.length === 1
          ? `${followers.length} follower`
          : `${followers.length} followers`}
      </Typography>
      {following ? (
        <Button
          className={user.id === id && classes.userProfile}
          variant="contained"
          color="secondary"
          onClick={onUnfollow}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          className={user.id === id && classes.userProfile}
          variant="contained"
          color="primary"
          onClick={onFollow}
        >
          Follow
        </Button>
      )}
    </>
  );
}
