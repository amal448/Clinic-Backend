import { StudentInterface } from "../../../types/StudentInterface";
import { StudentDbInterface } from "../../repositories/studentRepository";
import { RegisterNumberInterface } from "../../services/generateRegisterNumber";

export const addStudent = async (StudentData, studentRepository, RegNoService) => {
    const studentsNo = await studentRepository.getAllStudentsCount();
    // console.log('student no', studentsNo)
    const reg_no = RegNoService.StudentRegisteration(studentsNo)
    // console.log('reg_no', reg_no)
    StudentData.Reg_No = reg_no;
    // console.log(StudentData)
    await studentRepository.addStudent(StudentData);
    return reg_no;
}