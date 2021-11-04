const db = require('./database');

const playerSelection = 'Name, Nation, Position, Team, Age, Born, Matches, Starts, Minutes, 90mins, Goals, Assists, NonPenGoals, PenGoals , PenAttempts, Yellows ,Reds ,GlsPer90 , AstPer90, GlsAstPer90, NonPenGoalsPer90, NonPenGlsAstPer90, xG, NonPenxG, xA ,npxGxA , xGPer90 , xAPer90 , xGxAPer90 , npxGPer90, npxGxAPer90';
const teamSelection = 'Name, Nation, Position, Age, Born, Matches, Starts, Minutes, 90mins, Goals, Assists, NonPenGoals, PenGoals , PenAttempts, Yellows ,Reds ,GlsPer90 , AstPer90, GlsAstPer90, NonPenGoalsPer90, NonPenGlsAstPer90, xG, NonPenxG, xA ,npxGxA , xGPer90 , xAPer90 , xGxAPer90 , npxGPer90, npxGxAPer90';
const joinTeams = `INNER JOIN teams ON players.TeamId = teams.teamId`;

function createQuery(selected) {
  let queryString = ''
  for (let i = 0; i < selected.field.length; i++) {
    if (i === 0) {
      queryString += `SELECT ${playerSelection} FROM players ${joinTeams} WHERE ${selected.field[i]} = '${selected.value[i]}'`
    } else {
      queryString += ` AND ${selected.field[i]} = '${selected.value[i]}'`
    }
  }
  return queryString
}

function createTeamQuery(selected) {
  let queryString = ''
  for (let i = 0; i < selected.field.length; i++) {
    if (i === 0) {
      queryString += `SELECT ${teamSelection} FROM players ${joinTeams} WHERE ${selected.field[i]} = '${selected.value[i]}'`
    } else {
      queryString += ` AND ${selected.field[i]} = '${selected.value[i]}'`
    }
  }
  return queryString
}

exports.getData = (id) => {
  if (id === '') {
    return `SELECT ${playerSelection} FROM players ${joinTeams}`
  } else {
    return `SELECT ${teamSelection} FROM players ${joinTeams} WHERE players.TeamId = ${id}`
  }
};

exports.filter = (selected, id) => {
  if (id === '') {
    const queryString = createQuery(selected);
    return `${queryString}`
  } else {
    const queryString = createTeamQuery(selected);
    return `${queryString} AND players.teamId = ${id}`
  }
};

exports.sort = (field, id, direction) => {
  if (id === '') {
    return `SELECT ${playerSelection} FROM players ${joinTeams} ORDER BY ${field} ${direction}`;
  } else {
    return `SELECT ${teamSelection} FROM players ${joinTeams} WHERE players.TeamId = ${id} ORDER BY ${field} ${direction}`;
  }
};

exports.sortFiltered = (selected, fieldToOrderBy, id, direction) => {
  if (id === '') {
    const queryString = createQuery(selected);
    return direction === 'true' ? 
    `${queryString} ORDER BY ${fieldToOrderBy} ASC`:
    `${queryString} ORDER BY ${fieldToOrderBy} DESC`
  } else {
    const queryString = createTeamQuery(selected);
    return direction === 'true' ? 
    `${queryString} AND players.teamId = ${id} ORDER BY ${fieldToOrderBy} ASC`:
    `${queryString} AND players.teamId = ${id} ORDER BY ${fieldToOrderBy} DESC`
  }
};

exports.query = (query, res) => db.query(query, (err, result) => { 
  if (err) console.log(err)
  res.send(result);
})