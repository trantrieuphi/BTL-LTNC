import mongoose from "mongoose";
import config from "../../config/config.js";

export default class Database {
    static async connect() {
        try {
            const { host, port, name } = config.db;
            const uri = `mongodb://${host}:${port}/${name}`;
            await mongoose.connect(uri);
            console.log(`Connected to database ${name}`);
        } catch (error) {
            console.log(`Error connecting to database: ${error}`);
        }
    }
}
