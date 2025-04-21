const express=require('express')
const { isAuthenticatedTeacher } = require('../Middelwares/auth')
const { getStudents, getOneStudent, searchStudent } = require('../Controllers/teacherController')
const router=express.Router()

router.get('/allstudent',isAuthenticatedTeacher,getStudents)
router.get('/oneStudent/:id',isAuthenticatedTeacher,getOneStudent)
router.get('/student/search',isAuthenticatedTeacher,searchStudent)

module.exports={
    router
}