const mongoose=require('mongoose');
const SyllabusSchema=new mongoose.Schema({
    topicID:{
        type:String,
        require:true,
        unique:true
    },
    topicName:{
        type:String,
        require:true,
        unique:true
    },
    subID:{
        type:String,
        require:true,
        unique:false
    },
    semID:{
        type:String,
        require:true,
        unique:false
    }
});
const tblSyllabus=mongoose.model('tblSyllabus',SyllabusSchema);
module.exports=tblSyllabus;
