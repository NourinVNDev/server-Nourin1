import { inject, injectable } from "inversify";
import TYPES from "../../inversify/types";
import { IEventBookingRepo } from "../../interfaces/userInterfaces/repositoryInterfaces/IEventBookingRepo";
import { IEventBookingService } from "../../interfaces/userInterfaces/serviceInterfaces/IEventBookingService";

@injectable()
export class EventBookingService implements IEventBookingService{
    constructor(
        @inject(TYPES.IEventBookingRepo) private _eventBookingRepo:IEventBookingRepo
    ){}
    
   async posthandleLikeService(index: string, userId: string, postId: string) {
        try {
            console.log("Processing event data in another service...", index, userId, postId);

            // Perform additional validations if needed
            if (!userId || !postId) {
                throw new Error("Index and userId are required for liking  the post.");
            }

            // Call repository to save the data
            const savedEvent = await this._eventBookingRepo.postHandleLikeRepo(index, userId, postId);

            return savedEvent;
        } catch (error) {
            console.error("Error in handleEventCreation:", error);
            throw new Error("Failed to create event in another service layer.");
        }

    }

    async handlePostDetailsService(postId:string){
  try {
        if (!postId) {
                throw new Error("There is no postId.");
            }
    
    const result = await this._eventBookingRepo.getPostDetailsRepo(postId);


return {result};
  } catch (error) {
 
    console.error("Error in getAllOfferServiceDetails:", error);
    throw new Error("Failed to create event in another service layer."); 
  }
}

async getBookedEventService(bookingId:string){
  try {

    const result = await this._eventBookingRepo.getBookedEventRepo(bookingId);
    console.log("from service", result);

return {result};
  } catch (error) {

    console.error("Error in getAllOfferServiceDetails:", error);
    throw new Error("Failed to create event in another service layer."); 
  }
  
}

}