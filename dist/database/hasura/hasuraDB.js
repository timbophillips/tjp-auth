import { HasuraDB } from './hasuraClass.js';
let hasuraDB;
// backwards compatibility
export async function ConnectDB(uri) {
    hasuraDB = await HasuraDB.build(uri);
    return hasuraDB.checkConnection();
}
export async function SeedDB(seedData) {
    const insertUsersGQL = `#graphql
  mutation InsertUsers($users: [users_insert_input!] = {}) {
    insert_users(objects: $users) {
      affected_rows
      returning {
        id
        username
        role
        password
        last_seen
        group
        created_at
      }
    }
}`;
    const jsonClearMetadata = {
        type: 'clear_metadata',
        args: {},
    };
    await hasuraDB.hasuraMetadata(jsonClearMetadata);
    const jsonAddDatabaseMetadata = {
        type: 'pg_add_source',
        args: {
            name: 'authDB',
            configuration: {
                connection_info: {
                    database_url: {
                        from_env: 'PG_DATABASE_URL',
                    },
                    pool_settings: {
                        max_connections: 50,
                        idle_timeout: 180,
                        retries: 1,
                        pool_timeout: 360,
                        connection_lifetime: 600,
                    },
                    use_prepared_statements: true,
                    isolation_level: 'read-committed',
                },
            },
            replace_configuration: true,
        },
    };
    await hasuraDB.hasuraMetadata(jsonAddDatabaseMetadata);
    const sqlString = `--sql
      SET
      check_function_bodies = false;

      DROP TABLE IF EXISTS public.users;

      CREATE TABLE public.users (
      id integer NOT NULL,
      username text NOT NULL,
      created_at timestamp with time zone DEFAULT now() NOT NULL,
      last_seen timestamp with time zone DEFAULT now(),
      role text DEFAULT 'user' :: text NOT NULL,
      password text DEFAULT 'cGFzc3dvcmQ=' :: text,
      roles text [],
      "group" text DEFAULT '' :: text
      );

      ALTER TABLE
      ONLY public.users
      ADD
      CONSTRAINT users_pkey PRIMARY KEY (id);

      ALTER TABLE
      ONLY public.users
      ADD
      CONSTRAINT users_username_key UNIQUE (username);

      DROP TABLE IF EXISTS public.refresh_tokens;

      CREATE TABLE public.refresh_tokens (
      token text NOT NULL,
      "user" integer NOT NULL,
      expires timestamp with time zone NOT NULL,
      ip text NOT NULL
      );

      ALTER TABLE
      ONLY public.refresh_tokens
      ADD
      CONSTRAINT refresh_tokens_pkey PRIMARY KEY (token);

      `;
    await hasuraDB.hasuraRunSQL(sqlString);
    const jsonTrackUsersTableMetadata = {
        type: 'pg_track_table',
        args: {
            source: 'authDB',
            table: 'users',
        },
    };
    await hasuraDB.hasuraMetadata(jsonTrackUsersTableMetadata);
    const jsonTrackRefreshTokensTableMetadata = {
        type: 'pg_track_table',
        args: {
            source: 'authDB',
            table: 'refresh_tokens',
        },
    };
    await hasuraDB.hasuraMetadata(jsonTrackRefreshTokensTableMetadata);
    const jsonReloadMetadata = {
        type: 'reload_metadata',
        args: {
            reload_remote_schemas: true,
            reload_sources: true,
            recreate_event_triggers: true,
        },
    };
    await hasuraDB.hasuraMetadata(jsonReloadMetadata);
    const usersObject = JSON.parse(JSON.stringify(seedData));
    const { data, errors } = await hasuraDB.hasuraGraphQL({
        operationName: 'InsertUsers',
        operationNode: insertUsersGQL,
        variables: { users: usersObject },
    });
    console.log(`data = ${JSON.stringify(data, null, 2)}`);
    console.log(`errors = ${JSON.stringify(errors, null, 2)}`);
    return (await GetAllUsersDB());
}
export async function GetAllUsersDB() {
    const { data, errors } = await hasuraDB.hasuraGraphQL({
        operationNode: `#graphql
      query Users {
        users {
          id
          username
          role
          group
          last_seen
          created_at
          roles
        }
      }
    `,
        operationName: 'Users',
        variables: {},
    });
    if (errors) {
        throw new Error(errors['message']);
    }
    else {
        return data['users'];
    }
}
export async function GetUserDB(username) {
    const { data } = await hasuraDB.hasuraGraphQL({
        operationNode: `#graphql
      query UserWithoutPassword($username: String) {
        users(where: { username: { _eq: $username } }) {
          id
          username
          password
          role
          group
          roles
          last_seen
          created_at
        }
      }
    `,
        operationName: 'UserWithoutPassword',
        variables: { username: username },
    });
    const user = data['users'][0];
    if (user) {
        console.log(`username ${user.username} matched to userid=${user.id} in DB`);
        return user;
    }
    else {
        console.log(`username ${username} not found in DB`);
        return null;
    }
}
export async function GetUserWithoutPasswordByIdDB(id) {
    const { data } = await hasuraDB.hasuraGraphQL({
        operationNode: `#graphql
      query UserWithPassword($id: Int) {
        users(where: { id: { _eq: $id } }) {
          id
          username
          role
          group
          roles
          last_seen
          created_at
        }
      }
    `,
        operationName: 'UserWithPassword',
        variables: { id: typeof id == 'string' ? parseInt(id) : id },
    });
    const user = data['users'][0];
    if (user) {
        console.log(`GetUserWithoutPasswordById:: username ${user.username} matched to userid=${user.id} in DB`);
        return user;
    }
    else {
        throw new Error('user ID not found in database');
    }
}
export async function CheckUserExistsDB(username) {
    const { data } = await hasuraDB.hasuraGraphQL({
        operationNode: `#graphql
      query CheckUserExists($username: String) {
        users(where: { username: { _eq: $username } }) {
          username
        }
      }
    `,
        operationName: 'CheckUserExists',
        variables: { username: username },
    });
    return data['users'][0] ? true : false;
}
async function getHighestID() {
    // get the user with the highest id
    const { data } = await hasuraDB.hasuraGraphQL({
        operationNode: `#graphql
      query IdInDescOrder {
        users(order_by: { id: desc }) {
          id
        }
      }
    `,
        operationName: 'IdInDescOrder',
        variables: {},
    });
    return data['users'][0].id;
}
export async function AddUserDB(newUser) {
    const nextID = (await getHighestID()) + 1;
    console.log(`the next ID to be used is ${nextID}`);
    const { data } = await hasuraDB.hasuraGraphQL({
        operationNode: `#graphql
      mutation AddUser(
        $password: String = "password"
        $username: String
        $role: String = "user"
        $group: String = ""
        $id: Int
      ) {
        insert_users_one(
          object: {
            username: $username
            password: $password
            role: $role
            group: $group
            id: $id
          }
        ) {
          id
          role
          group
          username
          last_seen
          created_at
        }
      }
    `,
        operationName: 'AddUser',
        variables: {
            username: newUser.username,
            password: newUser.password,
            role: newUser.role,
            group: newUser.group,
            id: nextID,
        },
    });
    return data['insert_users_one'];
}
export async function UpdatePasswordDB(
// note that this function is agnostic
// to the encryption and should recieve the
// already encrypted version of the password
userid, newHashPassword) {
    const { data } = await hasuraDB.hasuraGraphQL({
        operationNode: `#graphql
      mutation UpdatePassword($user_id: Int, $new_password: String) {
        update_users(
          where: { id: { _eq: $user_id } }
          _set: { password: $new_password }
        ) {
          affected_rows
          returning {
            id
            username
            role
            group
            last_seen
            created_at
          }
        }
      }
    `,
        operationName: 'UpdatePassword',
        variables: {
            user_id: userid,
            new_password: newHashPassword,
        },
    });
    return data['update_users'].returning[0];
}
export async function UpdateGroupDB(userid, newGroup) {
    const { data } = await hasuraDB.hasuraGraphQL({
        operationNode: `#graphql
      mutation UpdateGroup($user_id: Int, $new_group: String) {
        update_users(
          where: { id: { _eq: $user_id } }
          _set: { group: $new_group }
        ) {
          affected_rows
          returning {
            id
            username
            role
            group
            last_seen
            created_at
          }
        }
      }
    `,
        operationName: 'UpdateGroup',
        variables: {
            user_id: userid,
            new_group: newGroup,
        },
    });
    return data['update_users'].returning[0];
}
export async function UpdateLastSeenDB(user) {
    const userid = typeof user === 'number' ? user : user.id;
    const today = new Date();
    console.log(`updating last seen for userid ${userid}`);
    const { data } = await hasuraDB.hasuraGraphQL({
        operationNode: `#graphql
      mutation UpdateLastSeen($user_id: Int, $today: timestamptz) {
        update_users(
          where: { id: { _eq: $user_id } }
          _set: { last_seen: $today }
        ) {
          affected_rows
          returning {
            id
            username
            role
            group
            last_seen
            created_at
          }
        }
      }
    `,
        operationName: 'UpdateLastSeen',
        variables: {
            user_id: userid,
            today: today.toISOString(),
        },
    });
    return data['update_users'].returning[0];
}
export async function UpdateRoleDB(user, newRole) {
    const userid = typeof user === 'number' ? user : user.id;
    const { data } = await hasuraDB.hasuraGraphQL({
        operationNode: `#graphql
      mutation UpdateRole($user_id: Int, $new_role: String) {
        update_users(
          where: { id: { _eq: $user_id } }
          _set: { role: $new_role }
        ) {
          returning {
            id
            created_at
            last_seen
            role
            group
            username
            roles
          }
        }
      }
    `,
        operationName: 'UpdateRole',
        variables: {
            user_id: userid,
            new_role: newRole,
        },
    });
    return data['update_users'].returning[0];
}
export async function DeleteUserDB(user) {
    const userid = typeof user === 'number' ? user : user.id;
    const { data } = await hasuraDB.hasuraGraphQL({
        operationNode: `#graphql
      mutation DeleteUser($user_id: Int) {
        delete_users(where: { id: { _eq: $user_id } }) {
          returning {
            username
            id
            group
            role
            last_seen
            created_at
            roles
          }
        }
      }
    `,
        operationName: 'DeleteUser',
        variables: {
            user_id: userid,
        },
    });
    return data['delete_users'].returning[0] ? true : false;
}
export async function GetOnlineUsersDB() {
    const aMinuteAgo = new Date(Date.now() - 1000 * 60).toISOString();
    console.log(`going to try and do online users for time = ${aMinuteAgo}`);
    const { data } = await hasuraDB.hasuraGraphQL({
        operationNode: `#graphql
      query OnlineUsers($aMinuteAgo: timestamptz) {
        users(where: { last_seen: { _gt: $aMinuteAgo } }) {
          id
          group
          last_seen
          created_at
          role
          roles
          username
        }
      }
    `,
        operationName: 'OnlineUsers',
        variables: { aMinuteAgo },
    });
    const onlineUsers = data['users'];
    if (onlineUsers) {
        console.log(`online users:`);
        console.log(JSON.stringify(onlineUsers, null, 2));
        return onlineUsers;
    }
    else {
        throw new Error('username');
    }
}
export async function AddTokenDB(token) {
    const { data } = await hasuraDB.hasuraGraphQL({
        operationNode: `#graphql
      mutation AddToken(
        $ip: String
        $expires: timestamptz
        $token: String
        $user: Int
      ) {
        insert_refresh_tokens(
          objects: [{ ip: $ip, expires: $expires, token: $token, user: $user }]
        ) {
          returning {
            ip
            expires
            token
            user
          }
        }
      }
    `,
        operationName: 'AddToken',
        variables: token,
    });
    return data['insert_refresh_tokens'].returning[0];
}
export async function GetRefreshTokenDB(tokenString) {
    const { data } = await hasuraDB.hasuraGraphQL({
        operationNode: `#graphql
      query RefreshToken($token: String) {
        refresh_tokens(where: { token: { _eq: $token } }) {
          ip
          expires
          token
          user
        }
      }
    `,
        operationName: 'RefreshToken',
        variables: { token: tokenString },
    });
    const token = data['refresh_tokens'][0];
    // if it exists return the promise for a then()
    // otherwise trigger an Error for a catch()
    if (token) {
        return token;
    }
    else {
        throw new Error('invalid');
    }
}
export async function DeleteTokenDB(tokenString) {
    const { data } = await hasuraDB.hasuraGraphQL({
        operationNode: `#graphql
      mutation DeleteToken($token: String) {
        delete_refresh_tokens(where: { token: { _eq: $token } }) {
          affected_rows
          returning {
            expires
            ip
            token
            user
          }
        }
      }
    `,
        operationName: 'DeleteToken',
        variables: { token: tokenString },
    });
    return data['delete_refresh_tokens'].returning[0];
}
export async function DeleteAllTokensOfUserDB(userId) {
    const { data } = await hasuraDB.hasuraGraphQL({
        operationNode: `#graphql
      mutation DeleteTokensOfUSer($user: Int) {
        delete_refresh_tokens(where: { user: { _eq: $user } }) {
          affected_rows
          returning {
            token
          }
        }
      }
    `,
        operationName: 'DeleteTokensOfUSer',
        variables: { user: userId },
    });
    const deletedTokens = data['delete_refresh_tokens'].returning;
    console.log(`deleting tokens: ${JSON.stringify(deletedTokens)}`);
    return deletedTokens;
}
