import mongoose from "mongoose";
const db = mongoose.connection;

export const initializeDb = () => {
    mongoose.connect('mongodb://localhost:27017/chat', {useNewUrlParser: true, useUnifiedTopology: true});
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("Connected to DB!")
    });

}

