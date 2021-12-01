import auth from "./api-calls/auth";
import data from "./api-calls/data";
import social from "./api-calls/social";
import users from "./api-calls/users";
const api = {
  ...auth,
  ...data,
  ...social,
  ...users,
};
export default api;
