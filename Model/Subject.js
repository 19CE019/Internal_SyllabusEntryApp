const mongoose=require('mongoose');
const SubjectSchema=new mongoose.Schema({
    subID:{
        type:String,
        require:true,
        unique:true
    },
    subCode:{
        type:String,
        require:true,
        unique:true
    },
    subName:{
        type:String,
        require:true,
        unique:true
    },
    semID:{
        type:String,
        require:true,
        unique:false
    }
});
const tblSubjectInfo=mongoose.model('tblSubjectInfo',SubjectSchema);
module.exports=tblSubjectInfo;
