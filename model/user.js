const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    surName:String,
    nationality:String,
    seriya:String,
    number:Number,
    registerDate:Date,
    registerOut:Date,
    typeOfRoom:String,
    typeOfRooms:String,
    numberOfRoom:Number,
    categoryOfUser:String
})
const userModel = mongoose.model("roomUsers",userSchema);
module.exports = userModel