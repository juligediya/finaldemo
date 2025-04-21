const { Lesson } = require("../Models/lessons")
const { User } =require('../Models/users')
const fetchLessons=async (req , res)=>{
    try {
        const lesson=await Lesson.find({student:req.user._id});
        res.status(200).json({data:lesson})
    } catch (error) {
        console.log(error,'-----------------')
        res.status(500).json({msg:'Server Error'})
    }
}

const addLesson=async (req , res)=>{
    try {
        const {content , teacher}=req.body;
        const teacherId = await User.findOne({name:teacher});
    
        if(!teacherId){
          
            return res.status(404).json({ status: false, msg: 'Teacher not found ' });
        }else{
        const newLesson= await Lesson({content,teacher:teacherId._id,student:req.user._id});
        await newLesson.save()
        res.status(200).json({data:newLesson,msg:'Lesson Added Successfully.'})}
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Server Error'})
    }
}

module.exports={
    fetchLessons,
    addLesson
}