const mongoose = require('mongoose');
const url =  process.env.DATABASE_URL;

const connectDbs = async () =>{

    try {
      
      const conn = await mongoose.connect(url);

      if(conn){
        return console.log("Connected to Database Successfully");
      }
    } catch (error) {
      return console.log("Connection Failed", error)
    }

};

module.exports = connectDbs;
