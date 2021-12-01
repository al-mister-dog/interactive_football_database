const db = require("../utils/database");
const ServerException = require("../errors/ServerException");

exports.follow = (req, res, next) => {
  const followerId = req.body.followerId;
  const followeeId = req.body.followeeId;
  const sql = `INSERT INTO follows (follower_id, followee_id) VALUES (${followerId}, ${followeeId})`;
  db.query(sql, (err, result) => {
    if (err) {
      if (err) return next(new ServerException());
    }
    res.send({ success: true });
  });
};

exports.unfollow = (req, res, next) => {
  const followerId = req.body.followerId;
  const followeeId = req.body.followeeId;
  const sql = `DELETE FROM follows WHERE follower_id = ${followerId} AND followee_id = ${followeeId}`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};

exports.getFollowers = (req, res, next) => {
  const followeeId = req.query.id;
  const sql = `SELECT * FROM follows WHERE followee_id = ${followeeId}`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};
//COULD REVERSE ORDER TO GET FOLLOWERS, IN A LIST WITH LINKS...
exports.getUserFollowers = (req, res, next) => {
  const id = req.query.id;
  const sql = `SELECT users.username, path, followee_id FROM users JOIN follows ON follows.followee_id = users.id JOIN user_images ON follows.followee_id = user_images.user_id WHERE follower_id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};

