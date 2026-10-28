import mongoose from 'mongoose';

export const connectToDB = async () => {
    try {
        if (!process.env.DB_URI) console.log('DB_URI is not defined in environment variables');
        mongoose.connection.on('connected', () => console.log('DB is connected'));
        mongoose.connection.on('error', error => console.log(`Something went wrong: err: ${error}`));
        await mongoose.connect(process.env.DB_URI);
    } catch (error) {
        console.error(`Something went wrong with DB connection: ${error}`);
    }
};
