export interface IEventBookingService{
        posthandleLikeService(index:string,userId:string,postId:string):Promise<{result:any}>
        handlePostDetailsService(postId:string):Promise<{result:any}>;
            getBookedEventService(bookingId:string):Promise<{result:any}>;

}