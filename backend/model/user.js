const mongoose=require('mongoose');

const User= new mongoose.Schema({
    "email":{
        "type":String,
        "required":true
    },
    "password":{
        "type":String,
        "required":true,
    },
    "role":{
        "type":String,
        "required":true
    }
})

const user=mongoose.model("user",User);
module.exports=user;