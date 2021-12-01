import host from "../servers";
import setOptions from "../options";
export const hostUrl = host;

const auth = {
  login(options) {
    return fetch(`${host}/api/auth/login`, setOptions(options));
  },

  signup(options) {
    return fetch(`${host}/api/auth/signup`, setOptions(options));
  },

  removeToken(options) {
    return fetch(`${host}/api/auth/token/remove-token`, setOptions(options));
  },

  checkToken(tokenString) {
    return fetch(`${host}/api/auth/get-token/?token=${tokenString}`);
  },
};

export default auth;
