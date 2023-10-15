import { fetchHasuraGraphQL, fetchHasuraMetadata, fetchHasuraRunSQL, } from "./fetch-hasura.js";
export async function hasuraInitAndSeedDB({ seedData, uri }) {
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
        type: "clear_metadata",
        args: {},
    };
    await fetchHasuraMetadata({
        hasuraURI: uri,
        json: jsonClearMetadata,
    });
    const jsonAddDatabaseMetadata = {
        type: "pg_add_source",
        args: {
            name: "authDB",
            configuration: {
                connection_info: {
                    database_url: {
                        from_env: "PG_DATABASE_URL",
                    },
                    pool_settings: {
                        max_connections: 50,
                        idle_timeout: 180,
                        retries: 1,
                        pool_timeout: 360,
                        connection_lifetime: 600,
                    },
                    use_prepared_statements: true,
                    isolation_level: "read-committed",
                },
            },
            replace_configuration: true,
        },
    };
    await fetchHasuraMetadata({
        hasuraURI: uri,
        json: jsonAddDatabaseMetadata,
    });
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
    await fetchHasuraRunSQL({
        hasuraURI: uri,
        sql: sqlString,
    });
    const jsonTrackUsersTableMetadata = {
        type: "pg_track_table",
        args: {
            source: "authDB",
            table: "users",
        },
    };
    await fetchHasuraMetadata({
        hasuraURI: uri,
        json: jsonTrackUsersTableMetadata,
    });
    const jsonTrackRefreshTokensTableMetadata = {
        type: "pg_track_table",
        args: {
            source: "authDB",
            table: "refresh_tokens",
        },
    };
    await fetchHasuraMetadata({
        hasuraURI: uri,
        json: jsonTrackRefreshTokensTableMetadata,
    });
    const jsonReloadMetadata = {
        type: "reload_metadata",
        args: {
            reload_remote_schemas: true,
            reload_sources: true,
            recreate_event_triggers: true,
        },
    };
    await fetchHasuraMetadata({
        hasuraURI: uri,
        json: jsonReloadMetadata,
    });
    const usersObject = JSON.parse(JSON.stringify(seedData));
    const { data, errors } = await fetchHasuraGraphQL({
        hasuraURI: uri,
        operationName: "InsertUsers",
        query: insertUsersGQL,
        variables: { users: usersObject },
    });
    console.log(`data = ${JSON.stringify(data, null, 2)}`);
    console.table(data['insert_users']['returning']);
    console.log(`errors = ${JSON.stringify(errors, null, 2)}`);
}
