const mongoose=require('mongoose');
const SemesterSchema=new mongoose.Schema({
    semID:{
        type:String,
        require:true,
        unique:true
    },
    sem:{
        type:Number,
        require:true,
        maxlength:2
    }
});
const tblSemester=mongoose.model('tblSemester',SemesterSchema);
module.exports=tblSemester;
