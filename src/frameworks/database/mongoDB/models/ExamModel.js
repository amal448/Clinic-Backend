import { model, Schema } from "mongoose";

const ExamSchema = new Schema(
    {
        examType: {
            type: String,
            required: [true, 'Enter the Type'],
        },
        faculty: {
            type: String,
        },
        subject: {
            type: String,
            required: [true, 'Please Enter the subject!'],
        },
        TotalMarks: {
            type: Number,
            required: [true, 'Set the total Marks'],
        },
        ExamCode: {
            type: String,
            required: [true, 'Select the Exam Code'],
            unique: [true, 'department should be unique!'],
        },
        passMark: {
            type: Number,
        },
        archive: {
            type: Boolean,
        },
        status:{
            type:String,
        }
    },
    {
        timestamps: true,
    }
)

const Exam = model('Exam', ExamSchema, 'Exam')
export default Exam;