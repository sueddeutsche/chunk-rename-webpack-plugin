console.log("Hello, welcome to my app. I am loader and I require all other chunks that my page is built of");

// eslint-disable-next-line
require.ensure(["./loginPage"], function () {
    const loginPage = require("./loginPage");
    console.log(loginPage);
}, "login");

// eslint-disable-next-line
require.ensure(["./summaryPage"], function () {
    const summaryPage = require("./summaryPage");
    console.log(summaryPage);
}, "summary");
