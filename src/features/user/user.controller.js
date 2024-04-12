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

    async signIn(req, res){
        try {
            const {email, password} = req.body
            const signedInUser = await this.userRepo.signIn({email, password})
            if(!signedInUser){
                return res.status(400).send("Invalid user credentials");
            }
            const token = jwt.sign({id: signedInUser.id, email: signedInUser.email}, "fsgfgssiduhr348rhfhsjd98werf", {expiresIn:'1h'})
            res.send(token)
            // res.send(signedInUser)
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Error while signin up", 500)
        }
    }
}

export default userController