const db = require("../utils/database");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const randomString = (length) => {
  return crypto.randomBytes(length).toString("hex").substring(0, length);
};
const ONE_WEEK_IN_MILLIS = 7 * 24 * 60 * 60 * 1000;
const mySqlDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

exports.createToken = async (user) => {
  const token = randomString(32);
  await insertToken({
    token: token,
    userId: user.id,
    lastUsedAt: mySqlDate,
  });
  return token;
};

exports.activateToken = async (token) => {
  const response = await findActivationToken(token)
  const user = response[0]
  if (!user) {
    throw new Error ('could not activate account');
  }
  const active = true;
  const activationToken = null;
  const id = user.id
  await updateUserActivation(active, activationToken, id);
};

function findActivationToken(token) {
  const sql = `SELECT * FROM users WHERE token = '${token}'`
  return new Promise(function (resolve, reject) {
    db.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

function updateUserActivation(active, activationToken, id) {
  const sql = `UPDATE users SET active = '${active}', activationtoken = '${activationToken}' WHERE id = '${id}'`
  return new Promise(function (resolve, reject) {
    db.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

function insertToken(tokenObject) {
  const { token, userId, lastUsedAt } = tokenObject;
  const sql = `INSERT INTO tokens (token, user_id, last_used_at) VALUES ('${token}', '${userId}', '${lastUsedAt}')`;
  return new Promise(function (resolve, reject) {
    db.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

exports.findToken = (token) => {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM tokens WHERE token = ${token}`;
    db.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

exports.verify = async (token) => {
  const reqToken = req.query.token;

  const oneWeekAgo = new Date(Date.now() - ONE_WEEK_IN_MILLIS);
  const tokenInDB = await Token.findOne({
    where: {
      token: token,
      lastUsedAt: {
        [Sequelize.Op.gt]: oneWeekAgo,
      },
    },
  });
  tokenInDB.lastUsedAt = new Date();
  await tokenInDB.save();
  const userId = tokenInDB.userId;
  return { id: userId };
};

function findToken(token) {
  const sql = `SELECT * FROM tokens WHERE token = ${token}`
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result)
    })
  })
}


exports.deleteToken = async (token) => {
  const sql = `DELETE FROM tokens WHERE token = '${token}'`
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result)
    })
  })
};

// const scheduleCleanup = () => {
//   setInterval(async () => {
//     const oneWeekAgo = new Date(Date.now() - ONE_WEEK_IN_MILLIS);
//     await DESTROY TOKEN WHERE LAST USED AT IS LESS THAN ONE WEEK AGO
//   }, 60 * 60 * 1000);
// };

const clearTokens = async (userId) => {
  await Token.destroy({ where: { userId: userId } });
};