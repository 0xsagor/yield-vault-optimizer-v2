const chalk = require('chalk');

function logInfo(tag, msg) {
    console.log(`${chalk.cyan(`[${tag}]`)} ${msg}`);
}

function logSuccess(tag, msg) {
    console.log(`${chalk.green.bold(`[${tag}]`)} ${msg}`);
}

module.exports = { logInfo, logSuccess };
