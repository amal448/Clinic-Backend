import { getDefaultDirectives } from "helmet/dist/types/middlewares/content-security-policy";
import { ExamDbInterface } from "../../repositories/ExamRepositoryInterface"
import { FacultyDbInterface } from "../../repositories/FacultyRepository";
import { StudentDbInterface } from "../../repositories/studentRepository"

export const GetStudentDepartment = async (studentId, StudentRepository, FacultyRepository, ExamRepository) => {
    const Student = await StudentRepository.getStudentById(studentId);
    const department = Student?.department;
    const getFaculty = await (await FacultyRepository).getFacultyByDept(department)
    const facultyId = getFaculty._id;
    const getExams = await ExamRepository.GetExams(facultyId)
    return getExams;
}