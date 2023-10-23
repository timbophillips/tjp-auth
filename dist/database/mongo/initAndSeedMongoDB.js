import { MongoClient } from 'mongodb';
export async function mongoInitAndMongoDB({ seedData, uri, }) {
    // set up the client
    const client = new MongoClient(uri);
    try {
        // connect to the server
        await client.connect();
        // access the database
        const database = client.db('auth');
        // create the collection and empty it if it exists
        const usersCollection = database.collection('users');
        // empty out anything that may be in there
        usersCollection.deleteMany({});
        // put the array of Users in to the collection
        const result = await usersCollection.insertMany(seedData, {
            ordered: true,
        });
        // output the result of the insert
        console.log(`${result.insertedCount} documents were inserted`);
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
        const data = await usersCollection.find().toArray();
        console.table(data);
    }
    catch {
        throw new Error('mongo function failed');
    }
    finally {
        // close the connection
        await client.close();
    }
}
// if the files is run from the command line
