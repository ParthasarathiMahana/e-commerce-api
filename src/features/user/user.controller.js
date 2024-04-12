import { ApplicationError } from "../../errorhandler/applicationError.js";
import User_model from "./user.model.js";
import jwt  from "jsonwebtoken";

class userController{
    async signUp(req, res){
        try {
            var reponseOfSignup = await User_model.signUp(req.body)
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Internal server error", 500)
        }        
        res.send(reponseOfSignup)
    }

    signIn(req, res){
        const signedInUser = User_model.signIn(req.body);
        if(!signedInUser){
            return res.status(400).send("Invalid user credentials");
        }
        const token = jwt.sign({id: signedInUser.id, email: signedInUser.email}, "fsgfgssiduhr348rhfhsjd98werf", {expiresIn:'1h'})
        res.send(token)
        // res.send(signedInUser)
    }
}

export default userController