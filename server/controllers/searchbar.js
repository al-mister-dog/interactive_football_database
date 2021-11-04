const db = require('../utils/database')

exports.searchPlayers = (req, res) => {
  const searchValue = req.query.searchValue;
  const sql = `SELECT Name, playerId FROM players WHERE Name LIKE '%${searchValue}%' LIMIT 5`
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    res.send(result)
  })
}

exports.searchTeams = (req, res) => {
  const searchValue = req.query.searchValue
  const sql = `SELECT teamName, teamId FROM teams WHERE teamName LIKE '%${searchValue}%' LIMIT 5`
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    res.send(result)
  })
}

exports.searchUsers = (req, res) => {
  const searchValue = req.query.searchValue
  const sql = `SELECT username, id FROM users WHERE username LIKE '%${searchValue}%' LIMIT 5`
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    res.send(result)
  })
}

exports.selectPlayerFromSearch = (req, res) => {
  const selected = { field: 'playerId', value: 'MFFW' }
  const sql = sqlMethods.filter(selected);
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    res.send(result)
  })
}