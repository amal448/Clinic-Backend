import express, { Application, Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import redis from 'redis'
import dotenv from "dotenv"
import colors from 'colors.ts'
import connectDB from './frameworks/database/mongoDB/MongoConnection'
import connection from './frameworks/database/redis/redisConnection'
import expressConfig from './frameworks/webserver/express'
import routes from './frameworks/webserver/routes'
import errorHandlingMiddleware from './frameworks/webserver/middlewares/errorHandlingMiddleware'
import AppError from './utils/appError'
import serverConfig from './frameworks/webserver/server'
import cors from 'cors'
import helmet from 'helmet'

// colors.enable()

dotenv.config({ path: 'config.env' })


const app= express();

app.use(cors());

app.use(helmet())   

//-----Database Connection-----//

connectDB();

//-----Redis database connection-----//

export const redisClient = connection().createRedisClient();


//------express configuration------//

expressConfig(app);

//routes for each endpoints

routes(app, redisClient)

app.use(errorHandlingMiddleware);

// catch 404 and forward to error handler

app.all('*', (req, res, next) => {
    next(new AppError('Not found', 404))
});

serverConfig(app).startServer();




