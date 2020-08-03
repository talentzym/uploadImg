const { getDB } = require("./db");
module.exports = async (ctx) => {
  const uid = ctx.state.user.uid
  const sql = `SELECT * FROM photos WHERE uid=?`;
  const [rows] = await getDB().execute(sql, [uid]);

  ctx.body = {
    state: 1,
    data: [...rows],
  };
};
