const db = require("../utils/database");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const EmailService = require("../services/EmailService");
const EmailException = require("../errors/EmailException");

const randomString = (length) => {
  return crypto.randomBytes(length).toString("hex").substring(0, length);
};

const mySqlDate = new Date().toISOString().slice(0, 19).replace("T", " ");

exports.findByEmail = (email) => {
  console.log(email);
  const sql = `SELECT * FROM users WHERE email = '${email}' LIMIT 1`;
  return new Promise(function (resolve, reject) {
    db.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.save = async (user) => {
  const { username, email, password } = user;
  const hash = await bcrypt.hash(password, 10);
  const activationToken = randomString(16);
  const sql = `INSERT INTO users (username, email, password, activationtoken) VALUES ('${username}', '${email}', '${hash}', '${activationToken}')`;

  try {
    await createUser(sql);
    try {
      await EmailService.sendAccountActivation(email, activationToken);
    } catch (err) {
      console.log(err);
      throw new EmailException();
    }
    return;
  } catch (error) {
    throw new EmailException();
  }
};

function createUser(sql) {
  return new Promise(function (resolve, reject) {
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(result);
    });
  });
}

exports.findToken = (token) => {
  const sql = `SELECT * FROM tokens WHERE token = ${token}`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.getProfilePic = (userId) => {
  const sql = `SELECT path FROM user_images WHERE user_id = ${userId}`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.storeImage = (path, userId) => {
  const sql = `INSERT INTO user_images (path, user_id) VALUES ("${path}", ${userId}) ON DUPLICATE KEY UPDATE path = "${path}"`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
