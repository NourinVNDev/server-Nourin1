import express, { NextFunction, Request, Response } from "express";

import container from "../inversify/container";
import bodyParser from 'body-parser';
import { StripePaymentController } from "../controllers/userControllers/stripePaymentController";

const router = express.Router();
const stripePaymentController=container.get<StripePaymentController>(StripePaymentController)



router.post('/',express.raw({type:'application/json'}), (req:Request,res:Response,next:NextFunction)=>stripePaymentController.handleWebhook(req,res));

export default router;