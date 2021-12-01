import host from "../servers";
import setOptions from "../options";
const social = {
  addInterests(options) {
    return fetch(`${host}/api/social/interests`, setOptions(options));
  },

  addTeam(options) {
    return fetch(`${host}/api/social/favourite-teams`, setOptions(options));
  },

  follow(options) {
    return fetch(`${host}/api/social/follow`, setOptions(options));
  },

  unfollow(options) {
    return fetch(`${host}/api/social/unfollow`, setOptions(options));
  },

  checkBookmark(tableId, bookmarkerId) {
    return fetch(
      `${host}/api/social/check-bookmark/?tableId=${tableId}&bookmarkerId=${bookmarkerId}`
    );
  },

  getBookmarkedUserTables(id) {
    return fetch(`${host}/api/social/get-user-bookmarks/?id=${id}`);
  },

  deleteBookmark(options) {
    return fetch(`${host}/api/social/bookmark`, setOptions(options, "DELETE"));
  },

  bookmarkTable(options) {
    return fetch(`${host}/api/social/bookmark`, setOptions(options));
  },

  unBookmarkTable(options) {
    return fetch(`${host}/api/social/unbookmark`, setOptions(options, "DELETE"));
  },

  getFollowingList(id) {
    return fetch(`${host}/api/social/get-user-followers/?id=${id}`);
  },

  getFavouriteTeams(id) {
    return fetch(`${host}/api/social/favourite-teams/?id=${id}`);
  },

  getInterests(id) {
    return fetch(`${host}/api/social/interests/?id=${id}`);
  },
};

export default social;
