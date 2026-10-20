import { Db, MongoClient } from "mongodb";
import { SETTINGS } from "../settings/config";
import { initCollections } from "./collections";

// Obj for connect to database.
export let client: MongoClient;

// Connect to database.
export const runDB = async (url: string): Promise<void> => {
    client = new MongoClient(url);
    const db: Db = client.db(SETTINGS.DB_NAME);

    // Init collections.
    initCollections(db);

    try {
        await client.connect();
        await db.command({ ping: 1 });
        console.log('✅Connected to the database');
    } catch (error) {
        await client.close();
        throw new Error(`❌Database not connected: ${error}`);
    }
};

// For tests.
export const stopDb = async () => {
    if (!client) {
        throw new Error('❌Not active client');
    }
    await client.close();
};
