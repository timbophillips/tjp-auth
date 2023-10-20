import { GenerateTokens } from '../tools/GenerateTokens.js';
import { activeDB } from '../server.js';
import { AlertLevel, CustomLogger } from '../tools/ConsoleLogger.js';
export async function LastSeenAndTokensMiddleware(request, response) {
    const logger = CustomLogger("Token Generating Middleware");
    const user = request.user;
    const data = response.data || {};
    const message = response.message || 'no message';
    const error = response.error;
    // const cookieOptions: CookieOptions = {
    //   sameSite: 'none',
    //   secure: true,
    //   httpOnly: true,
    //   maxAge: 1000 * 60 * 60 * 24 * Number(envVariables.REFRESH_TOKEN_EXPIRES_DAYS),
    // };
    if (error) {
        logger("Error logged", AlertLevel.warning);
        logger(`Error message: ${error} | ${message}`);
        response.clearCookie('refresh-token').status(200).send({ message, error });
    }
    else {
        if (user) {
            // if the user is not a guest (tagged with @ prefix to username) update their last seen in DB
            if (Array.from(user.username)[0] !== '@') {
                await activeDB.UpdateLastSeenDB(user);
            }
            // generate JWT and refresh tokens
            const tokens = await GenerateTokens(user, request.ip);
            // add the refresh token to the database
            await activeDB.AddTokenDB(tokens.refresh_token);
            // send the response
            response
                // .cookie('refresh-token', tokens.refresh_token, cookieOptions)
                .status(200)
                .json({
                jwt: tokens.jwt,
                user: tokens.user,
                data: data,
                message: message,
                error: error,
                refresh_token: tokens.refresh_token
            });
            // log the result to console
        }
        else {
            // if there is no logged in use then just send the response (and take oppurtunity to clear the refresh token)
            response
                .clearCookie('refresh-token')
                .status(200)
                .send({ data, message, error });
            // log the result to console
        }
    }
}
