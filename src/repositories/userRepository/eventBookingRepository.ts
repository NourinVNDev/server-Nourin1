import { IEventBookingRepo } from "../../interfaces/userInterfaces/repositoryInterfaces/IEventBookingRepo";
import SOCIALEVENTDB from "../../models/managerModels/socialEventSchema";
import {Types} from "mongoose";
import BOOKEDUSERDB from "../../models/userModels/bookingSchema";
import { EventDocument, PaymentData, retryPayment } from "../../dtos/user.dto";
import CATEGORYDB from "../../models/adminModels/adminCategorySchema";

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
async checkSeatAvailable(product: PaymentData) {
  try {
    const socialEvent = await SOCIALEVENTDB.findOne({ eventName: product.eventName });
    if (!socialEvent) {
      return { success: false, message: "Event not found", data: null };
    }
    if(socialEvent?.title!='Virtual'){
  
  
      const selectedEvent = socialEvent.typesOfTickets.find(
        (ticket: any) => ticket.type.toLowerCase() === product.type
      );
  
      if (!selectedEvent) {
        return { success: false, message: "Ticket type not found", data: null };
      }
  
      if (!selectedEvent.noOfSeats || selectedEvent.noOfSeats <= 0 || selectedEvent.noOfSeats<product.noOfPerson) {
        return { success: false, message: "No seats available", data: null };
      }

    }
    return { success: true, message: "Seats available", data: { seatsRemaining:null} };

  } catch (error) {
    console.error("Error in checkSeatAvailable:", error);
    throw new Error("Failed to check seat availability.");
  }
}
async updateBookingData(product:PaymentData){
   const existingBooking = await BOOKEDUSERDB.findById(product.bookingId);
    console.log("Existing booking found:", existingBooking);

    if (!existingBooking) {
      return { success: false, message: "Booking not found"};
    }
        existingBooking.bookingDate = new Date();
    existingBooking.totalAmount = product.Amount||product.amount;
    existingBooking.NoOfPerson = product.noOfPerson;
    if (!existingBooking.ticketDetails) {
      existingBooking.ticketDetails = { Included: [], notIncluded: [], type: undefined };
    }
    
    existingBooking.ticketDetails.type = product.type || undefined;
    existingBooking.ticketDetails.Included = product.Included || [];
    existingBooking.ticketDetails.notIncluded = product.notIncluded || [];



console.log("Payment",product.bookedEmails,product.bookedMembers);
console.log("Length:",product.bookedEmails.length,product.bookedMembers.length);
    if (
      Array.isArray(product.bookedMembers) &&
      Array.isArray(product.bookedEmails) &&
      product.bookedMembers.length === product.bookedEmails.length
    ) {
      console.log("Black");
      for (let i = 0; i < product.bookedMembers.length; i++) {
        console.log(product.bookedMembers[i],product.bookedEmails[i]);
        existingBooking.bookedUser.push({
         
          user: product.bookedMembers[i],
          email: product.bookedEmails[i],
          isParticipated: false,
        });
      }
    }
    


    

    const uniqueIncluded = new Set(product.Included || []);
    const uniqueNotIncluded = new Set(product.notIncluded || []);
    
    existingBooking.ticketDetails.Included = Array.from(uniqueIncluded);
    existingBooking.ticketDetails.notIncluded = Array.from(uniqueNotIncluded);
    
    const updatedBooking = await existingBooking.save();
    return {success:true,message:'Saved Booked User Data'};
}
async checkRetrySeatAvailable(product: retryPayment) {
  try {
    const socialEvent = await SOCIALEVENTDB.findOne({ eventName: product.eventName });
    if (!socialEvent) {
      return { success: false, message: "Event not found", data: null };
    }
    if(socialEvent?.title!='Virtual'){
  
  
      const selectedEvent = socialEvent.typesOfTickets.find(
        (ticket: any) => ticket.type.toLowerCase() === product.type
      );
  
      if (!selectedEvent) {
        return { success: false, message: "Ticket type not found", data: null };
      }
  
      if (!selectedEvent.noOfSeats || selectedEvent.noOfSeats <= 0 || selectedEvent.noOfSeats<product.noOfPerson) {
        return { success: false, message: "No seats available", data: null };
      }

    }
    return { success: true, message: "Seats available", data: { seatsRemaining:null} };

  } catch (error) {
    console.error("Error in checkSeatAvailable:", error);
    throw new Error("Failed to check seat availability.");
  }
}
  async getCategoryBasedRepo(postId: string) {
    try {
      console.log("Id of category:", postId);

      // Fetch category and populate Events as full objects
      const category = await CATEGORYDB.findById(postId).populate<{ Events: EventDocument[] }>("Events");

      if (!category) {
        return {
          success: false,
          message: "Category not found.",
          category: null,
        };
      }

      console.log("Category details:", category);

      // Filter events that have a valid endDate
      const now = Date.now();
      let filteredEvents = category.Events.filter(event => new Date(event.startDate).getTime() >= now);
      

      console.log("First", filteredEvents);
      filteredEvents = filteredEvents.map(event => {
        if (event.offer && new Date(event.offer.endDate) < new Date()) {
            console.log(`Offer expired for event: ${event.endDate}`);
            event.offer = null; 
        }
        return event;
    });

      console.log("Main Events", filteredEvents);

      return {
        success: true,
        message: "Category details retrieved successfully.",
        category: {
          ...category.toObject(),
          Events: filteredEvents, 
        },
      };
    } catch (error) {
      console.error("Error retrieving category details:", error);
      return {
        success: false,
        message: "An error occurred while retrieving category details.",
        category: null,
      };
    }
  }

}