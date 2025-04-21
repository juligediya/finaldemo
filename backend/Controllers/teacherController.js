const { Lesson } = require("../Models/lessons");
const { Teacher } = require("../Models/teachers");
const { User } = require("../Models/users");

const getStudents=async (req , res)=>{
    try {
        const students=await Teacher.findOne({teacher:req.user._id}).populate('students');
        res.status(200).json({status:true,data:students})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Server Error'})
    }
}

const getOneStudent=async (req , res)=>{
    try {
        const student=await User.findById(req.params.id).lean();
        const lesson=await Lesson.find({student:student._id})
        const fullData={...student,lesson}
        res.status(200).json({status:true,data:fullData})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Server Error'})
    }
}

const searchStudent=async (req , res)=>{
    try {
       
        const teacher=await Teacher.findOne({teacher:req.user.id}).populate({
            path:'students',
            match :{name:{$regex : req.query.name , $options:'i'}}
        });
        if(teacher.students.length===0){
            return res.status(401).json({status:false,msg:'User Not Found'})
        }
        res.status(200).json({status:true,data:teacher})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Server Error'})
    }
}

module.exports={
    getStudents,
    getOneStudent,
    searchStudent
}