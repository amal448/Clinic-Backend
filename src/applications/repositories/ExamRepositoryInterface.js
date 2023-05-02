import { ExamRepositoryMongoDbReturn } from "../../frameworks/database/mongoDB/repository/ExamRepositoryMongoDb";

export const ExamDbRepository = (repository) => {
    const AddExam = async (ExamDetails) => await repository.AddExam(ExamDetails);
    const GetExams = async (facultyId) => await repository.getExams(facultyId);
    return {
        AddExam,
        GetExams
    }
}

// export type ExamDbInterface = typeof ExamDbRepository;