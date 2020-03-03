const mongoose = require('mongoose');


const NewUserAdminSchema = mongoose.Schema({
    name:String,
    mobile:String,
    password:String,
    active:Boolean,
    access:{
        admin:Boolean,
        teacher:Boolean,
        departemant:Boolean,
        course:Boolean,
        student:Boolean,
        gallery:Boolean,
        offer:Boolean,
        website:Boolean,
        online:Boolean,
        live:Boolean
    }
});

module.exports = mongoose.model('NewUserAdmin',NewUserAdminSchema);