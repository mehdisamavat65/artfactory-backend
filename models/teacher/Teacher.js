const mongoose = require('mongoose');


const newTeacherSchema = mongoose.Schema({
    name:String,
    mobile:String,
    password:String,
    picture:String,
    active:Boolean,
    resume:String,
    courses:[{
        courseId: String
    }]
});


module.exports = mongoose.model("NewTeacher",newTeacherSchema);