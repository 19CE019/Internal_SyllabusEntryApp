const mongoose=require('mongoose');
require('dotenv').config();
MongoUri=process.env.Mongo;
const connection = mongoose.connect(MongoUri,{useNewUrlParser:true,useUnifiedTopology:true}
    ).catch(err=>console.error("Could not connect to Mongodb.",err));
module.exports={mongoose,connection};