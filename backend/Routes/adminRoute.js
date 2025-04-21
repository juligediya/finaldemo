const express=require('express')
const { isAuthenticatedAdmin } = require('../Middelwares/auth')
const { getAllStudents, getAllTeachers, getOneTeacher, getOneStudent, searchTeacher, searchStudent, addStudentInList } = require('../Controllers/adminController')
const router=express.Router()

router.get('/teachers',isAuthenticatedAdmin,getAllTeachers)
router.get('/students',isAuthenticatedAdmin,getAllStudents)
router.get('/teacher/:id',isAuthenticatedAdmin,getOneTeacher)
router.get('/student/:id',isAuthenticatedAdmin,getOneStudent)
router.get('/oneTeacher/search',isAuthenticatedAdmin,searchTeacher)
router.get('/oneStudent/search',isAuthenticatedAdmin,searchStudent)
router.put('/students/:teacher',isAuthenticatedAdmin,addStudentInList)


module.exports={
    router
}