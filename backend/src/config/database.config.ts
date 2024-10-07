import * as process from "node:process";

export const databaseConfig = {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database_name',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
};