import asyncHandler from "express-async-handler";
import { request } from "http";

import { DepartmentDbInterface, DepartmentRepository } from "../../applications/repositories/departmentDbRepository"
import { DepartmentdRepositoryMongoDb } from "../../frameworks/database/mongoDB/repository/departmentReposirtoryMongoDb"
import { addDepartment } from "../../applications/useCases/Department/addDepartment";
import { AdminDbInterface } from "../../applications/repositories/adminDbRepository";
import { AdminRepositoryMongoDB } from "../../frameworks/database/mongoDB/repository/adminRepositoryMongoDB";
import { cacheRepositoryInterface } from "../../applications/repositories/cacheRepositoryInterface";
import { redisRepository } from "../../frameworks/database/redis/setCache";
import { redisClient } from "../../app";
import { addStudent } from "../../applications/useCases/Student/addStudent";
import { StudentDbInterface } from "../../applications/repositories/studentRepository";
import { studentRepositoryMongoDB } from "../../frameworks/database/mongoDB/repository/studentsRepositoryMongoDB";
import { RegisterNumberInterface } from "../../applications/services/generateRegisterNumber";
import { RegistrationNumber } from "../../frameworks/services/GenerateRegisteration";
import { FacultyRepositoryMongoDb } from "../../frameworks/database/mongoDB/repository/FacultyRepositoryMongoDb";
import { FacultyDbInterface } from "../../applications/repositories/FacultyRepository";
import { EmailService } from "../../frameworks/services/EmailService";
import { EmailServiceInterface } from "../../applications/services/EmailServiceInterface";
import { FacultyEdit } from "../../applications/useCases/Admin/EditFaculty";

const AdminController = ({departmentDbRepository,
    departmentDbImpl,
    AdminDbRepository,
    adminDbRepositoryImpl,
    cacheRepositoryInterface,
    cacheRepositoryImpl,
    cacheClient,
    studentDbRepository,
    studentDbRepositoryImpl,
    RegisterNumberInterface,
    RegisterNumberImpl,
    FacultyImpl,
    facultyInterface,
    EmailServiceImpl,
    EmailServiceInterface,
}) => {
    const DbRepositoryDepartment = departmentDbRepository(departmentDbImpl());
    const dbRepositoryAdmin = AdminDbRepository(adminDbRepositoryImpl());
    const cacheRepository = cacheRepositoryInterface(cacheRepositoryImpl(cacheClient));
    const dbRepositoryStudent = studentDbRepository(studentDbRepositoryImpl());
    const registerNoService = RegisterNumberInterface(RegisterNumberImpl())
    const dbFacultyRepository = facultyInterface(FacultyImpl());
    const EmailService = EmailServiceInterface(EmailServiceImpl())

    const AddDepartment = asyncHandler(async (req,res) => {
        const { department} = req.body;
        const Added = await addDepartment(department, DbRepositoryDepartment)

        res.json({
            status: 'success',
            message: 'department added',
            Added,
        })
    })

    const getDepartment = asyncHandler(async (req, res) => {
        const Departments = await DbRepositoryDepartment.getDepartmentData();

        res.json({
            status: 'success',
            message: 'Department fetched',
            Departments
        })
    })

    const AddStudent = asyncHandler(async (req, res) => {
        const { name, email, date, department, gender, contact_no } = req.body;
        const studentData = {
            name,
            email,
            year: date,
            department,
            gender,
            contact_no,
        }

        const StudentAdd = await addStudent(studentData, dbRepositoryStudent, registerNoService)



        const sendMail = await EmailService.sendEmail(email, StudentAdd)

        console.log('I am the response of the sent email', sendMail)

        res.json({
            status: 'success',
            message: 'Student Added!',
            StudentAdd
        })
    })

    const AdminHomeData = asyncHandler(async (req, res) => {
        const adminId = req.admin;
        const adminData = await dbRepositoryAdmin.getAdminById(adminId);
        const departments = await DbRepositoryDepartment.TotalDepartment();
        const students = await dbRepositoryStudent.getAllStudentsCount();
        const faculty = await (await dbFacultyRepository).TotalFaculty();

        console.log(departments, students, faculty, adminData)

        res.json({
            status: 'success',
            message: 'data fetched',
            departments,
            students,
            adminData,
            faculty
        })

    })

    const addFaculty = asyncHandler(async (req, res) => {
        const { name, email, designation, department } = req.body;
        const facultyData = { name, email, designation, department };
        const FacultyAdd = await (await dbFacultyRepository).addFaculty(facultyData);
        res.json({
            status: 'success',
            message: 'faculty added',
            FacultyAdd
        })
    })

    const addSubject = asyncHandler(async (req, res) => {
        const { name, code, department, total } = req.body;
        const SubjectInfo= { name, code, department, total };
        await DbRepositoryDepartment.addSubject(SubjectInfo)

        res.json({
            status: 'success',
            message: 'subject added!',
        })
    })

    const getStudentsWithDept = asyncHandler(async (req, res) => {
        const deptId= req.params.id;
        const students= await dbRepositoryStudent.getStudentWithDept(deptId)
        console.log('this is students data with dept', students)
        res.json({
            status: 'success',
            message: 'data fetched',
            students,
        })
    })

    const getSubjectsWithDept = asyncHandler(async (req, res) => {
        const deptId = req.params.id;
        console.log('this is the id', deptId)
        const subjectData = await DbRepositoryDepartment.getSubjectsByDept(deptId)
        const subjects = subjectData[0].Subjects;
        console.log('this is the subjects', subjects)
        res.json({
            status: 'success',
            message: 'subjects fetched',
            subjects,
        })
    })

    const getFaculty = asyncHandler(async (req, res) => {
        const allFaculty = await (await dbFacultyRepository).getFaculty();
        res.json({
            status: 'success',
            message: 'faculty fetched',
            allFaculty,
        })
    })

    const deleteFaculty = asyncHandler(async (req, res) => {
        const facultyId = req.params.id;
        console.log(facultyId, 'this is my faculty id')
        const facultyDelete = await (await dbFacultyRepository).deleteFaculty(facultyId)
        res.json({
            status: 'success',
            message: 'faculty deleted',
            facultyDelete
        })
    })

    const EditFaculty = asyncHandler(async (req, res) => {
        const { name, department, email, phoneNumber, facultyId } = req.body;
        console.log(name,department,email,phoneNumber,facultyId,'THis is the dataaaaaaaa')
        const EditFaculty = await FacultyEdit({ name, department, email, phoneNumber, facultyId }, dbFacultyRepository);
        res.json({
            status: 'success',
            message: 'faculty Edited',
            EditFaculty,
        })
    })


    return {
        AddDepartment,
        getDepartment,
        AddStudent,
        AdminHomeData,
        addFaculty,
        addSubject,
        getStudentsWithDept,
        getSubjectsWithDept,
        getFaculty,
        deleteFaculty,
        EditFaculty,
    }
}

export default AdminController;