const express =require('express');
const {connection,mongoose}=require('./Database/DBconfig.js');//exported from seperate file.

const tblSemester=require('./Model/Semester.js');
const tblSubject=require('./Model/Subject.js');
const tblSyllabus=require('./Model/Syllabus.js');

require('dotenv').config();

const app=express();
const PORT=process.env.PORT || 3000;

// //Home Route
// app.get("/",(req,res)=>{
//     res.send("<h1>Hello Welcome to Subject Entry API!</h1>")
// })
// // Route to create db.
// app.get("/db-create", (req,res)=>{
//     connection
//     .then(()=>console.log("Mongodb Connected and Created database"))
//     .catch(err=>console.error("Could not connect to Mongodb.",err));    
// });
// //Route to create Tables.
// app.get("/db-create-table", (req,res)=>{
//     try {
//         var result=tblSemester
//         console.log("tblSemester Table Created",result)        
//     } catch (error) {
//         console.error("Could not create table",err)
//     }
    
//     try {
//         var result=tblSubject
//         console.log("tblSubject Table Created",result)        
//     } catch (error) {
//         console.error("Could not create table",err)
//     }

//     try {
//         var result=tblSyllabus
//         console.log("tblSyllabus Table Created",result)        
//     } catch (error) {
//         console.error("Could not create table",err)
//     }
// });
//Route to insert Data.
app.post("/db",(req,res)=>{
    //Sem - 1 and 2 data entries
    tblSemester.insertMany([{
        semID:'2021-1',
        sem:'1'
    },{
        semID:'2021-2',
        sem:'2'
    }],(err,data)=>{
        if(err!=null){
            return console.error("Error Occured",err);
        }
        else
        console.log("Semester Data inserted successfully\n",JSON.stringify(data));
    });

    tblSubject.insertMany([{
        subID:'377',
        subCode:'CE377',
        subName:'AWT',
        semID:'2021-1'
    },{
        subID:'378',
        subCode:'CE378',
        subName:'OS',
        semID:'2021-1'
    },{
        subID:'379',
        subCode:'CE379',
        subName:'DAA',
        semID:'2021-1'
    },{
        subID:'387',
        subCode:'CE387',
        subName:'AI',
        semID:'2021-2'
    },{
        subID:'388',
        subCode:'CE388',
        subName:'TOC',
        semID:'2021-2'
    },{
        subID:'389',
        subCode:'CE389',
        subName:'DIP',
        semID:'2021-2'
    }],(err,data)=>{
        if(err!=null){
            return console.error("Error Occured",err);
        }
        else
        console.log("Subjects Data inserted successfully\n",JSON.stringify(data));
    });

    tblSyllabus.insertMany([{
        topicID:'101',
        topicName:'Nodejs',
        subID:'377',
        semID:'2021-1'
    },{
        topicID:'201',
        topicName:'Deadlocks',
        subID:'378',
        semID:'2021-1'
    },{
        topicID:'301',
        topicName:'DP',
        subID:'379',
        semID:'2021-1'
    },{
        topicID:'1001',
        topicName:'Segmentation',
        subID:'387',
        semID:'2021-2'
    },{
        topicID:'1002',
        topicName:'Introduction',
        subID:'388',
        semID:'2021-2'
    },{
        topicID:'1003',
        topicName:'Computing Algebra',
        subID:'389',
        semID:'2021-2'
    }],(err,data)=>{
        if(err!=null){
            return console.error("Error Occured",err);
        }
        else
        console.log("Syllabus Data inserted successfully\n",JSON.stringify(data));
    });
});

//Route to display data
app.get("/db", (req,res)=>{
    tblSyllabus.aggregate(
        [
            {
                '$lookup': {
                  'from': 'tblsubjectinfos', 
                  'localField': 'subID', 
                  'foreignField': 'subID', 
                  'as': 'sub'
                }
              }, 
              {
                  $unwind: "$sub",
              },
            
            {
              '$lookup': {
                'from': 'tblsemesters', 
                'localField': 'semID', 
                'foreignField': 'semID', 
                'as': 'sem'
              }
            },
            {
                $unwind: "$sem"
            }

          ]
    )
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
      
});

app.listen(PORT,()=>{
    console.log(`Server is running on port number ${PORT}`)
})
