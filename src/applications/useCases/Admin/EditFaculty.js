import AppError from "../../../utils/appError";
import { FacultyDbInterface } from "../../repositories/FacultyRepository";

export const FacultyEdit = async (details, FacultyRepository) => {
    const checkFacultyDept = await (await FacultyRepository).checkFacultyDept(details.department);
    if (checkFacultyDept) {
        throw new AppError('This department already has a Faculty!', HttpStatus.UNAUTHORIZED)
    }
    const editFaculty = (await FacultyRepository).EditDeptFaculty(details);

    return editFaculty; 
}