import { activeDB } from '../server.js';
import { CustomLogger } from '../tools/ConsoleLogger.js';
const logger = CustomLogger('Refresh token functions');
export async function CheckRefreshToken(token) {
    const tokenFromDB = await activeDB.GetRefreshTokenDB(token);
    logger(`${token} matches token from DB with user_id=${tokenFromDB.user}`);
    // if the token has expired then throw an error
    if (new Date(tokenFromDB.expires) < new Date(Date.now())) {
        logger('token expired');
        return null;
    }
    else {
        logger(`token is still valid on time criteria`);
        await activeDB.DeleteTokenDB(token);
        logger(`token removed from DB (can only be used once)`);
        const user = await activeDB.GetUserWithoutPasswordByIdDB(tokenFromDB.user);
        return user;
    }
}
