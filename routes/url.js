const express=require('express');
const {handleGenerateNewShortURL,handleRedirectNewShortURL,handleGetAnalytics}=require("../controllers/url");
const router=express.Router();
router.post('/', handleGenerateNewShortURL);
router.get('/:shortId',handleRedirectNewShortURL);
router.get('/analytics/:shortId',handleGetAnalytics);


module.exports=router;