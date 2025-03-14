const express=require('express');
const path=require('path');
require('dotenv').config();
const urlRoute=require("./routes/url.js");
const {connectToMongoDB}=require("./connect.js");
const staticRoute=require('./routes/staticRouter.js');
const app=express();
const cors = require('cors');
app.use(cors());

const PORT=8003;
app.set("view engine","ejs");
app.set("views",path.resolve('./views'));
app.set();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// app.get("/test",async(req,res)=>{
   
//     return res.render('home');
// })
connectToMongoDB(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mydb')
.then(()=>console.log("mongodb is connected"));
app.use("/url",urlRoute);
app.use("/",staticRoute);

app.listen(PORT,'0.0.0.0',()=>console.log(`server started at ${PORT}`));