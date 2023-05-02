
import adminLogin from "../../applications/useCases/Auth/adminAuth";
import asyncHandler from 'express-async-handler'
import {adminDbRepository } from "../../applications/repositories/adminDbRepository";
import { AuthServiceInterface } from "../../applications/services/AuthServiceInterface";
import { studentRepositoryMongoDB } from "../../frameworks/database/mongoDB/repository/studentsRepositoryMongoDB";
import { StudentDbInterface } from "../../applications/repositories/studentRepository";
import { StudentLogin } from "../../applications/useCases/Auth/StudentAuth";
import { AdminRepositoryMongoDB } from "../../frameworks/database/mongoDB/repository/adminRepositoryMongoDB";
import { AuthService } from "../../frameworks/services/authServices";
import { FacultyLogin } from "../../applications/useCases/Auth/FacultyAuth";
import { FacultyDbInterface } from "../../applications/repositories/FacultyRepository";
import { FacultyRepositoryMongoDb } from "../../frameworks/database/mongoDB/repository/FacultyRepositoryMongoDb";

const authController = (adminDbRepository,
    adminDbRepositoryImpl,
    facultyDbRepository,
    facultyDbRepositoryImpl,
    authServiceImpl,
    authServiceInterface,
    StudentDbRepository,
    StudentDbRepositoryImpl) => {
    const dbRepositoryStudent = StudentDbRepository(StudentDbRepositoryImpl());
    const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl());
    const dbRepositoryFaculty = facultyDbRepository(facultyDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());

    const LoginAdmin = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const token = await adminLogin(email, password, dbRepositoryAdmin, authService)
        res.json({
            status: 'success',
            message: 'admin verified',
            token,
        })
    })

    const LoginStudent = asyncHandler(async (req, res) => {
        const { email, reg_no }= req.body;
        const token = await StudentLogin(email, reg_no, dbRepositoryStudent, authService)
        res.json({
            status: 'success',
            message: 'Student verified',
            token,
        })
    })

    const LoginFaculty = asyncHandler(async (req, res) => {
        const { email, password }= req.body;
        console.log('data has reached here')
        const token = await FacultyLogin(email, password, dbRepositoryFaculty, authService);
        console.log('token is here',token)
        res.json(
            {
                status: 'success',
                message: 'Faculty Verified',
                token
            }
        )
    })

    return {
        LoginStudent,
        LoginAdmin,
        LoginFaculty,
    }

}

export default authController