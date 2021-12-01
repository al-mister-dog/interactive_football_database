const db = require("../utils/database");
const ServerException = require("../errors/ServerException");

exports.getFavouriteTeams = (req, res, next) => {
  const userId = req.query.id;
  const sql = `SELECT teamName, teamId, imageUrl FROM teams JOIN favourite_teams ON teams.teamId = favourite_teams.team_id WHERE favourite_teams.user_id = ${userId}`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};

exports.saveFavouriteTeams = (req, res, next) => {
  const teamId = req.body.teamId;
  const userId = req.body.userId;
  const num = `${userId}+${req.body.num}`;
  const sql = `INSERT INTO favourite_teams (team_id, user_id, num) VALUES (${teamId}, ${userId}, '${num}') ON DUPLICATE KEY UPDATE team_id = ${teamId}, user_id = ${userId}, num = '${num}'`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    return res.send({ msg: "success" });
  });
};
