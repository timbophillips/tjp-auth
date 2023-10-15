import { AddTokenDB as hasuraAddTokenDB, AddUserDB as hasuraAddUserDB, CheckUserExistsDB as hasuraCheckUserExistsDB, DeleteAllTokensOfUserDB as hasuraDeleteAllTokensOfUserDB, DeleteTokenDB as hasuraDeleteTokenDB, DeleteUserDB as hasuraDeleteUserDB, GetAllUsersDB as hasuraGetAllUsersDB, GetOnlineUsersDB as hasuraGetOnlineUsersDB, GetRefreshTokenDB as hasuraGetRefreshTokenDB, GetUserDB as hasuraGetUserDB, GetUserWithoutPasswordByIdDB as hasuraGetUserWithoutPasswordByIdDB, UpdateGroupDB as hasuraUpdateGroupDB, UpdateLastSeenDB as hasuraUpdateLastSeenDB, UpdatePasswordDB as hasuraUpdatePasswordDB, UpdateRoleDB as hasuraUpdateRoleDB, connectDB as hasuraConnectDB, } from './hasura/hasuraDB.js';
import { AddTokenDB as mongoAddTokenDB, AddUserDB as mongoAddUserDB, CheckUserExistsDB as mongoCheckUserExistsDB, DeleteAllTokensOfUserDB as mongoDeleteAllTokensOfUserDB, DeleteTokenDB as mongoDeleteTokenDB, DeleteUserDB as mongoDeleteUserDB, GetAllUsersDB as mongoGetAllUsersDB, GetOnlineUsersDB as mongoGetOnlineUsersDB, GetRefreshTokenDB as mongoGetRefreshTokenDB, GetUserDB as mongoGetUserDB, GetUserWithoutPasswordByIdDB as mongoGetUserWithoutPasswordByIdDB, UpdateGroupDB as mongoUpdateGroupDB, UpdateLastSeenDB as mongoUpdateLastSeenDB, UpdatePasswordDB as mongoUpdatePasswordDB, UpdateRoleDB as mongoUpdateRoleDB, connectDB as mongoConnectDB, } from './mongo/mongoDB.js';
import { hasuraInitAndSeedDB } from './hasura/initAndSeedHasuraDB.js';
import { mongoInitAndMongoDB } from './mongo/initAndSeedMongoDB.js';
import { inMemoryAddTokenDB, inMemoryDeleteAllTokensOfUserDB, inMemoryDeleteTokenDB, inMemoryGetOnlineUsersDB, inMemoryGetRefreshTokenDB, inMemoryAddUserDB, inMemoryCheckUserExistsDB, inMemoryConnectDB, inMemoryDeleteUserDB, inMemoryGetAllUsersDB, inMemoryGetUserDB, inMemoryGetUserWithoutPasswordByIdDB, inMemoryInitAndSeedDB, inMemoryUpdateGroupDB, inMemoryUpdateLastSeenDB, inMemoryUpdatePasswordDB, inMemoryUpdateRoleDB } from './in-memory/inMemoryDB.js';
var DatabaseType;
(function (DatabaseType) {
    DatabaseType["hasura"] = "hasura";
    DatabaseType["mongodb"] = "mongo";
    DatabaseType["inMemory"] = "inMemory";
})(DatabaseType || (DatabaseType = {}));
let dbType = DatabaseType.inMemory;
export async function connectDB(uri) {
    if (uri.slice(0, 1) === 'h') {
        dbType = DatabaseType.hasura;
        return hasuraConnectDB(uri);
    }
    else if (uri.slice(0, 1) === 'm') {
        dbType = DatabaseType.mongodb;
        return mongoConnectDB(uri);
    }
    else {
        dbType = DatabaseType.inMemory;
        return inMemoryConnectDB(uri);
    }
}
export async function seedDB({ seedData, uri }) {
    if (uri.slice(0, 1) === 'h') {
        return hasuraInitAndSeedDB({ seedData, uri });
    }
    else if (uri.slice(0, 1) === 'm') {
        return mongoInitAndMongoDB({ seedData, uri });
    }
    else {
        return inMemoryInitAndSeedDB({ seedData, uri });
    }
}
export async function AddTokenDB(token) {
    if (dbType === DatabaseType.hasura) {
        return hasuraAddTokenDB(token);
    }
    else if (dbType === DatabaseType.mongodb) {
        return mongoAddTokenDB(token);
    }
    else {
        return inMemoryAddTokenDB(token);
    }
}
export async function AddUserDB(newUser) {
    if (dbType === DatabaseType.hasura) {
        return hasuraAddUserDB(newUser);
    }
    else if (dbType === DatabaseType.mongodb) {
        return mongoAddUserDB(newUser);
    }
    else {
        return inMemoryAddUserDB(newUser);
    }
}
export async function CheckUserExistsDB(username) {
    if (dbType === DatabaseType.hasura) {
        return hasuraCheckUserExistsDB(username);
    }
    else if (dbType === DatabaseType.mongodb) {
        return mongoCheckUserExistsDB(username);
    }
    else {
        return inMemoryCheckUserExistsDB(username);
    }
}
export async function DeleteAllTokensOfUserDB(userId) {
    if (dbType === DatabaseType.hasura) {
        return hasuraDeleteAllTokensOfUserDB(userId);
    }
    else if (dbType === DatabaseType.mongodb) {
        return mongoDeleteAllTokensOfUserDB(userId);
    }
    else {
        return inMemoryDeleteAllTokensOfUserDB(userId);
    }
}
export async function DeleteTokenDB(tokenString) {
    if (dbType === DatabaseType.hasura) {
        return hasuraDeleteTokenDB(tokenString);
    }
    else if (dbType === DatabaseType.mongodb) {
        return mongoDeleteTokenDB(tokenString);
    }
    else {
        return inMemoryDeleteTokenDB(tokenString);
    }
}
export async function DeleteUserDB(user) {
    if (dbType === DatabaseType.hasura) {
        return hasuraDeleteUserDB(user);
    }
    else if (dbType === DatabaseType.mongodb) {
        return mongoDeleteUserDB(user);
    }
    else {
        return inMemoryDeleteUserDB(user);
    }
}
export async function GetAllUsersDB() {
    if (dbType === DatabaseType.hasura) {
        return hasuraGetAllUsersDB();
    }
    else if (dbType === DatabaseType.mongodb) {
        return mongoGetAllUsersDB();
    }
    else {
        return inMemoryGetAllUsersDB();
    }
}
export async function GetOnlineUsersDB() {
    if (dbType === DatabaseType.hasura) {
        return hasuraGetOnlineUsersDB();
    }
    else if (dbType === DatabaseType.mongodb) {
        return mongoGetOnlineUsersDB();
    }
    else {
        return inMemoryGetOnlineUsersDB();
    }
}
export async function GetRefreshTokenDB(tokenString) {
    if (dbType === DatabaseType.hasura) {
        return hasuraGetRefreshTokenDB(tokenString);
    }
    else if (dbType === DatabaseType.mongodb) {
        return mongoGetRefreshTokenDB(tokenString);
    }
    else {
        return inMemoryGetRefreshTokenDB(tokenString);
    }
}
export async function GetUserDB(username) {
    if (dbType === DatabaseType.hasura) {
        return hasuraGetUserDB(username);
    }
    else if (dbType === DatabaseType.mongodb) {
        return mongoGetUserDB(username);
    }
    else {
        return inMemoryGetUserDB(username);
    }
}
export async function GetUserWithoutPasswordByIdDB(id) {
    if (dbType === DatabaseType.hasura) {
        return hasuraGetUserWithoutPasswordByIdDB(id);
    }
    else if (dbType === DatabaseType.mongodb) {
        return mongoGetUserWithoutPasswordByIdDB(id);
    }
    else {
        return inMemoryGetUserWithoutPasswordByIdDB(id);
    }
}
export async function UpdateGroupDB(userid, newGroup) {
    if (dbType === DatabaseType.hasura) {
        return hasuraUpdateGroupDB(userid, newGroup);
    }
    else if (dbType === DatabaseType.mongodb) {
        return mongoUpdateGroupDB(userid, newGroup);
    }
    else {
        return inMemoryUpdateGroupDB(userid, newGroup);
    }
}
export async function UpdateLastSeenDB(user) {
    if (dbType === DatabaseType.hasura) {
        return hasuraUpdateLastSeenDB(user);
    }
    else if (dbType === DatabaseType.mongodb) {
        return mongoUpdateLastSeenDB(user);
    }
    else {
        return inMemoryUpdateLastSeenDB(user);
    }
}
export async function UpdatePasswordDB(userid, newHashPassword) {
    if (dbType === DatabaseType.hasura) {
        return hasuraUpdatePasswordDB(userid, newHashPassword);
    }
    else if (dbType === DatabaseType.mongodb) {
        return mongoUpdatePasswordDB(userid, newHashPassword);
    }
    else {
        return inMemoryUpdatePasswordDB(userid, newHashPassword);
    }
}
export async function UpdateRoleDB(user, newRole) {
    if (dbType === DatabaseType.hasura) {
        return hasuraUpdateRoleDB(user, newRole);
    }
    else if (dbType === DatabaseType.mongodb) {
        return mongoUpdateRoleDB(user, newRole);
    }
    else {
        return inMemoryUpdateRoleDB(user, newRole);
    }
}
