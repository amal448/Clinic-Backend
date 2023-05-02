import { model, Schema } from "mongoose";

const FacultySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Enter the Name'],
        },
        email: {
            type: String,
            required: [true, 'Please Enter the email!'],
            unique: true,
        },
        designation: {
            type: String,
            required: [true, 'Select the designation'],
        },
        department: {
            type: String,
            required: [true, 'Select the designation'],
            unique: [true, 'department should be unique!'],
        },
        password: {
            type: String,
        },
        url: {
            type: String,
        },
        phone: {
            type: Number,
        }
    },
    {
        timestamps: true,
    }
)

const Faculty = model('Faculty', FacultySchema, 'Faculty')
export default Faculty;