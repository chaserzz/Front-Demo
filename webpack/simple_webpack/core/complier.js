const { SyncHook } = require("tapable");
const path = require('path');
const {toUnixPath,tryExtensions,getSourceCode} = require('./utils/index');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const t = require('@babel/types');
const fs = require('fs');
class Complier{
  constructor(options){
    this.options = options; //保存配置选项
    this.rootPath = toUnixPath(options.context || process.cwd())
    this.hooks = {
      // 开始编译时的钩子
      run: new SyncHook(),
      // 写出文件之前的钩子
      emit: new SyncHook(),
      // 在complication完成时执行的钩子 全部完成编译执行
      done: new SyncHook()
    }
    // 保存所有入口模块对象
    this.entries = new Set();
    // 保存所有依赖模块对象
    this.modules = new Set();
    // 所有的代码块对象
    this.chunks = new Set();
    // 存放本次产出的文件对象
    this.assets = new Set();
    // 存放本次编译所有产出的文件名
    this.files = new Set();
  }

  // run 方法有一个callback
  run(callback){
    this.hooks.run.call(); //执行run时挂载的plugin
    //开始从入口文件进行编译
    // 获得入口文件的绝对地址的map
    const entry = this.getEntry();
    //开始编译
    this.buildEntryModule(entry);
    // 导出列表;之后将每个chunk转化称为单独的文件加入到输出列表assets中
    this.exportFile(callback);
  }

  // 获取入口文件并且开始编译
  getEntry(){
    let entry = Object.create(null);
    // 如果配置的entry为一个字符串，则说明只有一个入口
    if(typeof this.options.entry === 'string'){
      entry['main'] = this.options.entry;
    }else{
      entry = this.options.entry;
    }
    Object.keys(entry).forEach(key => {
      const value = entry[key]; 
      // 配置的路径不是绝对路径则需要获取绝对路径
      if(! path.isAbsolute(value)){
        // 通过项目配置的基础路径以及对应的loader或者entry的相对路径来获得对应的文件
        entry[key] = path.join(this.rootPath,value);
      }
    });
    return entry;
  }

  //开始分析入口文件
  buildEntryModule(entrys){
    // 查看loader并开始使用loader对文件进行解析
    Object.keys(entrys).forEach(entryName => {
      const entryPath = entrys[entryName];
      const entry = this.buildModule(entryName,entryPath);
      this.entries.add(entry);
      this.buildUpChunk(entryName,entry)
    });
  }

  //开始分析模块
  buildModule(moduleName, modulePath){
    // 通过fs文件来获得对应的文件内容
    // 原始代码
    const originSourceCode = (this.originSourceCode  = fs.readFileSync(modulePath,'utf-8'));
    // 修改后的代码
    this.moduleCode = originSourceCode;
    //调用loader对代码进行操作
    this.handleLoader(modulePath);
    // 调用webpack对模块进行分析
    const module = this.handleWebpackCompiler(moduleName,modulePath);
    return module;
  }

  // 调用loader对文件进行修改
  handleLoader(modulePath){
    if(this.options.module && Array.isArray(this.options.module.rules)){
      const matchLoader = []
      this.options.module.rules.forEach(rule => {
        const ruleTest = rule.test;
        // loader的test匹配上了文件
        // 首先匹配上rules下的rule配置的正则表达式
        if(ruleTest.test(modulePath)){
          // 仅考虑loader { test:/\.js$/g, use:['babel-loader'] }, { test:/\.js$/, loader:'babel-loader' }
          if(rule.loader){
            matchLoader.push(rule.loader);
          }else{
            matchLoader.push(...rule.use);
          }
        }
      });
      // 进行倒序调用loader
      this.moduleCode = matchLoader.reduceRight((preCode,loaderPath) => {
        //关键步骤，获取插件，使用required
        const loaderFunc = require(loaderPath);
        const nextCode = loaderFunc(preCode);
        if(typeof nextCode !== 'string'){
          throw new Error(`${loaderPath} need to return a javascript string`)
        }
        return nextCode;
      },this.moduleCode);
    }
  }

