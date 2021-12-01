import host from "../servers";
import setOptions from "../options";
export const hostUrl = host;

const users = {
  getUser(id) {
    return fetch(`${host}/api/users/get-single-user/?id=${id}`);
  },

  getUsers() {
    return fetch(`${host}/api/users/get-users`);
  },

  deleteTable(options) {
    return fetch(`${host}/api/users/delete-table`, setOptions(options, "DELETE"));
  },

  profilePic(id) {
    return fetch(`${host}/api/users/profile-pic/?id=${id}`);
  },

  getFollowers(id) {
    return fetch(`${host}/api/social/get-followers/?id=${id}`);
  },

  getUserTables(id) {
    return fetch(`${host}/api/users/get-user-tables/?userId=${id}`);
  },

  userTableInfo(id) {
    return fetch(`${host}/api/users/user-table-info/?id=${id}`);
  },

  getUserByToken(id) {
    return fetch(`${host}/api/users/get-single-user/?id=${id}`);
  },

  saveUsertable(options) {
    return fetch(`${host}/api/users/save-user-table`, setOptions(options));
  },
};

export default users;