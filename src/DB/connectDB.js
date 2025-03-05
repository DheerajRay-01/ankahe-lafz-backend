import mongoose from "mongoose";
import {DB_NAME} from '../constant.js'
const connectDB = async()=>{
    try {
       const response = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
    //    console.log(response);
        
    } catch (error) {
        console.log("ERROR in ConnectDB : ", error);
        process.exit(1)
    }
}

export default connectDB