const webpackConfigCommon = require("./webpack.config.common");

module.exports = webpackConfigCommon((chunk) => {
    if (chunk.name === "init") {
        return "init.js";
    }
    if (chunk.name === "login") {
        return "chunk-[name]-page.js";
    }
    return "";
});
