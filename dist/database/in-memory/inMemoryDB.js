let inMemoryUsersDatabase = [];
let inMemoryRefreshTokenDatabase = [];
export async function inMemoryInitAndSeedDB({ seedData, uri, }) {
    inMemoryUsersDatabase = seedData;
    console.log(uri ? `provided uri (${uri}) ignored` : "");
    console.log(`In Memory Database seeded with provided users...`);
}
export async function inMemoryConnectDB(_uri) {
    return { up: true, message: `In-memory database (no persistence) active` };
}
export async function inMemoryGetAllUsersDB() {
    console.log(`GetAllUsersDB called from inMemoryDB`);
    return inMemoryUsersDatabase.map(user => {
        // ES6 sorcery to remove password
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    });
}
export async function inMemoryGetUserDB(username) {
    const user = inMemoryUsersDatabase.filter(user => user.username === username)[0];
    if (user) {
        console.log(`username ${user.username} matched to userid=${user.id} in DB`);
        return user;
    }
    else {
        console.log(`username ${username} not found in DB`);
        return null;
    }
}
export async function inMemoryGetUserWithoutPasswordByIdDB(id) {
    const idNumber = typeof id === 'string' ? +id : id;
    const user = inMemoryUsersDatabase.filter(user => user.id === idNumber)[0];
    if (user) {
        console.log(`username ${user.username} matched to userid=${user.id} in DB`);
        // ES6 sorcery to remove password
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    else {
        console.log(`user id ${idNumber.toString()} not found in DB`);
        return null;
    }
}
;
export async function inMemoryCheckUserExistsDB(username) {
    const user = inMemoryUsersDatabase.filter(user => user.username === username)[0];
    if (user) {
        console.log(`username ${user.username} matched to userid=${user.id} in DB (to check exists)`);
        return true;
    }
    else {
        console.log(`username ${username} not found in DB (so doesn't exist)`);
        return false;
    }
}
export async function inMemoryAddUserDB(newUser) {
    // get highest id value in array
    const highestID = Math.max(...inMemoryUsersDatabase.map(user => user.id));
    // set the new "id" as one higher
    const newID = highestID ? highestID + 1 : 1;
    // construct the User to add
    const userToAdd = Object.assign(newUser, {
        id: newID,
        created_at: new Date(),
        last_seen: new Date(),
    });
    // add it to the database
    inMemoryUsersDatabase.push(userToAdd);
    // ES6 sorcery to remove password
    const { password: _, ...userWithoutPassword } = userToAdd;
    // return user without password
    return userWithoutPassword;
}
export async function inMemoryUpdatePasswordDB(
// note that this function is agnostic
// to the encryption and should recieve the
// already encrypted version of the password
userid, newHashPassword) {
    let alteredUser;
    // update the password
    inMemoryUsersDatabase = inMemoryUsersDatabase.map(user => {
        if (user.id === userid) {
            user.password = newHashPassword;
            alteredUser = user;
            console.log(`user matched to ${user.username} in in-memory database and password changed`);
        }
        ;
        return user;
    });
    if (alteredUser) {
        // ES6 sorcery to remove password
        const { password: _, ...userWithoutPassword } = alteredUser;
        return userWithoutPassword;
    }
    else {
        throw new Error(`user ID ${userid} not found in in-memory database`);
    }
}
export async function inMemoryUpdateGroupDB(userid, newGroup) {
    let alteredUser;
    // update the group
    inMemoryUsersDatabase = inMemoryUsersDatabase.map(user => {
        if (user.id === userid) {
            user.group = newGroup;
            alteredUser = user;
            console.log(`user matched to ${user.username} in in-memory database and group changed to ${newGroup}`);
        }
        ;
        return user;
    });
    if (alteredUser) {
        // ES6 sorcery to remove password
        const { password: _, ...userWithoutPassword } = alteredUser;
        return userWithoutPassword;
    }
    else {
        throw new Error(`user ID ${userid} not found in in-memory database`);
    }
}
export async function inMemoryUpdateLastSeenDB(user) {
    const userid = typeof user === 'number' ? user : user.id;
    const today = new Date();
    let alteredUser;
    // update the password
    inMemoryUsersDatabase = inMemoryUsersDatabase.map(user => {
        if (user.id === userid) {
            user.last_seen = today;
            alteredUser = user;
            console.log(`user matched to ${user.username} in in-memory database and last seen changed to ${today}`);
        }
        ;
        return user;
    });
    if (alteredUser) {
        // ES6 sorcery to remove password
        const { password: _, ...userWithoutPassword } = alteredUser;
        return userWithoutPassword;
    }
    else {
        throw new Error(`user ID ${userid} not found in in-memory database`);
    }
}
export async function inMemoryUpdateRoleDB(user, newRole) {
    const userid = typeof user === 'number' ? user : user.id;
    let alteredUser;
    // update the password
    inMemoryUsersDatabase = inMemoryUsersDatabase.map(user => {
        if (user.id === userid) {
            user.role = newRole;
            alteredUser = user;
            console.log(`user matched to ${user.username} in in-memory database and role changed to ${newRole}`);
        }
        ;
        return user;
    });
    if (alteredUser) {
        // ES6 sorcery to remove password
        const { password: _, ...userWithoutPassword } = alteredUser;
        return userWithoutPassword;
    }
    else {
        throw new Error(`user ID ${userid} not found in in-memory database`);
    }
}
export async function inMemoryDeleteUserDB(user) {
    const userid = typeof user === 'number' ? user : user.id;
    const userIndex = inMemoryUsersDatabase.findIndex(eachUser => eachUser.id === userid);
    if (userIndex > -1) {
        const deletedUser = inMemoryUsersDatabase[userIndex];
        inMemoryUsersDatabase.splice(userIndex, 1);
        console.log(`${deletedUser?.username} has been deleted from in-memory database`);
        return true;
    }
    else {
        throw new Error(`user ID ${userid} not found in in-memory database`);
    }
}
export async function inMemoryGetOnlineUsersDB() {
    const aMinuteAgo = new Date(Date.now() - 1000 * 60);
    const recentlySeenUsers = [];
    inMemoryUsersDatabase.forEach(user => {
        if (user.last_seen > aMinuteAgo) {
            // ES6 sorcery to remove password
            const { password: _, ...userWithoutPassword } = user;
            recentlySeenUsers.push(userWithoutPassword);
        }
    });
    return recentlySeenUsers;
}
export async function inMemoryAddTokenDB(token) {
    // add it to the database
    inMemoryRefreshTokenDatabase.push(token);
    return token;
}
export async function inMemoryGetRefreshTokenDB(tokenString) {
    const token = inMemoryRefreshTokenDatabase.find(token => (token.token === tokenString));
    if (!token) {
        throw new Error('GetRefreshTokenDB failed');
    }
    return token;
}
export async function inMemoryDeleteTokenDB(tokenString) {
    const tokenIndex = inMemoryRefreshTokenDatabase.findIndex(token => (token.token === tokenString));
    const tokenToDelete = inMemoryRefreshTokenDatabase[tokenIndex];
    if (!tokenToDelete) {
        throw new Error('GetRefreshTokenDB failed');
    }
    else {
        inMemoryRefreshTokenDatabase.splice(tokenIndex, 1);
        return tokenToDelete;
    }
}
export async function inMemoryDeleteAllTokensOfUserDB(userId) {
    const deletedTokens = inMemoryRefreshTokenDatabase.filter(token => token.user === userId);
    inMemoryRefreshTokenDatabase = inMemoryRefreshTokenDatabase.filter(token => token.user !== userId);
    return deletedTokens;
}
