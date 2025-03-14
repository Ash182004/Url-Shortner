const express=require("express");
const URL=require('../models/url.js');
const router=express.Router();
router.get('/',async(req,res)=>{
    const allurls=await URL.find({});
    return res.render('Home', { id: null,originalUrl: "", urls:allurls, error: null });
})
module.exports=router;