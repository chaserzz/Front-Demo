const Koa = require("./modules/node_modules/koa")
const fs = require("fs")
const path = require("path")
const compilerSFC = require("./modules/node_modules/@vue/compiler-sfc")
const compilerDOM = require("./modules/node_modules/@vue/compiler-dom")
const app = new Koa()

app.use(async ctx => {
  let { url, query } = ctx.request
  if( url === "/" ){
    ctx.type = "text/html"
    ctx.body = fs.readFileSync(path.join(__dirname,"./index.html"),"utf8")
  }else if( url.endsWith(".js")){
    //请求的是一个js文件
    ctx.type = "application/javascript"
    // 修改js文件中的模块导入的路径
    ctx.body = rewriteImport(fs.readFileSync(path.join(__dirname,url),"utf8"))
  }else if( url.startsWith("/@modules/")){
    const modulesName = url.replace("/@modules/","") //获得模块的名称
    const prefix = path.join(__dirname,"./modules/node_modules",modulesName)  //在获得目录的地址
    // 获得对应包下的package.json下的module字段，里面放置对应模块的js文件的地址s
    const modules = require(prefix + "/package.json").module
    const filePath = path.join(prefix, modules)
    const code = fs.readFileSync(filePath,"utf8")  //读取最终的文件，并返回
    ctx.type = "application/javascript"
    ctx.body = rewriteImport(code)
  }else if( url.indexOf(".vue") > -1 ){
    // 对vue文件进行解析
    const p = path.join(__dirname, url.split('?')[0])
    const component = compilerSFC.parse(fs.readFileSync(p,"utf8"))
    if(!query.type){
      //不是解析的template
      // 获得vue文件中的脚本
      const scriptContent = component.descriptor.script.content
      // 替换为默认导出的script对象
      const script = scriptContent.replace("export default","const __script = ")
      ctx.type = "application/javascript"
      ctx.body = `
        ${rewriteImport(script)}
        //解析template
        import {render as __render} from '${url}?type=template'
        __script.render = __render
        export default __script
        `      
    }else if(query.type === 'template'){
      const tpl = component.descriptor.template.content
      const render =compilerDOM.compile(tpl,{mode: "module"}).code   //获得template的值
      ctx.type = "application/javascript"
      ctx.body = rewriteImport(render)
    }
  }
})

// 重写请求模块时的请求地址
/**
 * 
 * @param {string} content 
 * @returns {string}
 */
function rewriteImport (content){
  return content.replace(/ from ['"](.*)['"]/g, function (s1,s2){
    if(s2.startsWith(".") || s2.startsWith("./") || s2.startsWith("../")){
      return s1
    } else {
      return `from '/@modules/${s2}'`
    }
  })
}

app.listen(3000)