import express, { Router } from "express";
import { redisClient } from "../../../app";
import FacultyAuthMiddleware from "../middlewares/facultyAuthMiddleware";
import FacultyController from "../../../adapters/controllers/facultyController";
import { DepartmentRepository } from "../../../applications/repositories/departmentDbRepository";
import { DepartmentdRepositoryMongoDb } from "../../database/mongoDB/repository/departmentReposirtoryMongoDb";
import { adminDbRepository } from "../../../applications/repositories/adminDbRepository";
import { AdminRepositoryMongoDB } from "../../database/mongoDB/repository/adminRepositoryMongoDB";
import { cacheRepositoryInterface } from "../../../applications/repositories/cacheRepositoryInterface";
import { redisRepository } from "../../database/redis/setCache";
import { StudentRepository } from "../../../applications/repositories/studentRepository";
import { studentRepositoryMongoDB } from "../../database/mongoDB/repository/studentsRepositoryMongoDB";
import { FacultyRepositoryMongoDb } from "../../database/mongoDB/repository/FacultyRepositoryMongoDb";
import { FacultyRepository } from "../../../applications/repositories/FacultyRepository";
import uploadProfilePic from '../middlewares/multer'
import { ExamDbRepository } from "../../../applications/repositories/ExamRepositoryInterface";
import { ExamRepositoryMongoDb } from "../../database/mongoDB/repository/ExamRepositoryMongoDb";

export default function facultyRouter(redisClient) {
    const router = express.Router();

    const controller = FacultyController(DepartmentRepository,
        DepartmentdRepositoryMongoDb,
        adminDbRepository,
        AdminRepositoryMongoDB,
        cacheRepositoryInterface,
        redisRepository,
        redisClient,
        StudentRepository,
        studentRepositoryMongoDB,
        FacultyRepositoryMongoDb,
        FacultyRepository,
        ExamDbRepository,
        ExamRepositoryMongoDb)

    router.post('/edit', FacultyAuthMiddleware, uploadProfilePic.single('profilePic'), controller.editFaculty);
    router.get('/details', FacultyAuthMiddleware, controller.getFaculty)
    router.post('/add-exam', FacultyAuthMiddleware, controller.addExam)
    router.get('/subjects', FacultyAuthMiddleware, controller.GetSubject)
    router.get('/exams', FacultyAuthMiddleware, controller.getExams)
    router.get('/exams/:id', FacultyAuthMiddleware, controller.getExamsWithId)
    // router.patch('/exams/:id', FacultyAuthMiddleware, controller.EditExamWithId)
    // router.delete('/exams/:id', FacultyAuthMiddleware, controller.DeleteExamWithId)

    return router
}