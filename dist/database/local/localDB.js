import jsonfile from 'jsonfile';
const { readFile, writeFile } = jsonfile;
import { access } from 'node:fs/promises';
import { CustomLogger } from '../../tools/ConsoleLogger.js';
const logger = CustomLogger('Local database');
let databaseFilename;
let database = {
    users: [],
    tokens: [],
};
export const localDBObject = {
    AddTokenDB: inMemoryAddTokenDB,
    AddUserDB: inMemoryAddUserDB,
    CheckUserExistsDB: inMemoryCheckUserExistsDB,
    DeleteAllTokensOfUserDB: inMemoryDeleteAllTokensOfUserDB,
    DeleteTokenDB: inMemoryDeleteTokenDB,
    DeleteUserDB: inMemoryDeleteUserDB,
    GetAllUsersDB: inMemoryGetAllUsersDB,
    GetOnlineUsersDB: inMemoryGetOnlineUsersDB,
    GetRefreshTokenDB: inMemoryGetRefreshTokenDB,
    GetUserDB: inMemoryGetUserDB,
    GetUserWithoutPasswordByIdDB: inMemoryGetUserWithoutPasswordByIdDB,
    UpdateGroupDB: inMemoryUpdateGroupDB,
    UpdateLastSeenDB: inMemoryUpdateLastSeenDB,
    UpdatePasswordDB: inMemoryUpdatePasswordDB,
    UpdateRoleDB: inMemoryUpdateRoleDB,
    ConnectDB: inMemoryConnectDB,
    SeedDB: SeedDB,
};
const readDatabaseFile = async () => {
    if (databaseFilename) {
        try {
            await access(databaseFilename);
            const databaseFileContents = await readFile(databaseFilename);
            logger(`from the file `);
            console.table(databaseFileContents['users']);
            console.table(databaseFileContents['tokens']);
            database = databaseFileContents || database;
        }
        catch {
            logger(`${databaseFilename} doesn't exist`);
        }
        return true;
    }
    else {
        logger(`no database filename provided in environment variables`);
        return false;
    }
};
const writeDatabaseFile = async () => writeFile(databaseFilename, database)
    .then((x) => {
    logger(`written JSON to database local file`);
    return x;
})
    .catch((e) => {
    logger(`error in writing JSON to database local file`);
    console.error(e);
});
export async function SeedDB(seedData) {
    database.users = seedData;
    logger(`In Memory Database seeded with provided users...`);
    logger(`writing data to disk`);
    await writeDatabaseFile();
    return (await inMemoryGetAllUsersDB());
}
async function inMemoryConnectDB(filename) {
    databaseFilename = filename;
    logger(`Parsng and local database file: ${databaseFilename}....`);
    await readDatabaseFile();
    return { up: true, message: `local (file based) database active` };
}
async function inMemoryGetAllUsersDB() {
    // await readDatabaseFile();
    return database.users.map((user) => {
        // ES6 sorcery to remove password
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    });
}
async function inMemoryGetUserDB(username) {
    // await readDatabaseFile();
    const user = database.users.filter((user) => user.username === username)[0];
    if (user) {
        logger(`username ${user.username} matched to userid=${user.id} in DB`);
        return user;
    }
    else {
        logger(`username ${username} not found in DB`);
        return null;
    }
}
async function inMemoryGetUserWithoutPasswordByIdDB(id) {
    // await readDatabaseFile();
    const idNumber = typeof id === 'string' ? +id : id;
    const user = database.users.filter((user) => user.id === idNumber)[0];
    if (user) {
        logger(`username ${user.username} matched to userid=${user.id} in DB`);
        // ES6 sorcery to remove password
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    else {
        logger(`user id ${idNumber.toString()} not found in DB`);
        return null;
    }
}
async function inMemoryCheckUserExistsDB(username) {
    // await readDatabaseFile();
    const user = database.users.filter((user) => user.username === username)[0];
    if (user) {
        logger(`username ${user.username} matched to userid=${user.id} in DB (to check exists)`);
        return true;
    }
    else {
        logger(`username ${username} not found in DB (so doesn't exist)`);
        return false;
    }
}
async function inMemoryAddUserDB(newUser) {
    // await readDatabaseFile();
    // get highest id value in array
    const highestID = Math.max(...database.users.map((user) => user.id));
    // set the new "id" as one higher
    const newID = highestID ? highestID + 1 : 1;
    // construct the User to add
    const userToAdd = Object.assign(newUser, {
        id: newID,
        created_at: new Date(),
        last_seen: new Date(),
    });
    // add it to the database
    database.users.push(userToAdd);
    // ES6 sorcery to remove password
    const { password: _, ...userWithoutPassword } = userToAdd;
    // return user without password
    writeDatabaseFile();
    return userWithoutPassword;
}
async function inMemoryUpdatePasswordDB(
// note that this function is agnostic
// to the encryption and should recieve the
// already encrypted version of the password
userid, newHashPassword) {
    // await readDatabaseFile();
    let alteredUser;
    // update the password
    database.users = database.users.map((user) => {
        if (user.id === userid) {
            user.password = newHashPassword;
            alteredUser = user;
            logger(`user matched to ${user.username} in in-memory database and password changed`);
        }
        return user;
    });
    if (alteredUser) {
        // ES6 sorcery to remove password
        const { password: _, ...userWithoutPassword } = alteredUser;
        writeDatabaseFile();
        return userWithoutPassword;
    }
    else {
        throw new Error(`user ID ${userid} not found in in-memory database`);
    }
}
async function inMemoryUpdateGroupDB(userid, newGroup) {
    // await readDatabaseFile();
    let alteredUser;
    // update the group
    database.users = database.users.map((user) => {
        if (user.id === userid) {
            user.group = newGroup;
            alteredUser = user;
            logger(`user matched to ${user.username} in in-memory database and group changed to ${newGroup}`);
        }
        return user;
    });
    if (alteredUser) {
        // ES6 sorcery to remove password
        const { password: _, ...userWithoutPassword } = alteredUser;
        writeDatabaseFile();
        return userWithoutPassword;
    }
    else {
        throw new Error(`user ID ${userid} not found in in-memory database`);
    }
}
async function inMemoryUpdateLastSeenDB(user) {
    // await readDatabaseFile();
    const userid = typeof user === 'number' ? user : user.id;
    const today = new Date();
    let alteredUser;
    // update the password
    database.users = database.users.map((user) => {
        if (user.id === userid) {
            user.last_seen = today;
            alteredUser = user;
            logger(`user matched to ${user.username} in in-memory database and last seen changed to ${today}`);
        }
        return user;
    });
    if (alteredUser) {
        // ES6 sorcery to remove password
        const { password: _, ...userWithoutPassword } = alteredUser;
        writeDatabaseFile();
        return userWithoutPassword;
    }
    else {
        throw new Error(`user ID ${userid} not found in in-memory database`);
    }
}
async function inMemoryUpdateRoleDB(user, newRole) {
    // await readDatabaseFile();
    const userid = typeof user === 'number' ? user : user.id;
    let alteredUser;
    // update the password
    database.users = database.users.map((user) => {
        if (user.id === userid) {
            user.role = newRole;
            alteredUser = user;
            logger(`user matched to ${user.username} in in-memory database and role changed to ${newRole}`);
        }
        return user;
    });
    if (alteredUser) {
        // ES6 sorcery to remove password
        const { password: _, ...userWithoutPassword } = alteredUser;
        writeDatabaseFile();
        return userWithoutPassword;
    }
    else {
        throw new Error(`user ID ${userid} not found in in-memory database`);
    }
}
async function inMemoryDeleteUserDB(user) {
    // await readDatabaseFile();
    const userid = typeof user === 'number' ? user : user.id;
    const userIndex = database.users.findIndex((eachUser) => eachUser.id === userid);
    if (userIndex > -1) {
        const deletedUser = database.users[userIndex];
        database.users.splice(userIndex, 1);
        logger(`${deletedUser?.username} has been deleted from in-memory database`);
        writeDatabaseFile();
        return true;
    }
    else {
        throw new Error(`user ID ${userid} not found in in-memory database`);
    }
}
async function inMemoryGetOnlineUsersDB() {
    // await readDatabaseFile();
    const aMinuteAgo = new Date(Date.now() - 1000 * 60);
    const recentlySeenUsers = [];
    database.users.forEach((user) => {
        if (user.last_seen > aMinuteAgo) {
            // ES6 sorcery to remove password
            const { password: _, ...userWithoutPassword } = user;
            recentlySeenUsers.push(userWithoutPassword);
        }
    });
    return recentlySeenUsers;
}
async function inMemoryAddTokenDB(token) {
    // add it to the database
    database.tokens.push(token);
    writeDatabaseFile();
    return token;
}
async function inMemoryGetRefreshTokenDB(tokenString) {
    // await readDatabaseFile();
    const token = database.tokens.find((token) => token.token === tokenString);
    if (!token) {
        throw new Error('GetRefreshTokenDB failed');
    }
    return token;
}
async function inMemoryDeleteTokenDB(tokenString) {
    // await readDatabaseFile();
    const tokenIndex = database.tokens.findIndex((token) => token.token === tokenString);
    const tokenToDelete = database.tokens[tokenIndex];
    if (!tokenToDelete) {
        throw new Error('GetRefreshTokenDB failed');
    }
    else {
        database.tokens.splice(tokenIndex, 1);
        writeDatabaseFile();
        return tokenToDelete;
    }
}
async function inMemoryDeleteAllTokensOfUserDB(userId) {
    // await readDatabaseFile();
    const deletedTokens = database.tokens.filter((token) => token.user === userId);
    database.tokens = database.tokens.filter((token) => token.user !== userId);
    writeDatabaseFile();
    return deletedTokens;
}
