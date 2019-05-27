const path = require("path");
const ChunkRenamePlugin = require("../../lib/");

module.exports = {
    context: __dirname,
    entry: {
        init: "./src/init.js",
        vendor: "./src/vendor.js"
    },

    output: {
        path: path.resolve(__dirname, "..", "tmp"),
        filename: "[name]-[chunkhash].js",
        chunkFilename: "chunk-[name]-[chunkhash].js"
    },

    plugins: [
        new ChunkRenamePlugin({
            init: "init.js",
            login: "chunk-[name]-page.js"
        })
    ]
};
