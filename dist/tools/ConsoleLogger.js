import chalk from 'chalk';
const AlertLevelChalk = {
    info: chalk.green,
    warning: chalk.yellow,
    problem: chalk.red
};
export var AlertLevel;
(function (AlertLevel) {
    AlertLevel["info"] = "info";
    AlertLevel["warning"] = "warning";
    AlertLevel["problem"] = "problem";
})(AlertLevel || (AlertLevel = {}));
export const ConsoleLogger = async ({ title, message, level = AlertLevel.info }) => {
    console.log(chalk.gray.bold(title) + ": " + AlertLevelChalk[level](message));
};
export const CustomLogger = (title) => (message, level) => ConsoleLogger({ title, message, level: level || AlertLevel.info });
