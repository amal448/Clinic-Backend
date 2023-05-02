import { EditStudentInterface, StudentLoginInterface, StudentInterface } from "../../../../types/StudentInterface";
import Student from "../models/studentModel";


export const studentRepositoryMongoDB = () => {
    const addStudent = async (studentInfo) => await Student.create
        (
            {
                name: studentInfo.name,
                email: studentInfo.email,
                department: studentInfo.department,
                dob: studentInfo.dob,
                Joining_Year: studentInfo.year,
                Reg_No: studentInfo.Reg_No,
                Contact_No: studentInfo.contact_no,
                gender: studentInfo.gender
            }
        )

    const editStudent = async (studentId, studentInfo) => {
        console.log('inside the repository this is data', studentInfo)
        console.log('inside the repository this is studentID', studentId)
        return await Student.updateOne({ _id: studentId }, {
            $set: {
                name: studentInfo.name,
                email: studentInfo.email,
                department: studentInfo.department,
                Joining_Year: studentInfo.year,
                registration_No: studentInfo.Reg_No,
                Contact_No: studentInfo.contact_No,
                nationality: studentInfo.nationality,
            }
        })

    }

    const uploadFile = async (id, url) => {
        console.log('these are the data', id, url)
        return await Student.findByIdAndUpdate({ _id: id }, { url: url })
    }

    const getStudentById = async (id) => {
        const data = await Student.findById(id)
        return data;
    }

    const getStudent = async (Reg_No) => {
        const student= await Student.findById(Reg_No);
        return student;
    }

    const getAllStudentsCount = async () => {
        const students= await Student.find().count();
        return students;
    }

    const getStudentByEmail = async (email) => {
        const student = await Student.findOne({ email })
        return student
    }

    const getStudentWithDept = async (deptId) => {
        const students = await Student.find({ department: deptId })
        return students
    }

    const ChangePassword = async (id, hashedPassword) => await Student.findByIdAndUpdate({ _id: id }, { $set: { password: hashedPassword, firstLogin: false } })




    return {
        addStudent,
        editStudent,
        getStudent,
        getStudentByEmail,
        getAllStudentsCount,
        getStudentWithDept,
        getStudentById,
        uploadFile,
        ChangePassword,
    }
}

