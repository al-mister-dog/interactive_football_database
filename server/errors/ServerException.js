module.exports = function ServerException() {
  this.message = 'Something went wrong with our server. Please try again later';
  this.status = 500;
};