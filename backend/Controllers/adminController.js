const { Lesson } = require("../Models/lessons");
const { Teacher } = require("../Models/teachers");
const { User } = require("../Models/users")

const getAllTeachers=async (req , res)=>{
    try {
        const teacher=await User.find({role:'teacher'});
        res.status(200).json({data:teacher})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Server Error'})
    }
}

const getAllStudents=async (req , res)=>{
    try {
        const student=await User.find({role:'student'});
        res.status(200).json({data:student})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Server Error'})
    }
}

const getOneTeacher=async (req , res)=>{
    try {

        const id = req.params.id;
        const teacher=await Teacher.findOne({teacher:id}).populate('students');
        res.status(200).json({data:teacher})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Server Error'})
    }
}

const getOneStudent=async (req , res)=>{
    try {
        const id = req.params.id;
        let student=await User.findById(req.params.id).lean()
        const lesson=await Lesson.find({student:student._id})
        const fullData={...student,lesson}
        console.log(fullData)
        res.status(200).json({status:true,data:fullData})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Server Error'})
    }
}

const searchTeacher=async (req , res)=>{
    try {
        let user = await User.find({ name: { $regex: req.query.name, $options: 'i' } });
        //when click on user means teacher redirect to getOneTeacher route
        res.status(200).json({ status: true,data: user })
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Server Error'})
    }
}

const searchStudent=async (req , res)=>{
    try {
       
        const user = await User.find({$or:[{ name: { $regex: req.query.user, $options: 'i' } },{email:{$regex:req.query.user, $options: 'i'}}]} );
        // when click on user redirect to getOneStudent route
       
        
        res.status(200).json({ status: true,data: user })
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Server Error'})
    }
}

const addStudentInList = async (req, res) => {
    try {
        const student = await User.findOne({ name: req.body.student });
        if (!student) {
            return res.status(404).json({ status: false, msg: 'Student not found' });
        }

        const teacherUser = await User.findOne({ name: req.params.teacher });
        if (!teacherUser) {
            return res.status(404).json({ status: false, msg: 'Teacher user not found' });
        }
        console.log(teacherUser._id)
        const teacher = await Teacher.findOne({ teacher: teacherUser._id });
        if (!teacher) {
            return res.status(404).json({ status: false, msg: 'Teacher not found in Teacher collection' });
        }

        if (teacher.students.includes(student._id)) {
            return res.status(200).json({ status: false, msg: 'Student already exists.' });
        }

        teacher.students.push(student._id);
        await teacher.save();

        res.status(200).json({ status: true, msg: 'Student added successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};


module.exports={
    getAllTeachers,
    getAllStudents,
    getOneTeacher,
    getOneStudent,
    addStudentInList,
    searchTeacher,
    searchStudent,
}