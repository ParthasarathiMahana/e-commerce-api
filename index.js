import express from "express";
import ProductRouter from "./src/features/product/product.route.js"
import {userRouter} from "./src/features/user/user.route.js";
import bodyParser from "body-parser";
import cartRouter from "./src/features/cart/cart.route.js";
// import basicAuth from "./src/middlewares/basicAuth.middleware.js";
import { jwtAuth } from "./src/middlewares/jwtAuth.middleware.js";
import swagger from "swagger-ui-express"
import apiDOc from "./swagger.json" assert {type:'json'}
import cors from "cors"
import loggerMiddleware from "./src/middlewares/logger.middleware.js";

const corsOption = {
    origin:"http://127.0.0.1:5500"
}
const server = express()

// server.use((req, res, next)=>{
//     res.header("Access-Control-Allow-Origin","http://127.0.0.1:5500")
//     // res.header("Access-Control-Allow-Headers","authorization")
//     res.header("Access-Control-Allow-Headers","*")
//     res.header("Access-Control-Allow-Methods","*")



//     // return OK status for preflight request
//     if(req.method == "OPTIONS"){
//         return res.sendStatus(200)
//     }

//     next()
// })
server.use(cors())
server.use('/api-docs', swagger.serve, swagger.setup(apiDOc))
server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())

server.use(loggerMiddleware)

server.get('/',(req, res)=>{
    res.json("Hello there...")
})
server.use('/api/product', jwtAuth, ProductRouter)
server.use('/api/user', userRouter)
server.use('/api/cart', jwtAuth, cartRouter)

// handle any error thrown from the application
server.use(loggerMiddleware, (err, req, res, next)=>{
    console.log(err);
    if(err){
        res.status(503).send("Something went wrong.")
    }
    next()
})

// handle the error if user tries to go to path that does not exist
server.use((req, res)=>{
    res.status(404).send("Bad request, No such path exist.Explore API doc at:- http://localhost:7000/api-docs/")
})

server.listen(7000, (err)=>{
    if(!err){
        console.log("server is up and runnig on port 7000");
    }
})