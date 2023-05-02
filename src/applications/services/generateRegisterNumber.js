import { RegistrationNumberReturn } from "../../frameworks/services/GenerateRegisteration";

export const RegisterNumber = (service) => {
    const StudentRegisteration = (students) => service.GenerateStudentNo(students)
    
    const FacultyRegistration = (faculties) => service.GenerateFacultyNo(faculties);

    return {
        StudentRegisteration,
        FacultyRegistration,
    }
}
