const Koa = require("koa")
const Router = require("koa-router")
const koaJwt = require("koa-jwt")
const serve = require("koa-static")
const koaBody = require("koa-body")
const userLogin = require('./lib/userLogin');
const upload = require('./lib/upload');
const getPhotos = require('./lib/getPhotos');
const {initDB} = require('./lib/db');
const secret = 'jwt_secret'

initDB();

const app = new Koa()
app.use(serve(__dirname+"/static"))
app.use(koaBody({
    multipart:true
}))
app.use(function(ctx, next){
    return next().catch((err) => {
      // console.log(err.status);
      if (401 == err.status) {
        ctx.status = 401;
        ctx.body = {
            status:401,
            msg:'登录过期，请重新登录'
        }
      } else {
        throw err;
      }
    });
  });
app.use(
    koaJwt({
        secret
    }).unless({
        path: [/^\/login/]
    })
)

const router = new Router()

router.post("/login", userLogin)
router.post("/upload", upload)
router.get("/getPhotos", getPhotos)

app.use(router.routes())
app.listen(8080,()=>{
    console.log("open server localhost:8080")
})
