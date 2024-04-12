import { MongoClient } from "mongodb";

// const url = process.env.MONGO_URL;

let client;
export const mongoConnection = ()=>{
    MongoClient.connect(process.env.MONGO_URL).then(clientInstance=>{
        client = clientInstance;
        console.log("Connection to mongoDB is established.");
    }).catch(err=>{
        console.log(err);
    })
}

export const getDb = () =>{
    return client.db()
}