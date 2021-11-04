const data = require('../data/leagues')

exports.getPrem = (req, res) => {
  res.send(data.premierLeague)
}
exports.getBundesliga = (req, res) => {
  res.send(data.bundesliga)
}
exports.getSerieA = (req, res) => {
  res.send(data.serieA)
}
exports.getLaLiga = (req, res) => {
  res.send(data.laLiga)
}
exports.getLigue1 = (req, res) => {
  res.send(data.ligue1)
}
