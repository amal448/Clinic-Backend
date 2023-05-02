import { transformArguments } from "@redis/search/dist/commands/AGGREGATE";
import mongoose, { Schema, model } from "mongoose";

const SubjectSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Enter the name of subject"],
            unique: true,
        },
        subjectCode: {
            type: Number,
            required: [true, 'Enter the code'],
            unique: true,
        },
        department: {
            type: mongoose.Types.ObjectId,
            required: [true, "Select a department"],
        },
        Total_Lecture: {
            type: Number,
            required: [true, 'Enter the number of lectures'],
        },
        Classes: {
            type: Number,
        },
    }, {
    timestamps: true,
}
)

const Subjects = model('Subjects',SubjectSchema,'Subjects');
export default Subjects;