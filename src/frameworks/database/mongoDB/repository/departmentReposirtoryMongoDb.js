
import mongoose from "mongoose";
import { SubjectInterface } from "../../../../types/StudentInterface";
import Department from "../models/DepartmentModel";

export const DepartmentdRepositoryMongoDb = () => {

    const addDepartment = async (department) => await Department.create({ department })

    const getDepartment = async () => {
        const dept = await Department.find({}).select('department');
        console.log(dept)
        return dept
    }

    const TotalDepartment = async () => {
        const departments = await Department.find().count();
        return departments;
    }

    const getSubjects = async (departmentId) => {
        const subjects = await Department.find({ _id: departmentId }).select('Subjects');
        return subjects;
    }

    const addSubject = async (SubjectInfo) => {
        const department = SubjectInfo.department;
        console.log('this is the data', SubjectInfo)
        await Department.findByIdAndUpdate({ _id: department },
            {
                $push:
                {
                    'Subjects':
                    {
                        subjectCode: SubjectInfo.code,
                        subjectName: SubjectInfo.name,
                        totalLecture: SubjectInfo.total,
                    }
                }
            })

    }

    const getDepartmentById = async (departmentId) => await Department.findOne({ _id: departmentId }).select('Subjects')

    return {
        addDepartment,
        getDepartment,
        TotalDepartment,
        addSubject,
        getSubjects,
        getDepartmentById,
    }
}
