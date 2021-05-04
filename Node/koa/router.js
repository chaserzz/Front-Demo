const route = require("../../node_modules/koa-route")
const redirect = require("./redirect")  //重定向

// koa框架使用路由
const Home = require("./home")
const About = require("./about")
const message = require("./getMessage")
const useHome = route.get("/",Home.home)
const useAbout = route.get("/about",About.about)
const useImg = route.get("/img",redirect.imgRedirect)
const useGetMsg = route.get("/getMessage",message.message)
module.exports = {
  useHome,
  useAbout,
  useImg,
  useGetMsg
}