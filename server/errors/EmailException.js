module.exports = function EmailException() {
  this.message = 'We couldn\'t sign you up this time. Try again later';
  this.status = 502;
};