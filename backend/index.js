const express =require("express");
const mongoose=require("mongoose");
const taskmodel=require('./model/model');
const User=require('./model/user');
const fs=require("fs")
const app=express();
const cors = require("cors");
const { error } = require("console");
app.use(express.json());
app.use(cors());

const PORT=4000;

mongoose.connect('mongodb://localhost:27017/todo-list',
{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log("Database Connected");
  }).catch((err)=>{
      console.log(err);
  })

app.get('/new',async(req,res)=>{
  const task1= await taskmodel.find();
  try{
     res.send(task1);
  }
  catch{
    res.status(500).send(error);

  }
})


// create task
  app.post('/new',async(req,res)=>{

    const taskadd= await taskmodel.create(req.body);

    try{
      res.send(taskadd);
    }
    catch{
      res.status(500).send(error);
    }
  })


// delete task
app.delete('/new/:id',async(req,res)=>{
 
  let taskId= await taskmodel.findById(req.params.id);
  try{
    if(!taskId)
    {
        return res.status(404).json({
             success:false,
             message:"not found",
        });
    }
    
    await taskId.deleteOne({_id:req.params.id});

    res.status(200).json({
        success:true,
        message:"removed",
   });
}catch (error) {
    res.json({"message":"error"}).status(404);
}

})


// update task
app.put('/new/:id',async(req,res)=>{
  let taksss=await taskmodel.findById(req.params.id);
  try{
  if(!taksss)
  {
      res.status(500).json({
           success:false,
           message:"not found",
      })
  }
  
  taksss=await taskmodel.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      useFindAndModify:true,
      runValidators:true,
  })
}catch (error) {
  console.log(error);
}
  res.status(200).json({
      success:true,
      message:"update",
      taksss,
  })
})

// login user
app.post("/login",async(req,res)=>{

  const user= await User.findOne({email:req.body.email});
        if(user){
        if(req.body.password === user.password)
        {
          res.json({message:"login successfully",user:user}).status(200);
        }
        else{
          res.json({message:"user name or password incorrect"}).status(404);
        }
      }
      else{
          res.json({message:"User not registerd"}).status(404);
          }
      })
     

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});
