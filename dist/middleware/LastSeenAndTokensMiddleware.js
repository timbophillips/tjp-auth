import { GenerateTokens } from '../tools/GenerateTokens.js';
import { activeDB } from '../server.js';
import { AlertLevel, CustomLogger } from '../tools/ConsoleLogger.js';
export async function LastSeenAndTokensMiddleware(request, response) {
    const logger = CustomLogger("Token Generating Middleware");
    const user = request.user;
    const data = response.data || [];
    const message = response.message || 'no message';
    const error = response.error;
    if (error) {
        logger("Error logged", AlertLevel.warning);
        logger(`Error message: ${error} | ${message}`);
        response.clearCookie('refresh-token').status(200).send({ message, error });
    }
    else {
        let payload;
        if (user) {
            logger(`responding with tokens for user ${user.username}`);
            // if the user is not a guest (tagged with @ prefix to username) update their last seen in DB
            if (Array.from(user.username)[0] !== '@') {
                await activeDB.UpdateLastSeenDB(user);
            }
            // generate JWT and refresh tokens
            const tokens = await GenerateTokens(user, request.ip);
            // add the refresh token to the database
            await activeDB.AddTokenDB(tokens.refresh_token);
            // assemble payload
            payload = {
                jwt: tokens.jwt,
                user: tokens.user,
                data: data,
                message: message,
                error: error,
                refresh_token: tokens.refresh_token
            };
        }
        else {
            // no user logged in so send a payload without user or tokens
            logger(`responding with no tokens and nobody is logged in`);
            payload = {
                jwt: "",
                data: data,
                message: message,
                error: error,
            };
        }
        response
            .status(200)
            .json(payload);
    }
}
