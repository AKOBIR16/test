const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./router/user")
const bodyParser = require("body-parser")
const app = express();
const expresslayouts = require("express-ejs-layouts");
dotenv.config();
app.set("view engine", "ejs")
app.set("views", __dirname + "/views");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit:"50mb",extended:false}))
app.use("/" ,userRoute)
mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err){
        console.log(err)
    }else{
        
        console.log("Succesful connected to Mongodb")
    }
})

app.listen(process.env.PORT,()=>{
    console.log(`${process.env.PORT} port listenig..`);
})