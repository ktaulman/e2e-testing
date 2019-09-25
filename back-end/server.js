const express=require('express')
const app=express();
const bodyParser=require('body-parser')
const cors = require('cors');

const db=[
    {
        name:"Kevin",
        email:"kevin@google.com",
        password:"123abc",
        aboutMe:"My name is Kevin and I love basketball as well as fishing"
      }
]

//Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/postman',(req,res)=>{
    res.json('app-server running');
})

app.post('/api/login',(req,res)=>{
   let isFound=db.filter(el=>el.email==req.body.email);
   
   if(isFound.length!==0){
       res.status(200).json(isFound[0])
   }else{
       res.status(400).json('user and/or email is not valid')
   }
})

app.put('/api/update',(req,res)=>{
    let isFound=db[0];
    if(isFound){
        const {name,email,password,aboutMe}=req.body;
        const user=isFound;
        name.length!==0?user.name=name:null;
        email.length!==0?user.email=email:null;
        password.length!==0?user.password=password:null;
        aboutMe.length!==0?user.aboutMe=aboutMe:null;
        res.status(200).json(isFound)
    }else{
        res.status(400).json('cannot update')
    }
})


const PORT=process.env.PORT||4000;
app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})