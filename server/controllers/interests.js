const db = require("../utils/database");
const ServerException = require("../errors/ServerException");

exports.getInterests = (req, res, next) => {
  const id = req.query.id;
  const sql = `SELECT text FROM interests WHERE user_id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};

exports.addInterests = (req, res, next) => {
  const id = req.body.id;
  const text = req.body.text;
  const sql = `INSERT INTO interests (user_id, text) VALUES (${id}, '${text}') ON DUPLICATE KEY UPDATE text = '${text}'`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};
