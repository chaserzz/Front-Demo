function loader1(content){

  return content + `\nconsole.log("loader-1")`;
}

module.exports = loader1;