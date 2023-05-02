import AppError from "../../../utils/appError";
import { StudentDbInterface, StudentRepository } from "../../repositories/studentRepository";
import { AuthServiceInterface } from "../../services/AuthServiceInterface";
import { authService } from "../../../frameworks/services/authServices";
import mongoose from "mongoose";
import { FacultyDbInterface } from "../../repositories/FacultyRepository";

export const StudentLogin = async (
    email,
    reg_no,
    studentRepository,
    authService
) => {
    const student = await studentRepository.getStudentByEmail(email);
    if (!student) {
        throw new AppError("Account with this email doesn't exist", HttpStatus.UNAUTHORIZED)
    }
    if (!student.password) {

        if (reg_no.startsWith('ADM_')) {

            if (reg_no !== student.Reg_No) {
                throw new AppError('Registration Number is Incorrect!', HttpStatus.UNAUTHORIZED)
            }
        }
    } else {
        const checkPassword = await authService.comparePassword(reg_no, student.password);
        if (!checkPassword) {
            throw new AppError('Password is incorrect', HttpStatus.UNAUTHORIZED);
        }
    }
    const token = authService.generateToken(student._id);
    return token;
}

