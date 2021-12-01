module.exports = function AuthenticationException(msg) {
  this.status = 401;
  this.message = msg;
};