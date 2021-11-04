const db = require("../utils/database");

exports.getFavouriteTeams = (req, res) => {
  const userId = req.query.id;
  const sql = `SELECT teamName, teamId, imageUrl FROM teams JOIN favourite_teams ON teams.teamId = favourite_teams.team_id WHERE favourite_teams.user_id = ${userId}`;
  db.query(sql, (err, result) => {
    if (err) console.log(err)
    res.send(result)
  })
};

exports.saveFavouriteTeams = (req, res) => {
  const teamId = req.body.teamId;
  const userId = req.body.userId;
  const num = `${userId}+${req.body.num}`
  const sql = `INSERT INTO favourite_teams (team_id, user_id, num) VALUES (${teamId}, ${userId}, '${num}') ON DUPLICATE KEY UPDATE team_id = ${teamId}, user_id = ${userId}, num = '${num}'`;
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.send({msg: 'success'})
  })
}
// const sql = `INSERT INTO favourite_teams (team_id, user_id, num) VALUES (${teamId}, ${userId}, ${num}) ON DUPLICATE KEY UPDATE team_id = "${teamId}"`
// `INSERT INTO favourite_teams (team_id, user_id, num) VALUES (1, 3, 0) ON DUPLICATE KEY UPDATE team_id = 1`