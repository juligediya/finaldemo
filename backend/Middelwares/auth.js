const jwt = require('jsonwebtoken');
const { User } = require('../Models/users');
const secret_key=process.env.SECRET_KEY;
const isAuthenticatedAdmin=async (req , res , next)=>{
    try {
        // const token=req.cookies.jwt;
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ status: false, msg: "No token, authorization denied" });
        }
     
        const token = authHeader.split(" ")[1];
  
        if (!token) {
            return res.status(401).json({ status: false, msg: "Invalid token format" });
        }
        const user=await jwt.verify(token,secret_key)
        const verifyUser= await User.findById(user.id);
        if(verifyUser && verifyUser.role==="admin"){
            req.user=verifyUser;
            console.log(req.user)
            next()
        } else{
            res.status(401).json({msg:'Unauthorized Access'})
        }
    } catch (error) {
        console.log(error,'----------------------')
        res.status(500).json({msg:'Server Error'})
    }
}

const isAuthenticatedTeacher=async (req , res , next)=>{
    try {
        // const token=req.cookies.jwt;
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ status: false, msg: "No token, authorization denied" });
        }
     
        const token = authHeader.split(" ")[1];
  
        if (!token) {
            return res.status(401).json({ status: false, msg: "Invalid token format" });
        }
        const user=await jwt.verify(token,secret_key)
        const verifyUser= await User.findById(user.id);
        if(verifyUser && (verifyUser.role==="teacher")){
            req.user=verifyUser;
            console.log(req.user)
            next()
        } else{
            res.status(401).json({msg:'Unauthorized Access'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Server Error'})
    }
}

const isAuthenticatedStudent=async (req , res , next)=>{
    try {
        // const token=req.cookies.jwt;
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ status: false, msg: "No token, authorization denied" });
        }
     
        const token = authHeader.split(" ")[1];
  
        if (!token) {
            return res.status(401).json({ status: false, msg: "Invalid token format" });
        }
        const user=await jwt.verify(token,secret_key)
        const verifyUser= await User.findById(user.id);
        if(verifyUser && (verifyUser.role==="student")){
            req.user=verifyUser;
            console.log(req.user)
            next()
        } else{
            res.status(401).json({msg:'Unauthorized Access'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Server Error'})
    }
}
module.exports={
    isAuthenticatedAdmin,
    isAuthenticatedTeacher,
    isAuthenticatedStudent
}