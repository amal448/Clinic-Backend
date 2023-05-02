import { AdminRepositoryMongoDBReturn } from "../../frameworks/database/mongoDB/repository/adminRepositoryMongoDB";

export const adminDbRepository = (repository) => {
    const getAdminByEmail = async (email) => await repository.getAdminByEmail(email)
    const getAdminById = async (id) => await repository.getAdminById(id);

    return {
        getAdminByEmail,
        getAdminById,
    }

}

// export type AdminDbInterface = typeof adminDbRepository;


