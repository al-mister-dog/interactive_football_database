import host from "../servers";

const data = {
  getTableData(string) {
    return fetch(`${host}${string}`);
  },

  getTeamLogo(id) {
    return fetch(`${host}/api/table/team-logo/?id=${id}`);
  },

  search(menuItem, value) {
    return fetch(`${host}/api/search/${menuItem}/?searchValue=${value}`);
  },

  getRandomTable() {
    return fetch(`${host}/api/table/get-random-url`);
  },

  leagueApiCall(leagueId) {
    return fetch(`${host}/api/leagues/${leagueId}`);
  },
};

export default data;