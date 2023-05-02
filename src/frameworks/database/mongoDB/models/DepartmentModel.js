import { model, Schema } from "mongoose";

const DepartmentSchema = new Schema(
    {
        department: {
            type: String,
            required: [true, 'Enter the Department Name'],
            unique: [true, 'unique'],
        },
        Subjects: [
            {
                subjectCode: { type: String, required: [true, 'Enter the subject Code'], unique: true },
                subjectName: { type: String, required: [true, 'Enter the subject Name'], unique: true },
                totalLecture: { type: Number, required: [true, 'Enter the Number of lectures'] },

            }],
    }, {
    timestamps: true,
}
)

const Department = model('Department', DepartmentSchema, 'Department')
export default Department;