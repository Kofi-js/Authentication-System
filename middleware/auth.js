const jwt = require("jsonwebtoken");


const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
            if(err) res.status(403).json("Token is not valid");
            req.user = user;
            next()
        })

    }else{
        return res.status(401).json("You are not authenticated")
    }
};


const isAuth = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if (req.user.id===req.params.id || req.user.isAdmin) {
            next
        }else{
            res.status(403).json("You are not authorized")
        }
    });
}



const isAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if ( req.user.isAdmin) {
            next();
        }else{
            res.status(403).json("You are not authorized")
        }
    });
}

const isManager = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isManager){
            next()
        }else{
            res.status(403).json("You are not authorized")
        }
    });
}

const isStaff = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isStaff){
            next()
        }else{
            res.status(403).json("Staffs only")
        }
    });
}

module.exports = {verifyToken,isAuth,isAdmin,isManager,isStaff};

