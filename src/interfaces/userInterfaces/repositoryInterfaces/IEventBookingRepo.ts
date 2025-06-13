export interface IEventBookingRepo{
       postHandleLikeRepo(index:string,userId:string,postId:string):Promise<{result:any}> 
       getPostDetailsRepo(postId:string):Promise<{singleEvent:any}>
        getBookedEventRepo(bookingId:string):Promise<{singleEvent:any}>

}