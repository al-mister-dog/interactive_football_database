const db = require("../utils/database");
const ServerException = require('../errors/ServerException');

exports.searchPlayers = (req, res, next) => {
  console.log("searching");
  const searchValue = req.query.searchValue;
  const sql = `SELECT Name, playerId FROM players WHERE Name LIKE '%${searchValue}%' LIMIT 5`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};

exports.searchTeams = (req, res, next) => {
  const searchValue = req.query.searchValue;
  const sql = `SELECT teamName, teamId FROM teams WHERE teamName LIKE '%${searchValue}%' LIMIT 5`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};

exports.searchUsers = (req, res, next) => {
  const searchValue = req.query.searchValue;
  const sql = `SELECT username, id FROM users WHERE username LIKE '%${searchValue}%' LIMIT 5`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};

exports.selectPlayerFromSearch = (req, res, next) => {
  const selected = { field: "playerId", value: "MFFW" };
  const sql = sqlMethods.filter(selected);
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};
