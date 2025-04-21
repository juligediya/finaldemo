const express = require('express');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const cors=require('cors');

require('dotenv').config()

const app = express();
app.use(cookieParser());
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json());
const PORT = process.env.PORT;

const {router : adminRouter}=require('./Routes/adminRoute')
const {router : studentRouter}=require('./Routes/studentRoute')
const {router : teacherRouter}=require('./Routes/teacherRoute')
const {router : userRouter}=require('./Routes/userRoute')

mongoose.connect('mongodb://localhost:27017/student_management')
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log('Error in connection', err))

app.use('/',userRouter)
app.use('/admin',adminRouter)
app.use('/teacher',teacherRouter)
app.use('/student',studentRouter)


app.listen(PORT, () => console.log('server connected at ',PORT))