import HTTP_statusCode from "../../contants/enums";
import response_message from "../../contants/response_message";
import { Request,Response } from "express";
import { injectable,inject } from "inversify";
import TYPES from "../../inversify/types";
import { IBookingDetailsService } from "../../interfaces/managerInterfaces/serviceInterfaces/IBookingDetailsService";
@injectable()
export class BookingDetailsController{
    constructor(
        @inject(TYPES.IBookingDetailsService) private _BookingService:IBookingDetailsService
    ){}
      async getTodaysBookingDetails(req:Request,res:Response):Promise<void>{
            try {

              const {managerId}=req.params;
              const result = await this._BookingService.getTodaysBookingService(managerId);
        
              
              if (!result?.success) {
                 res.status(HTTP_statusCode.InternalServerError).json({
                  message: result?.message || response_message.GETALLOFFERS_FAILED,
                });
              }
        
           
              res.status(HTTP_statusCode.OK).json({
                message: result.data.message,
                data: result.data.data,
              });
            } catch (error) {
              console.error("Error in getAllOffers:", error);
              res.status(HTTP_statusCode.InternalServerError).json({
                message: response_message.FETCHADMINDASHBOARDDATA_ERROR,
                error: error instanceof Error ? error.message : error,
              });
            }
          }
              async getTotalBookingDetails(req:Request,res:Response):Promise<void>{
            try {

              const {managerId}=req.params;
              const result = await this._BookingService.getTotalBookingService(managerId);
        
              if (!result?.success) {
                 res.status(HTTP_statusCode.InternalServerError).json({
                  message: result?.message || response_message.GETALLOFFERS_FAILED,
                });
              }
              res.status(HTTP_statusCode.OK).json({
                message: result.data.message,
                data: result.data.data,
              });
            } catch (error) {
              console.error("Error in getAllOffers:", error);
              res.status(HTTP_statusCode.InternalServerError).json({
                message: response_message.FETCHADMINDASHBOARDDATA_ERROR,
                error: error instanceof Error ? error.message : error,
              });
            }
          }
      async getBookedUserDetails(req: Request, res: Response):Promise<void>{
  try {
    const managerName = req.query.name;

    console.log("ManagerName", managerName);

    if (!managerName) {
     res.status(400).json({
        success: false,
        message: "Manager Name is not found",
        data: null,
      });
    }

    const savedEvent = await this._BookingService.getBookedUserService(managerName as string);

     res.status(200).json({
      success: savedEvent.success,
      message: savedEvent.message,
      data: savedEvent.success ? savedEvent.data : null,
    });

  } catch (error) {
    console.error("Error in getEventHistoryDetails:", error);
 res.status(500).json({
      success: false,
      message: "Failed to fetch manager dashboard data",
      data: null,
    });
  }
}


          
           async createChatSchema(req: Request, res: Response) {
            try {
              const formData = req.body;
              console.log("Received billing details:", formData);
          
              const result = await this._BookingService.getBookedUserService(formData);
              console.log("Nice",result.data)
          
              res.status(HTTP_statusCode.OK).json(result); // Send response to client
            } catch (error) {
              console.error("Error in saveBillingDetails:", error);
              res.status(HTTP_statusCode.InternalServerError).json({ success: false, message: response_message.FETCHADMINDASHBOARDDATA_ERROR });
            }
          }

    

}