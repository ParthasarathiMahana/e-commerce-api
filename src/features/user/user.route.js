import express from "express";
import { Router } from "express";
import userController from "./user.controller.js";

export const userRouter = Router();
const userControllerObj = new userController();

userRouter.post('/signup', userControllerObj.signUp)
userRouter.post('/signin', userControllerObj.signIn)