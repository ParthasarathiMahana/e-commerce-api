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
}

export default User_model;