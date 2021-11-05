const db = require("../utils/database");

exports.follow = (req, res) => {
  const followerId = req.body.followerId;
  const followeeId = req.body.followeeId;
  const sql = `INSERT INTO follows (follower_id, followee_id) VALUES (${followerId}, ${followeeId})`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.send({ success: false });
    }
    res.send({ success: true });
  });
};

exports.unfollow = (req, res) => {
  const followerId = req.body.followerId;
  const followeeId = req.body.followeeId;
  const sql = `DELETE FROM follows WHERE follower_id = ${followerId} AND followee_id = ${followeeId}`;
  db.query(sql, (err, result) => {
    if (err) console.log(err)
    res.send(result);
  });
};

exports.getFollowers = (req, res) => {
  const followeeId = req.query.id;
  const sql = `SELECT * FROM follows WHERE followee_id = ${followeeId}`;
  db.query(sql, (err, result) => {
    if (err) {
      return { success: false };
    }
    res.send(result);
  });
};

exports.getUserFollowers = (req, res) => {
  const id = req.query.id;
  const sql = `SELECT users.username, path, followee_id FROM users JOIN follows ON follows.followee_id = users.id JOIN user_images ON follows.followee_id = user_images.user_id WHERE follower_id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) console.log(err)
    res.send(result);
  });
};



("follow unfollow get-followers get-user-followers");
