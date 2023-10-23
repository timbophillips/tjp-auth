import { MongoClient } from 'mongodb';
import { CustomLogger } from '../tools/ConsoleLogger.js';
const logger = CustomLogger('MongoDB Database');
export const mongodbObject = {
    AddTokenDB: AddTokenDB,
    AddUserDB: AddUserDB,
    CheckUserExistsDB: CheckUserExistsDB,
    DeleteAllTokensOfUserDB: DeleteAllTokensOfUserDB,
    DeleteTokenDB: DeleteTokenDB,
    DeleteUserDB: DeleteUserDB,
    GetAllUsersDB: GetAllUsersDB,
    GetOnlineUsersDB: GetOnlineUsersDB,
    GetRefreshTokenDB: GetRefreshTokenDB,
    GetUserDB: GetUserDB,
    GetUserWithoutPasswordByIdDB: GetUserWithoutPasswordByIdDB,
    UpdateGroupDB: UpdateGroupDB,
    UpdateLastSeenDB: UpdateLastSeenDB,
    UpdatePasswordDB: UpdatePasswordDB,
    UpdateRoleDB: UpdateRoleDB,
    ConnectDB: connectDB,
    SeedDB: SeedDB
};
let usersCollection;
let refreshTokensCollection;
async function SeedDB(seedData) {
    // set up the client
    try {
        // empty out anything that may be in there
        usersCollection.deleteMany({});
        // put the array of Users in to the collection
        const result = await usersCollection.insertMany(seedData, {
            ordered: true,
        });
        // output the result of the insert
        logger(`${result.insertedCount} documents were inserted`);
        // index the user id
        usersCollection.createIndex({
            id: 1,
        }, {
            unique: true,
        });
        // index the username
        usersCollection.createIndex({
            username: 1,
        }, {
            unique: true,
        });
        // test the data and output
        const data = await GetAllUsersDB();
        return data;
    }
    catch {
        throw new Error('mongo data seed failed');
    }
    finally {
    }
}
async function connectDB(uri) {
    const mongoURL = new URL(uri);
    if (!mongoURL.port) {
        logger('reset port to 80');
        mongoURL.port = '80';
    }
    const client = new MongoClient(uri);
    const database = client.db('auth');
    usersCollection = database.collection('users');
    ``;
    refreshTokensCollection =
        database.collection('refreshtokens');
    return database
        .stats()
        .then((_x) => ({ up: true, message: `${mongoURL.hostname} is responding on port ${mongoURL.port}` }))
        .catch((e) => {
        return { up: false, message: e };
    });
}
;
async function GetAllUsersDB() {
    const usersWithPasswords = (await usersCollection.find({}).toArray());
    return usersWithPasswords.map(user => {
        // ES6 sorcery to remove password
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    });
}
async function GetUserDB(username) {
    return usersCollection
        .findOne({ username: username })
        .then((user) => {
        if (user) {
            logger(`username ${user.username} matched to userid=${user.id} in DB`);
            return user;
        }
        else {
            logger(`username ${username} not found in DB`);
            return null;
        }
    })
        .catch((e) => {
        console.error(e);
        return null;
    });
}
async function GetUserWithoutPasswordByIdDB(id) {
    const idNumber = typeof id === 'string' ? +id : id;
    return usersCollection
        .findOne({ id: idNumber })
        .then((user) => {
        if (user) {
            const userWithoutPassword = (({ password, ...the_rest }) => the_rest)(user);
            return userWithoutPassword;
        }
        else {
            return null;
        }
    })
        .catch((e) => {
        console.error(e);
        return null;
    });
}
async function CheckUserExistsDB(username) {
    const user = await usersCollection.findOne({ username });
    const exists = user ? true : false;
    logger(`mongo CheckUserExistsDB for username ${username} has returned: ${JSON.stringify(user, null, 2)} and the Promise is returning ${exists} `);
    return exists;
}
async function AddUserDB(newUser) {
    // get the user with the highest "id" (not the mongodb _id)
    const highestIDUser = await usersCollection
        .find({})
        .sort({ id: -1 })
        .limit(1)
        .toArray();
    // set the new "id" as one higher
    const newID = highestIDUser[0] ? highestIDUser[0].id + 1 : 1;
    // construct the User to add
    const userToAdd = Object.assign(newUser, {
        id: newID,
        created_at: new Date(),
        last_seen: new Date(),
    });
    // add it to the database
    return usersCollection
        .insertOne(userToAdd)
        .then((result) => {
        if (result.acknowledged) {
            // add the mongo ID to the user object
            const userWithMongoID = Object.assign(userToAdd, { _id: result.insertedId });
            // ES6 sorcery to remove password
            const { password: _, ...userWithoutPassword } = userWithMongoID;
            return userWithoutPassword;
        }
        else {
            throw new Error('error adding user');
        }
    })
        .catch((e) => {
        console.error(e);
        throw new Error('error caught in insertOne() command');
    });
}
async function UpdatePasswordDB(
// note that this function is agnostic
// to the encryption and should recieve the
// already encrypted version of the password
userid, newHashPassword) {
    return usersCollection
        .findOneAndUpdate({ id: userid }, { $set: { password: newHashPassword } })
        .then((updatedUserOrNull) => {
        if (updatedUserOrNull) {
            return updatedUserOrNull;
        }
        else {
            throw new Error('update password failed');
        }
    });
}
async function UpdateGroupDB(userid, newGroup) {
    return usersCollection
        .findOneAndUpdate({ id: userid }, { $set: { group: newGroup } })
        .then((updatedUserOrNull) => {
        if (updatedUserOrNull) {
            return updatedUserOrNull;
        }
        else {
            throw new Error('update group failed');
        }
    });
}
async function UpdateLastSeenDB(user) {
    const userid = typeof user === 'number' ? user : user.id;
    const today = new Date();
    return usersCollection
        .findOneAndUpdate({ id: userid }, { $set: { last_seen: today } })
        .then((updatedUserOrNull) => {
        if (updatedUserOrNull) {
            return updatedUserOrNull;
        }
        else {
            throw new Error('update last seen failed');
        }
    });
}
async function UpdateRoleDB(user, newRole) {
    const userid = typeof user === 'number' ? user : user.id;
    return usersCollection
        .findOneAndUpdate({ id: userid }, { $set: { role: newRole } })
        .then((updatedUserOrNull) => {
        if (updatedUserOrNull) {
            return updatedUserOrNull;
        }
        else {
            throw new Error('update role failed');
        }
    });
}
async function DeleteUserDB(user) {
    const userid = typeof user === 'number' ? user : user.id;
    return usersCollection
        .deleteOne({ id: userid })
        .then((result) => result.deletedCount === 1)
        .catch((e) => {
        console.error(e);
        throw new Error('error from mongo function');
    });
}
async function GetOnlineUsersDB() {
    const aMinuteAgo = new Date(Date.now() - 1000 * 60);
    const onlineUsersWithPasswords = await usersCollection
        .find({ last_seen: { $gt: aMinuteAgo } })
        .toArray()
        .catch((e) => {
        console.error(e);
        throw new Error('username');
    });
    return onlineUsersWithPasswords.map(user => {
        // ES6 sorcery to remove password
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    });
}
async function AddTokenDB(token) {
    // add it to the database
    return refreshTokensCollection
        .insertOne(token)
        .then((result) => {
        if (result.acknowledged) {
            return Object.assign(token, { _id: result.insertedId });
        }
        else {
            throw new Error('error adding tokem');
        }
    })
        .catch((e) => {
        console.error(e);
        throw new Error('error caught in insertOne() command');
    });
}
async function GetRefreshTokenDB(tokenString) {
    const token = await refreshTokensCollection.findOne({ token: tokenString });
    if (!token) {
        throw new Error('GetRefreshTokenDB failed');
    }
    return token;
}
async function DeleteTokenDB(tokenString) {
    const deletedToken = await (await refreshTokensCollection.findOneAndDelete({ token: tokenString }));
    if (!deletedToken) {
        throw new Error('DeleteTokenDB failed');
    }
    return deletedToken;
}
async function DeleteAllTokensOfUserDB(userId) {
    return (await refreshTokensCollection.deleteMany({ user: userId }))
        .deletedCount;
}
