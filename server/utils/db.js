import mongoose from "mongoose";

const connectToDatabase = async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connecteed to database");
        
    } catch (error) {
        console.log(error.message);
        
    }
}

export default connectToDatabase;