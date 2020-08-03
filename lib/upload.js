const fs = require("fs");
const path = require("path");
const db = require("./db");
module.exports = async (ctx) => {
  // 保存图片到本地
  const uid = ctx.state.user.uid
  const { img } = ctx.request.files;
  const uploadPath = generateUploadPath(img.name);
  const uploadTime = createNewTime();
  saveImgToUpload(img, uploadPath);
  // 保存到db
  const [rows] = await insertToDB({
    uid,
    imagePath: uploadPath,
    imageName: img.name,
    uploadTime
  });

  if (rows.affectedRows === 1) {
    ctx.body = "上传成功";
  } else {
    ctx.body = "上传失败";
  }
};

async function insertToDB({ uid, imagePath, imageName, uploadTime }) {
  const sql = `INSERT INTO photos (uid, imagePath, imageName, uploadTime) VALUES  (?,?,?,?)`;
  return await db.getDB().execute(sql, [uid, imagePath, imageName, uploadTime]);
}

function generateUploadPath(name) {
  return "/upload/" + createImgName(name);
}

function createImgName(name) {
  return Date.now() + "_" + name;
}

function createNewTime () {
  const date = new Date()
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}

function saveImgToUpload(img, uploadPath) {
  const readStream = fs.createReadStream(img.path);
  const savePath = path.join(__dirname, "../static", uploadPath);
  const writeStream = fs.createWriteStream(savePath);
  readStream.pipe(writeStream);
}
