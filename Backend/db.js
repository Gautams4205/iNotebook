const mongoose = require("mongoose");
const mongodbURI = "mongodb://127.0.0.1:27017/iNotebook";
const conecttoMongodb = () => {
  mongoose.connect(mongodbURI).then(()=>{console.log("Connected to database")}).catch((error) => 
    console.error('An error occurred:', error))};

module.exports=conecttoMongodb;
