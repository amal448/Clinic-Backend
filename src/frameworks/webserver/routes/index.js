import { Application } from "express";
import adminRouter from './admin'
import studentRouter from "./students";
import facultyRouter from "./faculty";
import authRouter from "./auth";
import { redisClient } from "../../../app"


const routes = (app, redisClient) => {

    app.use('/api/admin', adminRouter());
    app.use('/api/student', studentRouter(redisClient));
    app.use('/api/faculty', facultyRouter(redisClient));
    app.use('/api/auth', authRouter());
}

export default routes