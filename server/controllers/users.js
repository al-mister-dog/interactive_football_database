const db = require("../utils/database");
const UserService = require("../services/UserService");
const TokenService = require("../services/TokenService");
const ServerException = require("../errors/ServerException")

exports.saveUserTable = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const url = req.body.url;
  const userId = req.body.userId;
  const token = req.body.token;
  const response = await TokenService.findToken(token);
  const tokenFound = response[0];
  if (!tokenFound) {
    console.log("no token found")
    return res.status(401).send({ error: true, msg: "You must be logged in to do that" });
  }
  const sql = `INSERT INTO user_tables (title, description, url, user_id) VALUES ('${title}', '${description}', '${url}', ${userId})`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    return res.send({ status: "submitted" });
  });
};

exports.getUserTables = (req, res, next) => {
  const userId = req.query.userId;
  const sql = `SELECT user_tables.id, user_id, username, user_tables.title, user_tables.description, url FROM user_tables JOIN users ON user_tables.user_id = users.id WHERE user_id = ${userId}`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};

exports.getUserTableInfo = (req, res, next) => {
  const sql = `SELECT user_tables.id AS id, title, description, url, user_id, username FROM user_tables JOIN users ON user_tables.user_id = users.id WHERE user_tables.id = ${req.query.id}`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};

exports.getUsername = (req, res, next) => {
  const id = req.query.id;
  const sql = `SELECT username from users WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};

exports.getUsers = (req, res, next) => {
  const sql = `SELECT * FROM users`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};

exports.getUser = (req, res, next) => {
  const sql = `SELECT id, username FROM users WHERE id = ${req.query.id}`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};

exports.getProfilePic = async (req, res, next) => {
  const userId = req.query.id;
  try {
    const path = await UserService.getProfilePic(userId);
    if (path) {
      res.send(path);
    } else {
      res.send({ msg: "user not found" });
    }
  } catch (err) {
    if (err) return next(new ServerException());
  }
};

exports.deleteTable = (req, res, next) => {
  const sql = `DELETE FROM user_tables WHERE id = ${req.body.id}`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};
