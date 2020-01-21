const child_process = require("child_process");
const expect = require("chai").expect;
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

const runTest = (webpackBinary, configPath) =>
    new Promise((resolve, reject) => {
        rimraf(path.join(__dirname, "tmp", "*.js"), () => {
            child_process.exec(`${webpackBinary} --config ${configPath}`, {
                cwd: path.resolve(__dirname, "fixtures")
            }, (err, stdout, stderr) => {
                try {
                    expect(err).to.be.a("null");
                    expect(stderr).to.have.length(0);

                    const outputFiles = fs.readdirSync(path.resolve(__dirname, "tmp"));
                    expect(outputFiles).to.include("init.js");
                    expect(outputFiles).to.include("chunk-login-page.js");

                    expect(outputFiles.find((file) => file.startsWith("vendor-"))).to.not.be.a("undefined");
                    expect(outputFiles.find((file) => file.startsWith("chunk-summary-"))).to.not.be.a("undefined");

                    resolve();
                } catch (assertErr) {
                    reject(assertErr);
                }
            });
        });
    });


describe("integration", () => {
    after((done) => {
        rimraf(path.join(__dirname, "tmp", "*.js"), done);
    });

    const webpackEnvs = fs.readdirSync(path.join(__dirname, "deps"));

    webpackEnvs.forEach((webpackEnv) => {
        const version = child_process
            .execSync("npm ls webpack", {
                cwd: path.join(__dirname, "deps", webpackEnv),
                encoding: "utf8"
            })
            .match(/webpack@([0-9.]+)/)[1];

        it(`should work with webpack ${version} with object type options`, () => {
            const webpack1Bin = path.join(__dirname, "deps", webpackEnv, "node_modules", ".bin", "webpack");
            return runTest(webpack1Bin, "webpack.config.js");
        });

        it(`should work with webpack ${version} with function type options`, () => {
            const webpack1Bin = path.join(__dirname, "deps", webpackEnv, "node_modules", ".bin", "webpack");
            return runTest(webpack1Bin, "webpack.config.2.js");
        });
    });
});
