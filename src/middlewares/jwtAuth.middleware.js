import jwt from "jsonwebtoken";

export function jwtAuth(req, res, next){
    const token = req.headers['authorization'];
    if(!token){
        return res.send('unauthorized')
    }

    try{
        const payload = jwt.verify(token, "fsgfgssiduhr348rhfhsjd98werf");
        // console.log(payload);
        req.userId = payload.id
        next()
    }
    catch(err){
        res.send(err);
    }
}