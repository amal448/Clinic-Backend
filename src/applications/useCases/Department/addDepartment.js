import AppError from "../../../utils/appError";
import { DepartmentDbInterface } from "../../repositories/departmentDbRepository";

export const addDepartment = async (department, DepartmentRepository) => {
    const Department = await DepartmentRepository.addDepartment(department);
    if (!Department) {
        throw new AppError('Department Not added!Something is wrong!', HttpStatus.UNAUTHORIZED);
    }
    return Department;
}


