import Faculty from "../../frameworks/database/mongoDB/models/FacultyModel";
import { FacultyRepositoryMongoDbReturn } from "../../frameworks/database/mongoDB/repository/FacultyRepositoryMongoDb";

export const FacultyRepository = async (repository) => {

    const getFacultyByEmail = async (email) => {
        const Faculty = await repository.getFacultyByEmail(email)
        return Faculty;
    }

    const EditFaculty = async (id, facultyData) => {
        const faculty = await repository.EditFaculty(id, facultyData);
        return faculty;
    }

    const TotalFaculty = async () => {
        const faculties = await repository.TotalFaculty();
        return faculties;
    }

    const addFaculty = async (faculty) => {
        const AddFaculty = await repository.addFaculty(faculty)
    }

    const GetFacultyById = async (facultyId) => {
        const faculty = await repository.GetFacultyById(facultyId);
        return faculty;
    }

    const getFacultyByDept = async (departmentId) => {
        const faculty = await Faculty.findOne({ department: departmentId })
        return faculty;
    }

    const getFaculty = async () => await repository.getFaculty();

    const deleteFaculty = async (facultyId) => await repository.deleteFaculty(facultyId)

    const checkFacultyDept = async (departmentId) => await repository.checkFacultyDept(departmentId)

    const EditDeptFaculty = async (details) => await repository.EditDeptFaculty(details);

    return {
        getFacultyByEmail,
        TotalFaculty,
        addFaculty,
        EditFaculty,
        GetFacultyById,
        getFacultyByDept,
        getFaculty,
        deleteFaculty,
        checkFacultyDept,
        EditDeptFaculty,
    }

}

