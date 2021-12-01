const db = require("../utils/database");
const ServerException = require("../errors/ServerException");

exports.getTeam = (req, res, next) => {
  const id = req.params.id;
  const sql = `SELECT * FROM teams WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};

exports.getTeams = (req, res, next) => {
  const sql = `SELECT * FROM teams WHERE leagueId = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};

exports.getAllTeams = (req, res, next) => {
  const sql = `SELECT teamName, league, manager, location, stadium, capacity FROM teams`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};

exports.getTeamFromLeagueTable = (req, res, next) => {
  const sql = `SELECT teamName, league, manager, location, stadium, capacity FROM teams WHERE teamName = '${req.query.name}'`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};

exports.getMarketValue = (req, res, next) => {
  const id = req.params.id;
  const sql = `SELECT SUM(value) AS marketValue FROM players WHERE teamId = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};

exports.getTeamPageData = (req, res, next) => {
  const id = req.params.id;
  const sql = `SELECT league, manager, location, stadium, capacity FROM teams WHERE teamId = ${id}`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};

exports.getTeamLogo = (req, res, next) => {
  const id = req.query.id;
  const sql = `SELECT imageUrl FROM teams WHERE teamId = ${id}`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};