  // webpack的模块分析
  handleWebpackCompiler(moduleName,modulePath){
    // 将当前模块相对于项目启动根目录计算出相对路径 作为模块ID
    const moduleId = './' + path.posix.relative(this.rootPath, modulePath);
    //创建模块对象
    const module = {
      id: moduleId,
      dependencies: new Set(), // 该模块所依赖模块绝对路径地址
      name: [moduleName], // 该模块所属的入口文件
    };
    // 调用babel分析我们的代码
    const ast = parser.parse(this.moduleCode, {
      sourceType: 'module',
    });
    // 深度优先 遍历语法Tree
    traverse(ast,{
      CallExpression: (nodePath) => {
        const node = nodePath.node;
        if (node.callee.name === 'require') {
          // 获得源代码中引入模块相对路径
          const requirePath = node.arguments[0].value;
          // 寻找模块绝对路径 当前模块路径+require()对应相对路径
          const moduleDirName = path.posix.dirname(modulePath);
          const absolutePath = tryExtensions(
            path.posix.join(moduleDirName, requirePath),
            this.options.resolve.extensions,
            requirePath,
            moduleDirName);
          // 生成moduleId - 针对于跟路径的模块ID 添加进入新的依赖模块路径
          const moduleId = './' + path.posix.relative(this.rootPath,absolutePath);
          // 通过babel修改源代码中的require变成__webpack_require__语句
          node.callee = t.identifier('__webpack_require__');
          // 修改源代码中require语句引入的模块 全部修改变为相对于跟路径来处理
          node.arguments = [t.stringLiteral(moduleId)];
          //判断文件是否已经被添加到依赖文件中一次
          const moduleIds = Array.from(this.modules).map(module => module.id);
          if(moduleIds.includes(moduleId)){
            //模块已经存在则只需要将当前模块的新的依赖的入口文件加入到对应name中
            this.modules.forEach(module => {
              if(module.id === moduleId){
                module.name.push(moduleName)
              }
            })
          }else{
            // 为当前模块添加require语句造成的依赖(内容为相对于根路径的模块ID)
            module.dependencies.add(moduleId);
          }
        }
      }
    });
    // 遍历结束根据AST生成新的代码
    const { code } = generator(ast);
    // 为当前模块挂载新的生成的代码
    module._source = code;
    // 递归遍历获取对应的依赖文件的code
    module.dependencies.forEach(dependency => {
      const depModule = this.buildModule(moduleName, dependency);
      this.modules.add(depModule);
    });
    // 返回当前模块对象
    return module
  }

  // 根据模块进行打包
  buildUpChunk(entryName, entryObj){
    const chunk = {
      name: entryName, // 每一个入口文件作为一个chunk
      entryModule: entryObj, // entry编译后的对象
      modules: Array.from(this.modules).filter((i) =>
        i.name.includes(entryName)
      ), // 寻找与当前entry有关的所有module
    };
    // 将chunk添加到this.chunks中去
    this.chunks.add(chunk);
  }

  // 输出文件
  exportFile(callback){
    const output = this.options.output;
    this.chunks.forEach(chunk => {
      const parseFileName = output.filename.replace('[name]', chunk.name);
      this.assets[parseFileName] = getSourceCode(chunk);
    });
    // 调用Plugin emit钩子
    this.hooks.emit.call();
    // 先判断目录是否存在 存在直接fs.write 不存在则首先创建
    if (!fs.existsSync(output.path)) {
      fs.mkdirSync(output.path);
    }
    // files中保存所有的生成文件名
    this.files = Object.keys(this.assets);
    // 将assets中的内容生成打包文件 写入文件系统中
    Object.keys(this.assets).forEach((fileName) => {
      const filePath = path.join(output.path, fileName);
      fs.writeFileSync(filePath, this.assets[fileName]);
    });
    // 结束之后触发钩子
    this.hooks.done.call();
    callback(null, {
      toJson: () => {
        return {
          entries: this.entries,
          modules: this.modules,
          files: this.files,
          chunks: this.chunks,
          assets: this.assets,
        };
      },
    });
  }
}

module.exports = Complier