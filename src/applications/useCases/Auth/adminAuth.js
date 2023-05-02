import AppError from "../../../utils/appError";
import { AdminDbInterface } from "../../repositories/adminDbRepository";
import { AuthServiceInterface } from "../../services/AuthServiceInterface";

const adminLogin = async (email, password, adminRepository, authService) => {

    const admin = await adminRepository.getAdminByEmail(email);
    if (!admin) {
        throw new AppError('Invalid Credentials', HttpStatus.UNAUTHORIZED)
    }
    const PasswordCheck = await authService.comparePassword(password, admin.password);
    if (!PasswordCheck) {
        throw new AppError('Password is incorrect', HttpStatus.UNAUTHORIZED);
    }
    const token = authService.generateToken(admin._id);
    return token;
}

export default adminLogin;