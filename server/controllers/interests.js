const db = require("../utils/database");

exports.getInterests = (req, res) => {
  const id = req.query.id;
  const sql = `SELECT text FROM interests WHERE user_id = ${id}`
  db.query(sql, (err, result) => {
    if (err) {
      return res.send({
        error: true,
        msg: "Something went wrong. Try again later",

      });
    }
    res.send(result);
  });
};

exports.addInterests = (req, res) => {
  const id = req.body.id;
  const text = req.body.text;
  const sql = `INSERT INTO interests (user_id, text) VALUES (${id}, '${text}') ON DUPLICATE KEY UPDATE text = '${text}'`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      return res.send({
        error: true,
        msg: "Something went wrong. Try again later",
      });
    }
    res.send({ success: true });
  });
};