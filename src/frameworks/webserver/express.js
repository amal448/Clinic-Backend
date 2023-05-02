import express, { Application } from "express";
import morgan from 'morgan';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
import cors from 'cors'


export default function expressConfig(app) {

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }))
    app.use(bodyParser.json());
    app.use(cookieParser());
}

