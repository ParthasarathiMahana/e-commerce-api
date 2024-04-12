import { getDb } from "../../config/mongodb.js";
import { ApplicationError } from "../../errorhandler/applicationError.js";

class UserRepository{

    async signUp(newUser){
        try {
             // get database
            const db = getDb()
            // get collection
            const collection = db.collection("users")
            // insert a document
            await collection.insertOne(newUser);
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong during signup.", 500)
            // console.log(error);
        }
        return newUser;
    }

    async signIn({email, password}){
        try {
            // get database
            const db = getDb()
            // get collection
            const collection = db.collection("users")
            //  find the user
            var myUser =  await collection.findOne({email, password})
        } catch (error) {
            throw new ApplicationError("Something went wrong during signin", 500)
        }
        return myUser;
    }
}

export default UserRepository