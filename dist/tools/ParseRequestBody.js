import { CustomLogger } from '../tools/ConsoleLogger.js';
const logger = CustomLogger('Parse request body data');
export async function GetRequestBodyData({ request, essentials, optionals, }) {
    const returnMap = new Map();
    essentials.forEach((key) => {
        logger(`the key is ${key}`);
        const value = request.body[key];
        logger(`the value is ${value}`);
        returnMap.set(key, value);
    });
    optionals.forEach((key) => {
        logger(`the key is ${key}`);
        const value = request.body[key];
        logger(`the value is ${value}`);
        returnMap.set(key, value);
    });
    return returnMap;
}
