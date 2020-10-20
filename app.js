const express = require ('express')
const mongoose = require ('mongoose')
const app = express()
const bodyParser = require('body-parser')
const cors = require ('cors')
const pdfParsed = require ('./test.js')
const attachedDeputy = require ('./attachDeputy.js')

require('dotenv/config')
const uri = process.env.DB_CONNECTION;
app.use(cors())
//Middlewares (function when executes when routes are beeing hit)
app.use(bodyParser.json())
//Import Routes
const postsRoute = require ('./routes/posts')
app.use('/posts',postsRoute)


//Routes
app.get('/',(req,res)=>{
    res.send("we are on Home")
})
app.get('/test', (req,res)=>{
        
    attachedDeputy.then(data=>{  
        res.json(data)}) 
  
    })
//Connect to db

mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log('connected')
})
//How do we start listening to the server 
app.listen(3000);