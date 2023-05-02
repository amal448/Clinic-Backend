import AppError from "../../../utils/appError";
import { StudentDbInterface } from "../../repositories/studentRepository";
import { AuthServiceInterface } from "../../services/AuthServiceInterface";

export const PasswordChange = async (id, StudentRepository, authServices, newPassword, oldPassword = '') => {
    const hashedPassword = await authServices.encryptPassword(newPassword)
    console.log('this is my hashed password', hashedPassword)
    if (oldPassword != '') {
        const student = await StudentRepository.getStudentById(id);
        const checkPassword = await authServices.comparePassword(oldPassword, student?.password)
        if (!checkPassword) {
            throw new AppError('Incorrect current password', HttpStatus.UNAUTHORIZED)
        }
    }
    const changePassword = await StudentRepository.ChangePassword(id, hashedPassword)
    return true;

}