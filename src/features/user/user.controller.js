import { ApplicationError } from "../../errorhandler/applicationError.js";
import User_model from "./user.model.js";
import jwt  from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt"

class userController{
    constructor(){
        this.userRepo = new UserRepository();
    }
    async signUp(req, res){
        try {
            const {name, email, password, type} = req.body;
            const hashedPassword = await bcrypt.hash(password, 12)
            const newUser = new User_model(name, email, hashedPassword, type)
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
            const userFound = await this.userRepo.findUser(email);
            if(!userFound){
                return new ApplicationError("invalid email", 401)
            }
            const passwordCompareResult = await bcrypt.compare(password, userFound.password);
            if(passwordCompareResult){
                const token = jwt.sign({id: userFound._id, email: userFound.email}, process.env.JWT_SECRET, {expiresIn:'1h'})
                return res.send(token)
            }
            res.status(400).send("Invalid user credentials");
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Error while signin up", 500)
        }
    }
}

export default userController