import express from "express";
import { Router } from "express";
import userController from "./user.controller.js";

export const userRouter = Router();
const userControllerObj = new userController();

userRouter.post('/signup', (req, res)=>{
    userControllerObj.signUp(req, res)
})
userRouter.post('/signin', (req, res)=>{
    userControllerObj.signIn(req, res)
})