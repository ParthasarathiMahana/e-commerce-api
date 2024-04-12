import { ApplicationError } from "../../errorhandler/applicationError.js";
import User_model from "./user.model.js";
import jwt  from "jsonwebtoken";
import UserRepository from "./user.repository.js";

class userController{
    constructor(){
        this.userRepo = new UserRepository();
    }
    async signUp(req, res){
        try {
            const {name, email, password, type} = req.body;
            const newUser = new User_model(name, email, password, type)
            var responseOfSignup = await this.userRepo.signUp(newUser)
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Internal server error", 500)
        }        
        res.send(responseOfSignup)
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