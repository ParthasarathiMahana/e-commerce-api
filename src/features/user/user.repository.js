import { getDb } from "../../config/mongodb.js";
import { ApplicationError } from "../../errorhandler/applicationError.js";

class UserRepository{

    async signUp(newUser){
        try {
             // get database
            const db = getDb()
            // get collection
            const collection = db.collection("users")
            await collection.insertOne(newUser);
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong.", 500)
            // console.log(error);
        }
        return newUser;
    }
}

export default UserRepository