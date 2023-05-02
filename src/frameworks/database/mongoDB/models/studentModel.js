import mongoose, { Schema, model } from "mongoose";

const studentsSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please Enter the name!'],
        },
        password: {
            type: String,
            default: '',
        },
        firstLogin: {
            type: Boolean,
            default: true,
        },
        email: {
            type: String,
            required: [true, 'Please enter an Email!'],
        },
        department: {
            type: String,
            required: [true, 'Select a department!'],
        },
        Joining_Year: {
            type: String,
            required: true,
        },
        Reg_No: {
            type: String,
            required: true,
        },
        Contact_No: {
            type: Number,
        },
        gender: {
            type: String,
        },
        nationality: {
            type: String,
        }, url: {
            type: String,
        }
    },
)

const Student = model('Student', studentsSchema, 'Student')
export default Student;