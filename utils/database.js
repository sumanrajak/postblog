import mongoose from "mongoose";

let isConnected = false

export const connectToDb = async () => {
    mongoose.set('strictQuery', true)
    if (isConnected) {
        console.log("db connected [checked]");
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "postblog",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true
        console.log("db connected");
    } catch (error) {
        console.log(error);
    }
}