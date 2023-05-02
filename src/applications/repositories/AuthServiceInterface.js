import { AuthServiceReturn } from "../../frameworks/services/authServices";

export const authServiceInterface = (service) => {
    const encryptPassword = (password) => service.encryptPassword(password);
    const verifyToken = (password) => service.verifyToken(password);
    const comparePassword = (password,hashedPassword) => service.comparePassword(password,hashedPassword);
    const generateToken = (payload) => service.generateToken(payload)

    return {
        encryptPassword,
        verifyToken,
        comparePassword,
        generateToken,
    }

}

// export type AuthServiceInterface = typeof authServiceInterface;
