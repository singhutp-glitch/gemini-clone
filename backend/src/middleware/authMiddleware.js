import jwt from 'jsonwebtoken'

export function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            error:'No token provided'
        })
    }

    try{
        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        console.error(error)
        res.status(404).json({
            error:'Invalid token'
        })
    }
}