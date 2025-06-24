import { injectable,inject } from "inversify";
import { Request,Response } from "express";
import response_message from "../../contants/response_message";
import HTTP_statusCode from "../../contants/enums";
import TYPES from "../../inversify/types";
import { IVerifierDetailsService } from "../../interfaces/managerInterfaces/serviceInterfaces/IVerifierDetailsService";
@injectable()
export class VerifierDetailsController{
    constructor(
        @inject(TYPES.IVerifierDetailsService) private _verifierService:IVerifierDetailsService)
        {}


            async getAllVerifiers(req:Request,res:Response){
            try {
              const managerName=req.params.managerName;
              console.log("Maaa",managerName);
              
          
              const result = await this._verifierService.getAllVerifierService(managerName);
              console.log("Nice",result.data)
          
              res.status(HTTP_statusCode.OK).json(result); // Send response to client
            } catch (error) {
              console.error("Error in saveBillingDetails:", error);
              res.status(HTTP_statusCode.InternalServerError).json({ success: false, message: response_message.FETCHADMINDASHBOARDDATA_ERROR });
            }

          }
            async updateVerifierStatus(req:Request,res:Response){
            try {
              const {verifierId}=req.params;
              console.log("Received VerifierID:", verifierId);
          
              const result = await this._verifierService.updateVerifierStatusService(verifierId);
              console.log("Nice",result.data)
          
              res.status(HTTP_statusCode.OK).json(result); // Send response to client
            } catch (error) {
              console.error("Error in saveBillingDetails:", error);
              res.status(HTTP_statusCode.InternalServerError).json({ success: false, message: response_message.FETCHADMINDASHBOARDDATA_ERROR });
            }
          }
            async postNewVerifier(req:Request,res:Response){
            try {
              console.log("Req body:",req.body);
              
              const formData= req.body;
              console.log("your companyNames:",formData);
      
              const result = await this._verifierService.updateVerifierStatusService(formData);
              res.status(200).json(result);
          } catch (error) {
              console.error("Error while checking manager status:", error);
              res.status(500).json({
                  success: false,
                  error: response_message.ADMINLOGIN_ERROR
              });
          }

          }

             async getSelectedVerifierData(req:Request,res:Response){
            try {
              const verifierId = req.params.verifierId;
             
      
              const result = await this._verifierService.fetchSelectedVerifierService(verifierId);
              res.status(200).json(result);
          } catch (error) {
              console.error("Error while checking manager status:", error);
              res.status(500).json({
                  success: false,
                  error:response_message.ADMINLOGIN_ERROR
              });
          }
          }
              async updateVerifierData(req:Request,res:Response){
            try {
              console.log("Req body:",req.body);
              
              const formData= req.body;
              console.log("your FormData from backend:",formData);
      
              const result = await this._verifierService.updateVerifierService(formData);
              res.status(200).json(result);
          } catch (error) {
              console.error("Error while updating verifier:", error);
              res.status(500).json({
                  success: false,
                  error: response_message.ADMINLOGIN_ERROR
              });
          }
          }

}