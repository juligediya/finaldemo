const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:String,
    },
    role:{
        type:String,
        required:true,
        enum:[ "admin" , "teacher" , "student" ]
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

userSchema.pre('save',async function (next){
    console.log('hi')
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,10)
    }
    next()
})
const User=mongoose.model('User',userSchema);

module.exports={User}