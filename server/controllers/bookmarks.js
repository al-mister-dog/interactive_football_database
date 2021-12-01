const db = require("../utils/database");
const ServerException = require('../errors/ServerException');

exports.bookmark = (req, res, next) => {
  const tableId = req.body.tableId;
  const bookmarkeeId = req.body.bookmarkeeId;
  const bookmarkerId = req.body.bookmarkerId;
  const bookmarkKey = `${tableId}+${bookmarkerId}`;
  const sql = `INSERT INTO bookmarks (table_id, bookmarkee_id, bookmarker_id, bookmark_key) VALUES (${tableId}, ${bookmarkeeId}, ${bookmarkerId}, '${bookmarkKey}')`;
  db.query(sql, (err, result) => {
    if (err)  if (err) return next(new ServerException());
    res.send({ success: true });
  });
};

exports.getBookmarks = (req, res, next) => {
  const tableId = req.query.tableId;
  const sql = `SELECT * FROM bookmarks WHERE table_id = ${tableId}`;

  db.query(sql, (err, result) => {
    if (err) return next(new ServerException());
    res.send(result);
  });
};
//could be one query ??
exports.getUserBookmarks = (req, res, next) => {
  const bookmarkerId = req.query.id;
  const sql = `SELECT user_tables.id AS user_table_id, user_tables.user_id, bookmarks.id AS bookmarks_id, users.username, user_tables.title, user_tables.description, url FROM user_tables JOIN bookmarks ON user_tables.id = bookmarks.table_id JOIN users ON user_tables.user_id = users.id WHERE bookmarker_id = ${bookmarkerId}`
  db.query(sql, (err, result) => {
     if (err) return next(new ServerException());
    res.send(result);
  });
};

exports.checkBookmark = (req, res, next) => { 
  const tableId = req.query.tableId;
  const bookmarkerId = req.query.bookmarkerId;
  const bookmarkKey = `${tableId}+${bookmarkerId}`;
  const sql = `SELECT bookmark_key FROM bookmarks WHERE bookmark_key = '${bookmarkKey}'`
  db.query(sql, (err, result) => {
     if (err) return next(new ServerException());
    res.send(result);
  });
};

exports.deleteBookmark = (req, res, next) => {
  const id = req.body.id
  const sql = `DELETE FROM bookmarks WHERE id = ${id}`;
  db.query(sql, (err, result) => {
     if (err) return next(new ServerException());
    res.send({success: true});
  });
}

exports.unbookmark = (req, res, next) => {
  const tableId = req.body.tableId;
  const bookmarkerId = req.body.bookmarkerId;
  const bookmarkKey = `${tableId}+${bookmarkerId}`;
  const sql = `DELETE FROM bookmarks WHERE bookmark_key = '${bookmarkKey}'`
  db.query(sql, (err, result) => {
     if (err) return next(new ServerException());
    res.send({success: true});
  });
};