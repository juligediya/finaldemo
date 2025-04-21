const mongoose=require('mongoose')

const teachersSchema=new mongoose.Schema({
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    students:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
},{timestamps:true});

const Teacher=mongoose.model('Teacher',teachersSchema);

module.exports={Teacher}