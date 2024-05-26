import { CheckRefreshToken } from '../model/CheckRefreshToken.js';
import { CheckCredentials } from '../model/CheckCredentials.js';
import { AlertLevel, CustomLogger } from '../tools/ConsoleLogger.js';
import { activeDB } from '../server.js';
export async function AuthenticateMiddleware(request, response, next) {
    const logger = CustomLogger('Authentication Middleware');
    logger(`${request.method} ${request.path} request received from ${request.ip}`);
    Promise.resolve(request.headers.authorization)
        .then(async (authHeaders) => {
        if (authHeaders) {
            // use the auth headers
            logger('Using Auth Headers in request for authentication');
            const [username, nudePassword] = Buffer.from(authHeaders.split(' ')[1] || '', 'base64')
                .toString()
                .split(':');
            if (!nudePassword || !username) {
                logger('incorrectly formatted auth headers', AlertLevel.problem);
                throw new Error('incorrectly formatted auth headers');
            }
            else {
                return CheckCredentials({ username, nudePassword });
            }
        }
        else {
            // otherwisde look for a refresh token
            logger(JSON.stringify(request.body));
            if (request.body['token']) {
                // lets get the token from the json body
                logger('Using refresh token (json) in request for authentication');
                const userFromRefreshToken = await CheckRefreshToken(request.body['token']);
                if (userFromRefreshToken) {
                    return userFromRefreshToken;
                }
                else {
                    logger('Supplied refresh token is invalid', AlertLevel.warning);
                    throw Error('Invalid refresh token');
                }
            }
            else {
            }
            // otherwise see if its a guest (of a user) login
            const guestofUsername = request.params['username'];
            if (guestofUsername) {
                logger('Guest of user access requsted');
                const userExists = await activeDB.CheckUserExistsDB(guestofUsername);
                if (userExists) {
                    const guestUser = {
                        id: 0,
                        username: `@${guestofUsername}`,
                        group: guestofUsername,
                        role: 'guest',
                        roles: ['guest'],
                        last_seen: new Date(),
                        created_at: new Date(),
                    };
                    return guestUser;
                }
                else {
                    logger('requested host user for guest does not exist', AlertLevel.warning);
                    throw new Error('requested host user for guest does not exist');
                }
            }
            else {
                // if neither is present then bail out
                logger('no auth headers or refresh token or guest request sent', AlertLevel.warning);
                throw new Error('no auth headers or refresh token or guest request sent');
            }
        }
    })
        .then((user) => {
        logger(`${user.username} has been logged in`);
        /// code to put user into request
        request.user = user;
        /// then move to the next bit of middleware
        return next();
    })
        .catch((e) => {
        response.message = e.message;
        // the lack of a request.user will be used by subsequent
        // middleware / routes as a signal that no user is logged in
        logger('No user logged in');
        return next();
    });
}
