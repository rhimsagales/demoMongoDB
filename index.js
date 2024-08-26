import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
config();

const client = new MongoClient(process.env.URI);
async function demoMain () {
    try {
        // #region Connection
        await client.connect()
        .then(() => console.log('✅ Cluster: Connection established.\n`'))
        .catch ((error) => console.log(`❌ Cluster: Error Occured!\nError: ${error}\n`));

        const database = client.db('Demo')
        console.log('✅ Database: Connection established.\n')

        const collection = database.collection('persons');
        console.log(`✅ Collection: Connection established.\n`); 

        // #endregion

        // #region Create a new document. This is the data we will use to interact with mongodb.
        const document = {
            name: 'John Doe',
            age: 30,
            city: 'New York'
        };
        // #endregion
        
        // #region CREATE OPERATION
        const result = await collection.insertOne(document);
        console.log(`Inserted document with _id: ${result.insertedId}`);
        // #endregion

        // #region READ OPERATION
        // const filter = { name: 'John Doe' };
        // const cursor = await collection.findOne(filter);
        // console.log(`\nAll documents:`);    
        // cursor ? console.log(cursor) : console.log('No data has been stored in the database yet.');
        // #endregion
        
        // #region UPDATE OPERATION
        // const update = { $set: { age: 31 } };
        // const updatedResult = await collection.updateOne(filter, update);
        // console.log(`\nUpdated ${updatedResult.matchedCount} document(s).`);
        // #endregion

        // #region DELETE OPERATION
        // const deletedResult = await collection.deleteOne(filter);
        // console.log(`\nDeleted ${deletedResult.deletedCount} document(s).`);
        // #endregion
    }
    catch (error) {
        console.log(`OperationERR: ${error}`)
    }
    finally {
        client.close()
    }
    
}
demoMain();