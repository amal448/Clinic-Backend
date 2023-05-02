import express from 'express'
import authController from '../../../adapters/controllers/authControllers';
import { adminDbRepository } from '../../../applications/repositories/adminDbRepository';
import { FacultyRepository } from '../../../applications/repositories/FacultyRepository';
import { StudentRepository } from '../../../applications/repositories/studentRepository';
import { AuthServiceInterface } from '../../../applications/services/AuthServiceInterface';
import { AdminRepositoryMongoDB } from '../../database/mongoDB/repository/adminRepositoryMongoDB';
import { FacultyRepositoryMongoDb } from '../../database/mongoDB/repository/FacultyRepositoryMongoDb';
import { studentRepositoryMongoDB } from '../../database/mongoDB/repository/studentsRepositoryMongoDB';
import { authService } from '../../services/authServices';

const authRouter = () => {
    const router = express.Router();

    const controller = authController(
        adminDbRepository,
        AdminRepositoryMongoDB,
        FacultyRepository,
        FacultyRepositoryMongoDb,
        authService,
        AuthServiceInterface,
        StudentRepository,
        studentRepositoryMongoDB,
    );

    router.post('/admin-login',controller.LoginAdmin)

    router.post('/student-login',controller.LoginStudent)
    
    router.post('/faculty-login',controller.LoginFaculty)

    return router
}

export default authRouter;