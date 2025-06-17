import { injectable,inject } from "inversify";
import TYPES from "../../inversify/types";
import { Response,Request } from "express";
import { IUserProfileService } from "../../interfaces/userInterfaces/serviceInterfaces/IUserProfileService";
import HTTP_statusCode from "../../contants/enums";
import response_message from "../../contants/response_message";

@injectable()
export class UserProfileController{
    constructor(
        @inject(TYPES.IUserProfileService) private _userProfileService:IUserProfileService
    ){}
    async getExistingReviews(req: Request, res: Response): Promise<void> {
  try {
    const eventId=req.params.eventId;
    const userId=req.params.userId
    const savedEvent = await this._userProfileService.getExistingReviewService(userId,eventId);
    if (savedEvent.success) {
      res.status(HTTP_statusCode.OK).json({ success: savedEvent.success, message: savedEvent.message, data: savedEvent.data });
    return;
    }
     res.status(HTTP_statusCode.NotFound).json({ success: savedEvent.success, message: savedEvent.message, data: savedEvent.data });
  } catch (error) {
    console.error("Error in Existing Review and Rating Details:", error);
    res.status(HTTP_statusCode.InternalServerError).json({ success: false, message: response_message.FETCHADMINDASHBOARDDATA_ERROR });
  }
}

async postReviewAndRating(req:Request,res:Response){
  try{
    console.log('have',req.body);
  
    const formData=req.body;
    console.log('FormData',formData);
    const result=await  this._userProfileService.posthandleReviewRatingService(formData)
    res.status(HTTP_statusCode.OK).json({result:result.result.savedEvent});
  } catch (error) {
    console.error("Error in post review and Rating", error);
    res.status(HTTP_statusCode.InternalServerError).json({ message: response_message.FETCHADMINDASHBOARDDATA_ERROR, error });
}


}

async getEventHistoryDetails(req: Request, res: Response): Promise<void> {
  try {

    const userId=req.params.userId;
    const savedEvent = await this._userProfileService.getEventHistoryService(userId);
    if (savedEvent.success) {
      res.status(HTTP_statusCode.OK).json({ success: savedEvent.success, message: savedEvent.message, data: savedEvent.data });
    return;
    }
     res.status(HTTP_statusCode.NotFound).json({ success: savedEvent.success, message: savedEvent.message, data: savedEvent.data });
  } catch (error) {
    console.error("Error in getEventHistoryDetails:", error);
    res.status(HTTP_statusCode.InternalServerError).json({ success: false, message: response_message.FETCHADMINDASHBOARDDATA_ERROR });
  }
}

async getBookedManagerDetails(req:Request,res:Response):Promise<void>{
  try {
    console.log("Hello");
    
    const userId=req.query.name;
    console.log("Hello Moto",userId);
    const savedEvent = await this._userProfileService.getBookedManagerService(userId as string);
    if (savedEvent.success) {
      res.status(HTTP_statusCode.OK).json({ success: savedEvent.success, message: savedEvent.message, data: savedEvent.data });
    return;
    }
     res.status(HTTP_statusCode.OK).json({ success: savedEvent.success, message: savedEvent.message, data: savedEvent.data });
  } catch (error) {
    console.error("Error in getEventHistoryDetails:", error);
    res.status(HTTP_statusCode.InternalServerError).json({ success: false, message: response_message.FETCHADMINDASHBOARDDATA_ERROR });
  }
}

async getEventBookedDetails(req: Request, res: Response): Promise<void> {
  try {
    const userId=req.params.userId;
    const savedEvent = await this._userProfileService.getEventBookedService(userId);
    if (savedEvent.success) {
      res.status(HTTP_statusCode.OK).json({ success: savedEvent.success, message: savedEvent.message, data: savedEvent.data });
    return;
    }
     res.status(HTTP_statusCode.TaskFailed).json({ success: savedEvent.success, message: savedEvent.message, data: savedEvent.data });
  } catch (error) {
    console.error("Error in getEventHistoryD  etails:", error);
    res.status(HTTP_statusCode.InternalServerError).json({ success: false, message: response_message.FETCHADMINDASHBOARDDATA_ERROR });
  }
}

async createChatSchema(req: Request, res: Response) {
  try {
    const formData = req.body;
    console.log("Received billing details:", formData);

    const result = await this._userProfileService.createChatSchemaService(formData);
    console.log("Nice",result.data)

    res.status(HTTP_statusCode.OK).json(result); // Send response to client
  } catch (error) {
    console.error("Error in saveBillingDetails:", error);
    res.status(HTTP_statusCode.InternalServerError).json({ success: false, message: response_message.FETCHADMINDASHBOARDDATA_ERROR});
  }
}

async uploadUserProfilePicture(req: Request, res: Response) {
  console.log("Received request for uploading profile");
  console.log(req.params, "Yeah", req.file);

  const userId = req.params.userId;
  const profilePicture = req.file; 

  if (!profilePicture) {
    console.log('Mahn');
    res.status(HTTP_statusCode.BadRequest).json({ error: response_message.UPLOADUSERPROFILEPICTURE_FAILED });
    return;
  }

  try {
    const result = await this._userProfileService.uploadUserProfilePhoto(userId, profilePicture);
    res.status(HTTP_statusCode.OK).json(result);
  } catch (error) {
    res.status(HTTP_statusCode.InternalServerError).json({ error: response_message.UPLOADUSERPROFILEPICTURE_ERROR});
  }
}
}