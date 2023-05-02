import { studentRepositoryMongoDBReturn } from "../../frameworks/database/mongoDB/repository/departmentReposirtoryMongoDb"


export const DepartmentRepository = (repository) => {

    const addDepartment = async (department) => await repository.addDepartment(department)
    const getDepartmentData = async () => await repository.getDepartment();
    const TotalDepartment = async () => await repository.TotalDepartment();
    const addSubject = async (subject) => await repository.addSubject(subject)
    const getDepartmentById = async (departmentId) => await repository.getDepartmentById(departmentId)
    const getSubjectsByDept = async (departmentId) => await repository.getSubjects(departmentId)


    return {
        addDepartment,
        getDepartmentData,
        TotalDepartment,
        addSubject,
        getDepartmentById,
        getSubjectsByDept,
    }
}

// export type DepartmentDbInterface = typeof DepartmentRepository;


