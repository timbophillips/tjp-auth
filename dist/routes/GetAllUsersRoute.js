import { activeDB } from '../server.js';
export async function GetAllUsersRoute(request, response, next) {
    const loggedInUser = request.user;
    let data;
    let message;
    if (loggedInUser) {
        if (loggedInUser.role === 'admin') {
            data = await activeDB.GetAllUsersDB();
            message = 'admin users can view all users';
        }
        else {
            data = [await activeDB.GetUserDB(loggedInUser.username)];
            message = 'non-admin users can only view themselves';
        }
    }
    else {
        message = 'no user is logged in';
        data = [];
    }
    response.data = data;
    response.message = message;
    return next();
}
