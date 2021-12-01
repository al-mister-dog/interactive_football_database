module.exports = (err, req, res, next) => {
  const { status, message, errors } = err;
  console.log(err)
  let validationErrors;
  if (errors) {
    validationErrors = {};
    errors.forEach((error) => (validationErrors[error.param]));
  }
  res.status(status).send({
    path: req.originalUrl,
    timestamp: new Date().getTime(),
    message,
    validationErrors,
  });
};