

export const RegistrationNumber = () => {
    const GenerateStudentNo = (students) => {
        students = ++students;
        students = '00' + (students);

        let date = new Date();
        const year = date.getFullYear()
        console.log(year)
        const reg_no = 'ADM_' + `${year}_` + `${students}`
        return reg_no;
    }

    const GenerateFacultyNo = (faculty) => {

        let date = new Date();
        const year = date.getFullYear()
        console.log(year)
        const reg_no = 'FAC_' + `${year}_` + `${++faculty}`
        return reg_no;
    }

    return {
        GenerateStudentNo,
        GenerateFacultyNo,

    }
}


