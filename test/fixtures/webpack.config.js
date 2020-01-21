const webpackConfigCommon = require("./webpack.config.common");

module.exports = webpackConfigCommon({
    init: "init.js",
    login: "chunk-[name]-page.js"
});
