import { MongoClient } from 'mongodb';
let usersCollection;
let refreshTokensCollection;
export async function connectDB(uri) {
    const mongoURL = new URL(uri);
    if (!mongoURL.port) {
        console.log('reset port to 80');
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
export async function GetAllUsersDB() {
    const usersWithPasswords = (await usersCollection.find({}).toArray());
    return usersWithPasswords.map(user => {
        // ES6 sorcery to remove password
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    });
}
export async function GetUserDB(username) {
    return usersCollection
        .findOne({ username: username })
        .then((user) => {
        if (user) {
            console.log(`username ${user.username} matched to userid=${user.id} in DB`);
            return user;
        }
        else {
            console.log(`username ${username} not found in DB`);
            return null;
        }
    })
        .catch((e) => {
        console.error(e);
        return null;
    });
}
export async function GetUserWithoutPasswordByIdDB(id) {
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
export async function CheckUserExistsDB(username) {
    const user = await usersCollection.findOne({ username });
    const exists = user ? true : false;
    console.log(`mongo CheckUserExistsDB for username ${username} has returned: ${JSON.stringify(user, null, 2)} and the Promise is returning ${exists} `);
    return exists;
}
export async function AddUserDB(newUser) {
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
export async function UpdatePasswordDB(
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
export async function UpdateGroupDB(userid, newGroup) {
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
export async function UpdateLastSeenDB(user) {
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
export async function UpdateRoleDB(user, newRole) {
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
export async function DeleteUserDB(user) {
    const userid = typeof user === 'number' ? user : user.id;
    return usersCollection
        .deleteOne({ id: userid })
        .then((result) => result.deletedCount === 1)
        .catch((e) => {
        console.error(e);
        throw new Error('error from mongo function');
    });
}
export async function GetOnlineUsersDB() {
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
export async function AddTokenDB(token) {
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
export async function GetRefreshTokenDB(tokenString) {
    const token = await refreshTokensCollection.findOne({ token: tokenString });
    if (!token) {
        throw new Error('GetRefreshTokenDB failed');
    }
    return token;
}
export async function DeleteTokenDB(tokenString) {
    const deletedToken = await (await refreshTokensCollection.findOneAndDelete({ token: tokenString }));
    if (!deletedToken) {
        throw new Error('DeleteTokenDB failed');
    }
    return deletedToken;
}
export async function DeleteAllTokensOfUserDB(userId) {
    return (await refreshTokensCollection.deleteMany({ user: userId }))
        .deletedCount;
}
