const shortid=require("shortid");
const URL=require('../models/url.js');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.render("Home", { id: null, error: "URL is required" }); // ✅ Always pass error
    }

    let shortId = shortid.generate();
    
    try {
        const newUrl = await URL.create({
            shortId: shortId,
            redirectUrl: body.url,
            visitHistory: [],
        });
        return res.render("Home", { id: newUrl.shortId,urls: [],originalUrl: body.url, error:null }); // ✅ Pass error as null
    } catch (error) {
        console.error("Error creating short URL:", error);
        return res.render("Home", { id: null, error: "Failed to generate short URL. Try again." });
    }
}


async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory,
    });
   
}
async function handleRedirectNewShortURL(req,res){
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId
       
    },{$push:{
          visitHistory:{timestamps:Date.now()}
    }},
    {new:true}

);
    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    return res.redirect(entry.redirectUrl);
}

module.exports={handleGenerateNewShortURL,handleRedirectNewShortURL,handleGetAnalytics}
