const mongoose=require('mongoose')

const lessonSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    
},{timestamps:true});

const Lesson=mongoose.model('Lesson',lessonSchema);

module.exports={Lesson}