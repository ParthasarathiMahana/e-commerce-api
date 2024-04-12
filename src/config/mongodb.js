import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecomApidb";
let client;
export const mongoConnection = ()=>{
    MongoClient.connect(url).then(clientInstance=>{
        client = clientInstance;
        console.log("Connection to mongoDB is established.");
    }).catch(err=>{
        console.log(err);
    })
}

export const getDb = () =>{
    return client.db()
}