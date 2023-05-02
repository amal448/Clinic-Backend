import { studentRepositoryMongoDB } from "../../frameworks/database/mongoDB/repository/studentsRepositoryMongoDB";

export const StudentRepository = (repository) => {
    const addStudent = async (studentInformation) => await repository.addStudent(studentInformation)
    const EditStudent = async (studentId, studentInfo) => await repository.editStudent(studentId, studentInfo)
    const getStudent = async (Reg_No) => await repository.getStudent(Reg_No);
    const getStudentByEmail = async (email) => await repository.getStudentByEmail(email)
    const getAllStudentsCount = async () => await repository.getAllStudentsCount()
    const getStudentWithDept = async (deptId) => await repository.getStudentWithDept(deptId)
    const getStudentById = async (id) => await repository.getStudentById(id)
    const UploadFile = async (id, url) => await repository.uploadFile(id, url)
    const ChangePassword = async (id, hashedPassword) => await repository.ChangePassword(id, hashedPassword);

    return {
        addStudent,
        EditStudent,
        getStudent,
        getStudentByEmail,
        getAllStudentsCount,
        getStudentWithDept,
        getStudentById,
        UploadFile,
        ChangePassword,
    }

}
