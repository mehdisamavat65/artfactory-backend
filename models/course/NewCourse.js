const mongoose = require('mongoose');

const NewCourseSchema = mongoose.Schema({
    title:String,
    courseType:String,
    description:String,
    audience:String,
    output:String,
    prequisite:String,
    deatils:[{
        code:String,
        term:String,
        days:String,
        startDate:String,
        capcity:String,
        countSession:String,
        time:String,
        endDate:String,
        price:String,
        openRegister:Boolean,
        openReserve:Boolean,
        teacher:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"newteachers"
        },

    }],
    
    departemant:String,
    subDepartemant:String,
    show:{
        menu:Boolean,
        active:Boolean,
        header:Boolean,
        home:Boolean,
        installment:Boolean,

    },
    picture:String,
    headerBackImage:String,
    mobilePic:String,
    backMobilePic:String,
    video:String,
    posterVideo:String,
    gallery:[{
        imagename:String,
        imageDescription:String,
        image:String
    }],
    students:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"newstudents"
    }]
});

module.exports = mongoose.model('NewCourse',NewCourseSchema);