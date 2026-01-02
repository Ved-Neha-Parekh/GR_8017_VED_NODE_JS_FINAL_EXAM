import mongoose from "mongoose";

const db = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Db Connected...");
    } catch (error) {
        console.error("DB Connection Failed", error);
    }
}

export default db;