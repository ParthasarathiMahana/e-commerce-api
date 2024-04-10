import User_model from "./user.model.js";
import jwt  from "jsonwebtoken";

class userController{
    signUp(req, res){
        User_model.signUp(req.body)
        res.send(User_model.getAllUsers())
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