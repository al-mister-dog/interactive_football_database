const TokenService = require('../services/TokenService');

const tokenAuthentication = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.substring(7);
    try {
      const user = await TokenService.verify(token);
      req.authenticatedUser = user;
    } catch (err) {
      res.send({msg: 'something went wrong'})
    }
  }
  next();
};

module.exports = tokenAuthentication;