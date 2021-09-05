const mongoose = require("mongoose")
const userModel = require("../model/user")
const {check,validationResult} = require('express-validator')
const express = require("express")
const { error } = require("console")
const app = express()

app.get("/",(req,res) =>{
    res.render("register",{message:false});
})
app.post("/",[
    check("firstName").notEmpty().withMessage("Ism bo'sh bo'lmasligi kerak"),
    check("lastName").notEmpty().withMessage("familiya bo'sh bo'lmasligi kerak"),
    check("surName").notEmpty().withMessage("Otasining ismi bo'sh bo'lmasligi kerak").isAlpha(),
    check("seriya").notEmpty().withMessage("seriya bo'sh bo'lmasligi kerak").isAlpha(),
    check("number").notEmpty().withMessage("Passport raqam  bo'lishi kerak").isNumeric().withMessage("Raqam bulishi kerak"),
    check("registerDate").notEmpty().withMessage("Vaqt bulishi kerak"),
    check("registerOut").notEmpty().withMessage("Vaqt bulishi kerak"),
    check("typeOfRoom").notEmpty().withMessage("xona bulishi kerak")
], async (req,res)=>{
    const {firstName,lastName,surName,nationality,seriya,number,registerDate,registerOut,typeOfRoom,typeOfRooms,numberOfRoom} = req.body
    
    let categoryOfUser
    if(nationality ==="uzbek"){
        categoryOfUser = "uzbekiston"
    }else if(nationality ==="Rus" || nationality ==="tojik" || nationality ==="qirg'iz" || nationality ==="qozoq" ||nationality ==="turkman" ||nationality ==="belorus" ||nationality ==="arman" ||nationality ==="gruz" ||nationality ==="azarbayjon" ||nationality ==="ukrain"){
        categoryOfUser = "SNG mamlakati"
    }else{
        categoryOfUser = "Boshqa mamlakatlar"
    }
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.render("register",{message:errors.errors[0].msg})
    }else{
 try{

    const user = new userModel({
        firstName,
        lastName,
        surName,
        nationality
        ,seriya,
        number,
        registerDate
        ,registerOut,
        typeOfRoom,
        typeOfRooms,
        numberOfRoom,
        categoryOfUser
    })
     await user.save();
     res.redirect("home")
 }catch{
     console.log(error)
 }}
})
app.get("/home",async (req,res) =>{
    let query = await userModel.find();
    if (req.query.name != null && req.query.name != "") {
        query = query.filter(obj => obj.firstName.search(new RegExp(req.query.name, "i")) != -1);
    }
    if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
        query = query.filter(obj => new Date(obj.registerDate).getTime() >= new Date(req.query.publishedBefore).getTime())
    }
    if (req.query.categoryOfUser != null && req.query.categoryOfUser != "") {
        query = query.filter(obj => obj.categoryOfUser.search(new RegExp(req.query.categoryOfUser, "i")) != -1);
    }
    if (req.query.typeOfRoom != null && req.query.typeOfRoom != "") {
        query = query.filter(obj => obj.typeOfRoom.search(new RegExp(req.query.typeOfRoom, "i")) != -1);
    }
     try{
         res.render("home",{query:query});
     }catch{
         res.redirect("/home")
     }
    
})

module.exports = app