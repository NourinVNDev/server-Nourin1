import { IEventBookingRepo } from "../../interfaces/userInterfaces/repositoryInterfaces/IEventBookingRepo";
import SOCIALEVENTDB from "../../models/managerModels/socialEventSchema";
import mongoose,{Types} from "mongoose";
import BOOKEDUSERDB from "../../models/userModels/bookingSchema";
export class EventBookingRepository implements IEventBookingRepo{



     async postHandleLikeRepo(index:string, userId:string,postId: string) {
    try {
      // Find the social event by ID
      console.log('Post Id:',postId);
      const singleEvent = await SOCIALEVENTDB.findOne({_id:postId});
      if (!singleEvent) {
        throw new Error(`Social Event not found for ID: ${postId}`);
      }

      // Check if the user has already liked the post
      const existingLikeIndex = singleEvent.likes.findIndex(
        (like) => like.user && like.user.toString() === userId
      );

      if (existingLikeIndex !== -1) {
        // User has already liked the post; remove the like
        singleEvent.likes.splice(existingLikeIndex, 1);
      } else {
        // Add the like
        singleEvent.likes.push({ user: new Types.ObjectId(userId) });
      }

      // Save the updated event
      const updatedEvent = await singleEvent.save();
      console.log("Updated Event Likes:", updatedEvent.likes);

      return {result:updatedEvent.likes}; // Return updated event for further use if needed
    } catch (error) {
      console.error("Error in postHandleLike:", error);
      throw new Error("Failed to handle like functionality.");
    }
  } 
  async getPostDetailsRepo(postId:string){
      try {
    console.log('Post Id:', postId);
    const singleEvent = await SOCIALEVENTDB.findOne({ _id: postId })
      .populate('managerOffer')
      .populate('adminOffer');

    if (!singleEvent) {
      throw new Error(`Social Event not found for ID: ${postId}`);
    }

    return {singleEvent};
  } catch (error) {
    console.error("Error in getPostDetailsRepo:", error);
    throw new Error("Failed to fetch post details.");
  }
  }
  async getBookedEventRepo(bookingId:string){
    try {
      console.log('Booking Id:',bookingId);
      const singleEvent = await BOOKEDUSERDB.findOne({_id:bookingId,paymentStatus:'Pending'}).populate('eventId');
      if (!singleEvent) {
        throw new Error(`Social Event not found for ID: ${bookingId}`);
      }
      return {singleEvent};
    } catch (error) {
      console.error("Error in postHandleLike:", error);
      throw new Error("Failed to handle like functionality.");
    }
}
}