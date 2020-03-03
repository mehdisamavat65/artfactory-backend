const mongoose = require('mongoose');


const NewDepartemantSchema = mongoose.Schema({
    name:String,
    active:Boolean,
    color:String,
    subDepartemant:[{
        name:String,
        active:Boolean
    }]
})

module.exports = mongoose.model('NewDepartemant',NewDepartemantSchema);