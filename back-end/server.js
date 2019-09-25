const express=require('express')
const app=express();
const bodyParser=require('body-parser')
const cors = require('cors');
//controllers


//KNEX
// const db = require('knex')({
//     client: 'pg',
//     connection: {
//       connectionString: process.env.DATABASE_URL,
//       ssl: true
//     }
//   });
//Database 
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

const PORT=process.env.PORT||4000;
app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})