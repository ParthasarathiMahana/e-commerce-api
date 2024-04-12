import { getDb } from "../../config/mongodb.js";
import { ApplicationError } from "../../errorhandler/applicationError.js";

class User_model{
    constructor(name, email, password, type, id){
        this._id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type
    }

    static getAllUsers(){
        return users;
    }

    static async signUp({name, email, password, type}){
        try {
             // get database
            const db = getDb()
            // get collection
            const collection = db.collection("users")
            var newUser = new User_model(name, email, password, type);
            await collection.insertOne(newUser);
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong.", 500)
            // console.log(error);
        }
        return newUser;
    }

    static signIn({email, password}){
        const myUser =  users.find((currentUser)=> email === currentUser.email && password === currentUser.password);
        return myUser;
    }
}

export default User_model;