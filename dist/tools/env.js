import * as dotenv from 'dotenv';
import chalk from 'chalk';
// import { AlertLevel, CustomLogger } from '../tools/ConsoleLogger.js';
// const logger = CustomLogger('Environment variable function');
export function env(defaultVariables, log = true) {
    let resultVariables = { ...defaultVariables };
    let processEnvVariables = { ...defaultVariables };
    let dotEnvVariables = { ...defaultVariables };
    let whichOneUsedSoFar = { ...defaultVariables };
    let key;
    let pkey;
    let dkey;
    let dfkey;
    // log the heading for default variables
    if (log) {
        console.log(' ');
        console.log(chalk.bold.underline(`${chalk.grey('Default  Variables coded in server')} `));
    }
    // log default variables
    for (dfkey in defaultVariables) {
        whichOneUsedSoFar[dfkey] = 'default';
        if (log) {
            console.log(chalk.gray(`${dfkey}: `) + chalk.blue(defaultVariables[dfkey]));
        }
    }
    // log the heading for environment variables
    if (log) {
        console.log(' ');
        console.log(chalk.bold.underline(`${chalk.grey('Relevant Environment Variables')} `));
    }
    // get relevant variables from process.env (and log)
    for (pkey in resultVariables) {
        processEnvVariables[pkey] = process.env[pkey];
        if (process.env[pkey]) {
            whichOneUsedSoFar[pkey] = 'process';
        }
        if (log) {
            console.log(chalk.gray(`${pkey}: `) + chalk.greenBright(process.env[pkey]));
        }
    }
    // log the heading for .env file variables
    if (log) {
        console.log(' ');
        console.log(chalk.bold.underline(`${chalk.grey('Variables from .env file')} `));
    }
    // get relevant variables from dotenv (.env file)
    const dotenvResult = dotenv.config().parsed;
    if (!dotenvResult && log) {
        console.log(`${chalk.red('(no .env file found)')}`);
    }
    for (dkey in dotEnvVariables) {
        if (dotenvResult && dotenvResult[dkey]) {
            whichOneUsedSoFar[dkey] = 'dotenv';
        }
        dotEnvVariables[dkey] = dotenvResult ? dotenvResult[dkey] : '-';
        if (log) {
            console.log(chalk.gray(`${dkey}: `) + chalk.yellowBright(dotEnvVariables[dkey]));
        }
    }
    if (log) {
        console.log(' ');
        console.log(chalk.bold.underline(`${chalk.grey('Variables used by server...')} `));
    }
    for (key in resultVariables) {
        // const defaultValueUsed: boolean = !process.env[key];
        resultVariables[key] = process.env[key] || resultVariables[key];
        if (log) {
            console.log(chalk.gray(`${key}: `) +
                (whichOneUsedSoFar[key] === 'default'
                    ? chalk.blueBright(resultVariables[key])
                    : whichOneUsedSoFar[key] === 'process'
                        ? chalk.greenBright(resultVariables[key])
                        : chalk.yellowBright(resultVariables[key])));
        }
    }
    if (log) {
        console.log(' ');
    }
    return resultVariables;
}
