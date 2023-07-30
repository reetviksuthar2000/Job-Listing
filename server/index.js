const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get('/data', (req, res) => {
    res.send('data')
  })
  
app.get('/meta', (req, res) => {
    res.send('data')
  })
  

app.listen(process.env.PORT, ()=>{
    console.log('server listening on port http://localhost:${process.env.PORT}')
})