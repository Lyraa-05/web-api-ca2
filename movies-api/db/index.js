import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

//FOR DATABASE ERROR:
//GO TO C DRIVE, mdkir db, mongod -dbpath db in the terminal to start database


// Connect to database
mongoose.connect(process.env.MONGO_DB);
const db = mongoose.connection;

db.on('error', (err) => {
    console.log(`database connection error: ${err}`);
});
db.on('disconnected', () => {
    console.log('database disconnected');
});
db.once('open', () => {
    console.log(`database connected to ${db.name} on ${db.host}`);
})
