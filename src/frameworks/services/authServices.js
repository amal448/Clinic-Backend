import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const authService = () => {
    const encryptPassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        return password;
    }

    const comparePassword = (password, hashedPassword) => {
        return bcrypt.compare(password, hashedPassword);
    }

    const generateToken = (payload) => {
        const token = jwt.sign({ payload }, { expiresIn: '2d', });
        return token;
    }

    const verifyToken = async(token) => {
        const decodedToken = await jwt.verify(token)
        console.log('entered veriy token',decodedToken)
        return decodedToken;
    }


    return {
        encryptPassword,
        comparePassword,
        generateToken,
        verifyToken
    }
}
