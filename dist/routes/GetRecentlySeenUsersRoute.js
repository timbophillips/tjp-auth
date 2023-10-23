import { activeDB } from '../server.js';
import { CustomLogger } from '../tools/ConsoleLogger.js';
const logger = CustomLogger('Recently seen route');
export async function GetRecentlySeenUsersRoute(request, response, next) {
    // get logged in user (put in request by AuthenticationMiddleware.ts)
    const loggedInUser = request.user;
    // check that logged in user is allowed to do this
    if (!loggedInUser) {
        response.error = 'Authorization';
        response.message = 'not logged in';
        response.data = [];
        return next();
    }
    else {
        // check that logged in user is allowed to do this
        if (loggedInUser.role !== 'admin') {
            response.message = 'only an admin user can see all recent users this';
            const allRecentUsers = await activeDB.GetOnlineUsersDB();
            const justTheOnesYoureAllowedToSee = allRecentUsers.filter((user) => user.id === loggedInUser.id);
            logger(`justTheOnesYoureAllowedToSee = ${JSON.stringify(justTheOnesYoureAllowedToSee, null, 2)}`);
            response.data = justTheOnesYoureAllowedToSee;
            next();
        }
        else {
            // if we made it here then check the username
            const data = await activeDB.GetOnlineUsersDB();
            // put data in response for middleware
            response.data = data;
            response.message = `these users have accessed the auth server in the last minute`;
            // onward with the next bit of middleware
            return next();
        }
    }
}
