import AdminInterface, { AdminDataInterface } from "../../../../types/adminInterface";
import Admin from "../models/adminModel";

export const AdminRepositoryMongoDB = () => {

    const getAdminByEmail = async (email) => {
        const admin= await Admin.findOne({ email })
        return admin;
    }

    const getAdminById = async (id) => {
        console.log(id, 'reached query and this is the id');
        const admin= await Admin.findById(id).select('-password');
        console.log(admin, 'this is admin data')
        return admin;
    }

    return {
        getAdminByEmail,
        getAdminById,
    }
}
