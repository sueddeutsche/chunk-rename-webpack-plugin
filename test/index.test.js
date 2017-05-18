const child_process = require("child_process");
const expect = require("chai").expect;
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

describe("chunk-rename-webpack-plugin", () => {
    after((done) => {
        rimraf(path.join(__dirname, "tmp", "*.js"), done);
    });

    it("should work in webpack 1.x.x", () => {
        const webpack1Bin = path.join(__dirname, "deps", "webpack1", "node_modules", ".bin", "webpack");
        return runTest(webpack1Bin, "webpack.config.js");
    });

    it("should work in webpack 2.x.x", () => {
        const webpack2Bin = path.join(__dirname, "deps", "webpack2", "node_modules", ".bin", "webpack");
        return runTest(webpack2Bin, "webpack.config.js");
    });
});

function runTest(webpackBinary, configPath) {
    return new Promise((resolve, reject) => {
        child_process.exec(`${webpackBinary} --config ${configPath}`, {
            cwd: path.resolve(__dirname, "fixtures")
        }, (err, stdout, stderr) => {
            try {
                expect(err).to.be.a("null");
                expect(stderr).to.have.length(0);

                const outputFiles = fs.readdirSync(path.resolve(__dirname, "tmp"));
                expect(outputFiles).to.include("loader.js");
                expect(outputFiles).to.include("chunk-login-page.js");

                expect(outputFiles.find((file) => file.startsWith("vendor-"))).to.not.be.a("undefined");
                expect(outputFiles.find((file) => file.startsWith("chunk-summary-"))).to.not.be.a("undefined");

                resolve();
            } catch (assertErr) {
                reject(assertErr);
            }
        });
    });
}
