import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
    if (connection.isConnected) {
        console.log("already connected")
        return;
    }
    // mongoose.set('strictQuery', true);
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        connection.isConnected = db.connections[0].readyState;
        console.log("connected")
    } catch (error) {
        console.log(error)
    }

}

export default dbConnect;
