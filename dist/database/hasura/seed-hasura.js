import { readFile } from 'fs/promises';
import { hasuraInitAndSeedDB } from './initAndSeedHasuraDB.js';
const uri = process.argv[2] || 'http://hello-this-is-my-admin-secret@localhost:8080/v1/graphql';
const jsonUsersFile = "examples/example-users.json";
const jsonUsersString = await readFile(jsonUsersFile, {
    encoding: "utf8",
});
const users = JSON.parse(jsonUsersString);
await hasuraInitAndSeedDB({ seedData: users, uri });
