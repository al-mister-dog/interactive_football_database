const db = require("../utils/database");
const sqlMethods = require("../utils/sql");
const ServerException = require("../errors/ServerException");

exports.getData = (req, res, next) => {
  console.log(req.query.id)
  const sql = sqlMethods.getData(req.query.id);
  sqlMethods.query(sql, res);
};

exports.filter = (req, res, next) => {
  let selected;
  if (Array.isArray(req.query.field)) {
    selected = {
      field: req.query.field,
      value: req.query.value,
    };
  } else {
    selected = {
      field: [req.query.field],
      value: [req.query.value],
    };
  }
  const id = req.query.id;
  const sql = sqlMethods.filter(selected, id);
  sqlMethods.query(sql, res);
};

exports.sort = (req, res, next) => {
  const sql = sqlMethods.sort(
    req.query.field,
    req.query.id,
    req.query.direction === "true" ? "ASC" : "DESC"
  );
  sqlMethods.query(sql, res);
};

exports.sortFiltered = (req, res, next) => {
  let selected;
  if (Array.isArray(req.query.field)) {
    selected = {
      field: req.query.field,
      value: req.query.value,
    };
  } else {
    selected = {
      field: [req.query.field],
      value: [req.query.value],
    };
  }

  const sql = sqlMethods.sortFiltered(
    selected,
    req.query.fieldToOrderBy,
    req.query.id,
    req.query.direction
  );
  sqlMethods.query(sql, res);
};

exports.getRandomUrl = (req, res, next) => {
  const sql = `SELECT user_tables.id, user_id, username, user_tables.title, user_tables.description, url FROM user_tables JOIN users ON user_tables.user_id = users.id ORDER BY RAND() LIMIT 1`;
  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};
