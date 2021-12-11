const db = require("./database");

const queryDB = (sql) => {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
exports.deleteUser = async () => {
  await queryDB('DELETE FROM users WHERE email = "user1@mail.com"');
  return;
};

exports.getBookmarks = async () => {
  const result = await queryDB("SELECT * FROM bookmarks");
  return result;
};

exports.postBookmark = async () => {
  await queryDB(`INSERT INTO bookmarks (table_id, bookmarkee_id, bookmarker_id, bookmark_key) VALUES (1, 1, 2, '1+2')`)
};

exports.postFollow = async () => {
  await queryDB('INSERT INTO `follows` VALUES (1,2)')
}