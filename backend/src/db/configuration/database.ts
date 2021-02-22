import mongoose from "mongoose";
const db = mongoose.connection;

export const initializeDb = () => {
    mongoose.connect( process.env.DB_URL ||'mongodb://localhost:27017/whiteboard', {useNewUrlParser: true, useUnifiedTopology: true});
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("Connected to DB!")
    });

}

