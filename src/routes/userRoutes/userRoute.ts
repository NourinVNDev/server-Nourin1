import express from "express";
import { UserLoginController } from "../../controllers/userControllers/loginController";
import container from '../../inversify/container';
import { EventBookingController } from "../../controllers/userControllers/eventBookingController";
const router = express.Router();

const userLoginController=container.get<UserLoginController>(UserLoginController);
const eventBookingController=container.get<EventBookingController>(EventBookingController)


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

router.post('/post/handleLike', eventBookingController.handleLikeForPost);
router.get('/post/handleDetails/:postId',eventBookingController.getPostDetails);
router.get('/post/getSelectEvent/:id',eventBookingController.getSelectedEventDetails);








export default router ;
