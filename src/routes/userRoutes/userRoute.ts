import express from "express";
import { UserLoginController } from "../../controllers/userControllers/loginController";
import container from '../../inversify/container';
import { EventBookingController } from "../../controllers/userControllers/eventBookingController";
import { UserProfileController } from "../../controllers/userControllers/userProfileController";
import multer from 'multer';
import { RetryEventPaymentController } from "../../controllers/userControllers/retryPendingEventController";
import { NotificationVideoCallController } from "../../controllers/userControllers/notificationVideoCallController";
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

const userLoginController=container.get<UserLoginController>(UserLoginController);
const eventBookingController=container.get<EventBookingController>(EventBookingController);
const userProfileController=container.get<UserProfileController>(UserProfileController);
const retryEventPaymentController=container.get<RetryEventPaymentController>(RetryEventPaymentController);
const notificationVideoCallController=container.get<NotificationVideoCallController>(NotificationVideoCallController);


router.get('/fetchEventData',userLoginController.getAllEventData);
router.post('/login',userLoginController.loginDetails);
router.post('/submit',userLoginController.postUserDetails);
router.post('/verifyOtp',userLoginController.verifyOTP);
router.post('/resendOtp',userLoginController.resendOtp);
router.post('/googleAuth',userLoginController.googleAuth);
router.post('/forgotEmail',userLoginController.forgotPassword);
router.post('/verifyForgotOtp',userLoginController.verifyForgotOtp);
router.post('/resetPassword',userLoginController.resetPassword)
router.get('/getAllCategoryDetails',userLoginController.getAllCategoryDetails)
router.get('/profile/:userId',userLoginController.setProfileDetails);
router.post('/changeUserProfile',userLoginController.changeUserProfileDetails);
router.post('/refresh-token',userLoginController.reGenerateAccessToken);
router.get('/user/events/:category',userLoginController.getCategoryTypeDetails);
router.get('/post/getAllEventData',userLoginController.getAllEventDetails);
router.get('/generateOtpForResetPassword/:userId',userLoginController.generateOtpForPassword);
router.post('/verifyOtpForPassword',userLoginController.verifyOtpForPassword);
router.post('/handleResetPassword',userLoginController.handleResetPassword);
router.get(`/post/checkOfferAvailable/:category`,userLoginController.checkOfferAvailable)

router.post('/post/handleLike', eventBookingController.handleLikeForPost);
router.get('/post/handleDetails/:postId',eventBookingController.getPostDetails);
router.get('/post/getSelectEvent/:id',eventBookingController.getSelectedEventDetails);
router.post('/post/create-checkout-session',eventBookingController.makePaymentStripe);
router.post('/retryPayment-checkout-session',eventBookingController.makerRetryPayment);
router.get('/post/getSelectedEventData/:postId',eventBookingController.getAnEventDetails);
router.post(`/saveBillingDetails`,eventBookingController.saveBillingDetails);
router.post('/saveRetryBillingDetails',eventBookingController.saveRetryBillingDetails);
router.post(`/updatePaymentStatus/:bookedId`,eventBookingController.updateBookedEventPaymentStatus);
router.get('/getSelectedBookingData/:bookingId',eventBookingController.fetchSavedBookingdata);
router.get('/checkIfUserValid/:email/:eventName/:bookedId',eventBookingController.checkIfUserValid);



router.get(`/getExistingReview/:eventId/:userId`,userProfileController.getExistingReviews);
router.post('/review-rating',userProfileController.postReviewAndRating);
router.get('/getEventHistory/:userId',userProfileController.getEventHistoryDetails);
router.get('/getManagerName',userProfileController.getBookedManagerDetails);
router.get('/getBookedEvent/:userId',userProfileController.getEventBookedDetails);
router.post('/create-chatSchema',userProfileController.createChatSchema);
router.post(`/uploadUserProfile/:userId`,upload.single('profilePicture'),userProfileController.uploadUserProfilePicture);


router.get('/cancelEventBooking/:bookingId/:userId',retryEventPaymentController.cancelBookingEvent);
router.get('/fetchUserWallet/:userId',retryEventPaymentController.fetchUserWallet);

router.get('/fetchUserNotification/:userId',notificationVideoCallController.fetchUserNotification);
router.get('/fetchNotificationCount/:userId',notificationVideoCallController.fetchNotificationCount);
















export default router ;
