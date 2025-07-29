import express from 'express'
import cors from 'cors'
import cookieParser  from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true 
}))

app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended: true, limit: '16kb'}))
app.use(express.static('public'))
app.use(cookieParser())


// import routes

import userRouter from './routes/user.routes.js'

console.log('👉 Registering user routes');
// declaration of routes
app.use('/api/v1/users', userRouter)


// our url will look like that
// http://localhost:8000/api/v1/users/regirsteruser(register user is just an example it can be any method defined at user.routes.js)


export {app} 