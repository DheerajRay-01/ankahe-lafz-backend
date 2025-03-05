import dotenv from 'dotenv'
import  connectDB  from './DB/connectDB.js'
import { app } from './app.js'
dotenv.config()
connectDB()
.then(
app.listen(process.env.PORT)
)
.catch(
    (err)=>{
        console.log("MONGODB connection error: ",err);
    }
)