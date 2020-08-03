const db = require("./db");
const jwt = require("jsonwebtoken")
const secret = 'jwt_secret'

module.exports = async (ctx) => {
  const { username, password } = ctx.request.body
  const result = await checkUserInfo(username, password)
  ctx.body = result;
}

async function getUser(username) {
  const sql = `SELECT id, username, password FROM users WHERE username=?`
  const [result] = await db.getDB().execute(sql, [username])
  return result
}

async function checkUserInfo (username, password) {
  let [result] = await getUser(username)
  if (username === result.username && password === result.password) {
    let token = jwt.sign({uid:result.id}, secret, {
      expiresIn: '2h'
    })
    result = {
      code: 1,
      msg: {
        username: result.username,
        token: token
      }
    }
    return result;
  } else {
    result = {
      code: 2,
      msg: '账号或者密码错误'
    }
    return result
  }
}