exports.Packages=async (req,res)=>{
    try{
        res.status(200).json({
            message:"You can now get the requested packages for your request"
        })
    }
    catch(err){
        res.status(404).json({
            status:"fail",
            message:err
        })
    }
}

exports.bookPackage=(req,res)=>{
    try{
        res.status(201).json({
            message:"New booking added for the POST request"
        })
    }
    catch(err){
        res.status(404).json({
            status:"fail",
            message:err
        })
    }
}
exports.login=async (req,res)=>{
        console.log(req.body);
        res.send('<h1>Hi, '+req.body.username+'</h1>')
};

exports.All=(req,res)=>{
    try{
        console.log("Response...")
        res.status(200).json({
            status:"fail",
            message:"invalid path"
        })
    }
    catch(err){
        res.status(404).json({
            status:"fail",
            message:"invalid path"
        })
    }
}