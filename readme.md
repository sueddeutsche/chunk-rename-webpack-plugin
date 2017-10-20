# chunk-rename-webpack-plugin

[![npm version](https://badge.fury.io/js/chunk-rename-webpack-plugin.svg)](https://badge.fury.io/js/chunk-rename-webpack-plugin)
[![devDependencies Status](https://david-dm.org/sueddeutsche/chunk-rename-webpack-plugin/dev-status.svg)](https://david-dm.org/sueddeutsche/chunk-rename-webpack-plugin?type=dev)
[![Build Status](https://travis-ci.org/sueddeutsche/chunk-rename-webpack-plugin.svg?branch=master)](https://travis-ci.org/sueddeutsche/chunk-rename-webpack-plugin)
[![Coverage Status](https://coveralls.io/repos/github/sueddeutsche/chunk-rename-webpack-plugin/badge.svg?branch=master)](https://coveralls.io/github/sueddeutsche/chunk-rename-webpack-plugin?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This plugin allows you to rename specific chunks in your bundle independently from the configuration you set in `output.filename` and `output.chunkFilename`. Works with webpack 1+.

## Use cases
In general: Your output file names do not follow a consistent pattern.
* You want to hash all but one of your files (e.g. you have a file `init.js`, that needs a static name, but all other files should be hashed)
* You want some files to use the module name (`[name]`) and some files to use the module id (`[id]`)
* And others ... 

# Compatiblity
This plugin is tested with the following module/runtime versions:
* webpack 1.15.0, 2.5.1, 3.8.1
* Node.js 4+ (older Node.js versions and io.js do not work - sorry)

## Usage
```js
const path = require("path");
const ChunkRenamePlugin = require("chunk-rename-webpack-plugin");

module.exports = {
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
```

Result:
```
Hash: 8f17bb6534edbcdd963e
Version: webpack 1.15.0
Time: 73ms
                          Asset       Size  Chunks             Chunk Names
                        init.js     4.2 kB       0  [emitted]  init
            chunk-login-page.js  117 bytes       1  [emitted]  login
summary-8079db00b7b1bd6a78e6.js  113 bytes       2  [emitted]  summary
 vendor-ae2570120d44d2ba301c.js    1.43 kB       3  [emitted]  vendor
   [0] ./src/init.js 440 bytes {0} [built]
   [0] ./src/vendor.js 39 bytes {3} [built]
   [1] ./src/loginPage.js 30 bytes {1} [built]
   [2] ./src/summaryPage.js 32 bytes {2} [built]
```

The only argument for the plugin is an object that maps chunk names (as displayed in the webpack output) to filename templates. You can use all placeholders available for `output.filename` in case you want to rename an entry chunk. If you want to rename a non-entry chunk you can use all variables available in `output.chunkFilename`.

## Development
To be able to run the tests via `npm test` you have to call `npm run preparetest` beforehand. This installs webpack 1 and 2 into seperate folders (that's why they are not listed as devDependencies in the main package.json).

## Thanks
This plugin is heavily inspired by the core `CommonsChunkPlugin`. Thanks to all webpack contributors for that!
