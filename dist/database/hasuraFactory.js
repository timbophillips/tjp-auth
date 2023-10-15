import { AddTokenDB, AddUserDB, CheckUserExistsDB, DeleteAllTokensOfUserDB, DeleteTokenDB, DeleteUserDB, GetAllUsersDB, GetOnlineUsersDB, GetRefreshTokenDB, GetUserDB, GetUserWithoutPasswordByIdDB, UpdateGroupDB, UpdateLastSeenDB, UpdatePasswordDB, UpdateRoleDB, ConnectDB, SeedDB } from './hasura/hasuraDB.js';
export const hasuraObject = {
    AddTokenDB,
    AddUserDB,
    CheckUserExistsDB,
    DeleteAllTokensOfUserDB,
    DeleteTokenDB,
    DeleteUserDB,
    GetAllUsersDB,
    GetOnlineUsersDB,
    GetRefreshTokenDB,
    GetUserDB,
    GetUserWithoutPasswordByIdDB,
    UpdateGroupDB,
    UpdateLastSeenDB,
    UpdatePasswordDB,
    UpdateRoleDB,
    ConnectDB,
    SeedDB
};
