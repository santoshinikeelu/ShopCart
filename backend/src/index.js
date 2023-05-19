const express = require('express')
const route =require('./route')
const connection = require('./config')
const cors = require('cors')
const app = express()


app.use(express.json())
app.use(cors())

 app.use('/',route)

app.listen((3000||process.env.port),function(){
    console.log("express running on port:"+ 3000 || process.env.port)
})