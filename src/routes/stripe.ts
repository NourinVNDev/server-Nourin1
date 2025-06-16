import express, { NextFunction, Request, Response } from "express";
// import userlogin from "../controllers/userControllers/loginDetails";
// import { loginServices } from "../service/userService/loginService";
// import { loginRepo } from "../repository/userRepository/loginRepo";
import container from "../inversify/container";
import bodyParser from 'body-parser';
import { StripePaymentController } from "../controllers/userControllers/stripePaymentController";

const router = express.Router();
const stripePaymentController=container.get<StripePaymentController>(StripePaymentController)
// const userRepositoryInstance=new loginRepo();
// const userServiceInstance=new loginServices(userRepositoryInstance);
// const userController=new userlogin(userServiceInstance);


router.post('/',express.raw({type:'application/json'}), (req:Request,res:Response,next:NextFunction)=>stripePaymentController.handleWebhook(req,res));

export default router;