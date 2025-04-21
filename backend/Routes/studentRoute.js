const express=require('express')
const { isAuthenticatedStudent } = require('../Middelwares/auth')
const { fetchLessons, addLesson } = require('../Controllers/studentController')
const router=express.Router()

router.get('/getLesson',isAuthenticatedStudent,fetchLessons);
router.post('/addLesson',isAuthenticatedStudent,addLesson)

module.exports={
    router
}