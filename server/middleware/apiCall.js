const ServerException = require("../errors/ServerException");
const fs = require("fs");
const schedule = require("../data/apiCallSchedule");

const scheduleFile = "./data/apiCallSchedule.js";
const leaguesFile = "./data/leagues.js";
const oneDay = 86400000;
const leagueIds = [
  { id: 61, function: "ligue1" },
  { id: 39, function: "premierLeague" },
  { id: 78, function: "bundesliga" },
  { id: 135, function: "serieA" },
  { id: 140, function: "laLiga" },
];

exports.scheduleCall = () => {
  const time = new Date().getTime();
  if (time > schedule.time) {
    const newTime = time + oneDay;
    fs.unlinkSync(scheduleFile);
    fs.writeFileSync(scheduleFile, `module.exports = {time: ${newTime}}`);
    makeApiCall();
  } else {
    console.log("dont make api call");
    return;
  }
};

function makeApiCall() {
  const request = require("request");
  fs.unlinkSync(leaguesFile);
  leagueIds.forEach((leagueId) => {
    const options = {
      method: "GET",
      url: process.env.API_URL,
      qs: { season: "2021", league: `${leagueId.id}` },
      headers: {
        "x-rapidapi-host": process.env.API_HOST,
        "x-rapidapi-key": process.env.API_KEY,
        useQueryString: true,
      },
    };
    request(options, function (error, response, body) {
      if (error) return next(new ServerException());
      fs.appendFileSync(
        leaguesFile,
        `exports.${leagueId.function} = ${body}\n`
      );
    });
  });
}