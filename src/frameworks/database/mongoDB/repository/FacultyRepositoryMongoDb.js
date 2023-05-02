import Faculty from "../models/FacultyModel";


export const FacultyRepositoryMongoDb = () => {
    const getFacultyByEmail = async (email) => {
        const faculty = await Faculty.findOne({ email })
        return faculty;
    }

    const addFaculty = async (FacultyInfo) => {
        await Faculty.create(
            {
                name: FacultyInfo.name,
                email: FacultyInfo.email,
                department: FacultyInfo.department,
                designation: FacultyInfo.designation,
            }
        )
    }

    const EditFaculty = async (id, FacultyData) => {
        const faculty = await Faculty.findByIdAndUpdate({ _id: id },
            {
                name: FacultyData.name,
                email: FacultyData.email,
                url: FacultyData.url,
                phone: FacultyData.number,
            })
        console.log('this is faculty query', faculty)

        return faculty;
    }

    const getFaculty = async () => await Faculty.find()

    const GetFacultyById = async (id) => {
        const faculty = await Faculty.findById({ _id: id })
        return faculty;
    }

    const TotalFaculty = async () => {
        const count = await Faculty.find().count();
        return count;
    }

    const deleteFaculty = async (facultyId) => {
        const deleteFac = await Faculty.findOneAndDelete({ _id: facultyId })
        return deleteFac;
    }

    const EditDeptFaculty = async (details) => {
        const edited = await Faculty.findByIdAndUpdate({ _id: details.facultyId }, {
            $set: {
                name: details.name,
                email: details.email,
                department: details.department,
                phone: details.phoneNumber,
            }
        }, { new: true })
        return edited;
    }

    const checkFacultyDept = async (departmentId) => {
        const checkfaculty = Faculty.findOne({ department: departmentId })
        return checkfaculty;
    }

    return {
        getFacultyByEmail,
        getFaculty,
        addFaculty,
        TotalFaculty,
        EditFaculty,
        GetFacultyById,
        checkFacultyDept,
        deleteFaculty,
        EditDeptFaculty
    }
}


