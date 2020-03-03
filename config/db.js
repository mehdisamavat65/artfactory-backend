const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoUrl');

const connectDB = () =>{
    mongoose.connect(db,{
        useCreateIndex:true,
        useNewUrlParser:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    },() => {
        try {
            console.log("DB IS Connected");
            return true;
        } catch (error) {
            console.log("DB is not connected");
            process.exit(1);
            return false;
        }
    })
}

module.exports = connectDB;