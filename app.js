const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet  = require('helmet')
const hpp = require('hpp')
const rateLimiter = require('express-rate-limit')
const  router  = require('./src/routes/api')

require('dotenv').config()
const app = new express()


app.use(cors())


app.use(helmet())
app.use(hpp())
app.use(express.json({limit:'20MB'}))
app.use(express.urlencoded({extended:true}))
const limiter = rateLimiter({windowMs:15*60*1000,max:3000})
app.use(limiter)

const URL = `${process.env.DATABASE_NAME}`
const OPTION = {name:'' , pass:'', autoIndex:true}
mongoose.connect(URL,OPTION).then((res)=>{
    console.log('Database Connected')
}).catch((err)=>{
    console.log(err)
})


app.use('/api', router)


app.use('*',(req,res)=>{
    res.status(404).json({status:'fail' , message:'404 not found'})
})

module.exports = app