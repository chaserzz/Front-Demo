const path = require('path');

const appDir = process.cwd();

const resolveApp = (resolvePath) => path.resolve(appDir,resolvePath);

module.exports = resolveApp