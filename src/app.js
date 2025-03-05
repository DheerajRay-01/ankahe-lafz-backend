import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from '../src/routes/user.routes.js'
import contentRouter from '../src/routes/content.routes.js'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))

app.use("/api/v1/user",userRouter)
app.use("/api/v1/content",contentRouter)

export {app}
