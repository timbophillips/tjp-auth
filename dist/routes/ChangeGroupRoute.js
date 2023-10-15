import { activeDB } from '../server.js';
// import { UpdateGroupDB } from '../database/databaseFactory.js';
export async function ChangeGroupRoute(request, response, next) {
    // check that someone is logged in
    if (!request.user) {
        response.error = 'Authorization';
        response.message = 'Not authorized to change group (not logged in)';
        return next();
    }
    else {
        // check request data
        const newGroup = request.body['newGroup'];
        if (!newGroup) {
            response.error = 'Invalid JSON';
            response.message = 'new group (newGroup) was not provided in POSTed JSON';
            return next();
        }
        const IdOfUserThatIsChangingGroup = request.body['userid'];
        if (!IdOfUserThatIsChangingGroup) {
            response.error = 'Invalid JSON';
            response.message =
                'ID (of the user who is changing groups (userid) was not provided in POSTed JSON';
            return next();
        }
        // get logged in user (put in request by AuthenticationMiddleware.ts)
        const loggedInUser = request.user;
        // check that logged in user is allowed to do this
        if (loggedInUser.role !== 'admin') {
            response.error = 'Authorization';
            response.message = `only an admin can change a user's group`;
            return next();
        }
        // if we have made it this far then change the group
        const updatedUser = await activeDB.UpdateGroupDB(IdOfUserThatIsChangingGroup, newGroup);
        // put data in response for middleware
        response.data = { updatedUser: updatedUser };
        response.message = `${updatedUser.username}'s group changed to ${newGroup}`;
        // onward with the next bit of middleware
        return next();
    }
}
