import asyncHandler from 'express-async-handler';
import { redisClient } from '../../app';

import { FacultyDbInterface } from "../../applications/repositories/FacultyRepository";
import { AdminDbInterface } from "../../applications/repositories/adminDbRepository";
import { StudentDbInterface } from "../../applications/repositories/studentRepository";
import { AuthServiceInterface } from "../../applications/services/AuthServiceInterface";
import { FacultyRepositoryMongoDb } from "../../frameworks/database/mongoDB/repository/FacultyRepositoryMongoDb";
import { AdminRepositoryMongoDB } from "../../frameworks/database/mongoDB/repository/adminRepositoryMongoDB";
import { studentRepositoryMongoDB } from "../../frameworks/database/mongoDB/repository/studentsRepositoryMongoDB";
import { AuthService, authService } from "../../frameworks/services/authServices";
import { redisRepository } from '../../frameworks/database/redis/setCache';
import { cacheRepositoryInterface } from '../../applications/repositories/cacheRepositoryInterface';
import { DepartmentdRepositoryMongoDb } from '../../frameworks/database/mongoDB/repository/departmentReposirtoryMongoDb';
import { DepartmentDbInterface } from '../../applications/repositories/departmentDbRepository';
import { ExamRepositoryMongoDb } from '../../frameworks/database/mongoDB/repository/ExamRepositoryMongoDb';
import { ExamDbInterface } from '../../applications/repositories/ExamRepositoryInterface';
import { GetStudentDepartment } from '../../applications/useCases/Student/StudentDept';
import { UploadFile } from '../../applications/useCases/Student/UploadFile';
import { Cloudinary } from "../../frameworks/services/cloudinary";
import { CloudinaryServiceInterface } from "../../applications/services/CloudinaryService";
import { PasswordChange } from '../../applications/useCases/Student/ChangePassword';
import { authServiceInterface } from '../../applications/repositories/AuthServiceInterface';

const StudentController = (departmentDbRepository,
    departmentDbImpl,
    AdminDbRepository,
    adminDbRepositoryImpl,
    cacheRepositoryInterface,
    cacheRepositoryImpl,
    cacheClient,
    studentDbRepository,
    studentDbRepositoryImpl,
    FacultyImpl,
    facultyInterface,
    ExamInterface,
    ExamImpl,
    authServiceImpl,
    authServiceInterface,

) => {
    const DbRepositoryDepartment = departmentDbRepository(departmentDbImpl());
    const dbRepositoryAdmin = AdminDbRepository(adminDbRepositoryImpl());
    const cacheRepository = cacheRepositoryInterface(cacheRepositoryImpl(cacheClient));
    const dbRepositoryStudent = studentDbRepository(studentDbRepositoryImpl());
    const dbFacultyRepository = facultyInterface(FacultyImpl());
    const dbExamRepository = ExamInterface(ExamImpl());
    const CloudinaryRepository = CloudinaryServiceInterface(Cloudinary());
    const AuthService = authServiceInterface(authServiceImpl());

    const getStudentData = asyncHandler(async (req, res) => {
        const studentId = req.student;
        console.log(studentId, 'reached inside the getStudentData');
        const student = await dbRepositoryStudent.getStudentById(studentId);
        console.log('this is the student', student);
        res.json({
            status: 'success',
            message: 'data fetched',
            student,
        })
    })

    const EditStudent = asyncHandler(async (req, res) => {
        console.log('this is the body of request', req.body)
        const { mobile, nationality, email, name, dob } = req.body;
        const studentId = req.student;
        const studentData = {
            Contact_No: mobile,
            nationality,
            email,
            name,
            dob
        }
        console.log('this is the real data', studentData)
        const edited = await dbRepositoryStudent.EditStudent(studentId, studentData)
        console.log(edited, 'response is on the way')
        res.json({
            status: 'success',
            message: 'student Edited',
            edited,
        })
    })

    const GetExams = asyncHandler(async (req, res) => {
        const studentId = req.student;
        const Exams = await GetStudentDepartment(studentId, dbRepositoryStudent, dbFacultyRepository, dbExamRepository)
        res.json({
            status: 'success',
            message: 'exams fetched',
            Exams,
        })

    })


    const UploadPic = asyncHandler(async (req, res) => {

        const filePath = req.file?.path;
        console.log(filePath)
        const studentId= req.student;
        const AddFile = await UploadFile(studentId, filePath, dbRepositoryStudent, CloudinaryRepository)

        res.json({
            status: 'success',
            message: 'reached',
            AddFile
        })
    })

    const ChangePassword = asyncHandler(async (req, res) => {
        const studentId = req.student;
        const { newPassword, oldPassword = '' } = req.body;
        console.log('this is my old password', oldPassword)
        const ChangedPassword = await PasswordChange(studentId, dbRepositoryStudent, AuthService, newPassword, oldPassword)
        console.log('changed', ChangedPassword)

        res.json({
            status: 'success',
            message: 'Password Changed',
            password: true,
        })
    })


    return {
        getStudentData,
        EditStudent,
        GetExams,
        UploadPic,
        ChangePassword,
    }


}

export default StudentController;