import { Router } from "express";
import { checkIfManagerBlocked } from "../../middlewares/managerIsBlock.middleware";
import verifyToken from "../../middlewares/verifyToken.middleware";
import container from "../../inversify/container";
import { ManagerLoginController } from "../../controllers/managerControllers/loginController";
import { ManagerEventController } from "../../controllers/managerControllers/eventController";
import multer from 'multer';
import { ManagerOfferController } from "../../controllers/managerControllers/offerController";
import { BookingDetailsController } from "../../controllers/managerControllers/bookingDetailsController";
import { Request,Response } from "express";
import { VerifierDetailsController } from "../../controllers/managerControllers/verifierDetailsController";
const upload = multer({ storage: multer.memoryStorage() });
const managerRoute=Router();



const managerLoginController=container.get<ManagerLoginController>(ManagerLoginController);
const managerEventController=container.get<ManagerEventController>(ManagerEventController);
const managerOfferController=container.get<ManagerOfferController>(ManagerOfferController);
const bookingDetailsController=container.get<BookingDetailsController>(BookingDetailsController);
const verifeirDetailsController=container.get<VerifierDetailsController>(VerifierDetailsController);

managerRoute.post('/mSubmit',managerLoginController.managerRegister);
managerRoute.post('/MverifyOtp',managerLoginController.managerVerifyOtp);
managerRoute.post('/Mlogin',managerLoginController.managerLogin);
managerRoute.post('/forgotM',managerLoginController.managerForgotPassword);
managerRoute.post('/verifyForgotOtpM',managerLoginController.managerVerifyOtpForForgot);
managerRoute.post('/resetPasswordM',managerLoginController.managerResetPassword);
managerRoute.get('/manager/getEventType',checkIfManagerBlocked,verifyToken(['manager']),managerLoginController.getEventTypeData);
managerRoute.get('/managerProfile/:companyName',checkIfManagerBlocked,verifyToken(['manager']),managerLoginController.getManagerProfileDetails);
managerRoute.post('/updateManagerData',checkIfManagerBlocked,verifyToken(['manager']),managerLoginController.updateManagerProfile);
managerRoute.post('/changeManagerPassword',checkIfManagerBlocked,verifyToken(['manager']),managerLoginController.updateManagerPassword);
managerRoute.post('/refresh-token',managerLoginController.reGenerateManagerAccessToken);
managerRoute.post('/createEvent',checkIfManagerBlocked,verifyToken(['manager']), upload.single('images'), managerEventController.createEventPost);
managerRoute.post('/createEventSeatDetails/:eventId',checkIfManagerBlocked,verifyToken(['manager']), managerEventController.createEventSeatDetails);
managerRoute.get('/Manager/getAllEventData/:managerId',checkIfManagerBlocked,verifyToken(['manager']), managerEventController.getAllEventDetails);
managerRoute.get('/getPreviousEventDetails/:id',checkIfManagerBlocked,verifyToken(['manager']), managerEventController.getSelectedEventDetails);
managerRoute.get(`/getPreviousTicketDetails/:id`,checkIfManagerBlocked,verifyToken(['manager']), managerEventController.fetchEventTicketDetails);
managerRoute.post('/updateEvent',checkIfManagerBlocked,verifyToken(['manager']),upload.array("images",10), managerEventController.updateEventPost);

managerRoute.get('/getOffers/:managerId',checkIfManagerBlocked,verifyToken(['manager']),managerOfferController.getAllOffers);
managerRoute.post('/addNewOffer',checkIfManagerBlocked,verifyToken(['manager']),managerOfferController.createNewOffer);
managerRoute.get('/getSelectedOffer/:offerId/:managerId',checkIfManagerBlocked,verifyToken(['manager']),managerOfferController.getSelectedOfferDetails);
managerRoute.post('/updateOffer',checkIfManagerBlocked,verifyToken(['manager']),managerOfferController.updateOfferDetails);
managerRoute.get('/searchOfferInput/:inputSearch',checkIfManagerBlocked,verifyToken(['manager']),managerOfferController.getSearchOfferUserInput);
managerRoute.get('/fetchManagerWallet/:managerId',checkIfManagerBlocked,verifyToken(['manager']),managerOfferController.fetchManagerWallet);

managerRoute.get('/fetchManagerNotification/:managerId',checkIfManagerBlocked,verifyToken(['manager']),managerLoginController.fetchManagerNotification);
managerRoute.get(`/fetchEventsName/:companyName`,checkIfManagerBlocked,verifyToken(['manager']),managerLoginController.fetchAllCompanyEvents);
managerRoute.get('/fetchUserCount/:managerId',checkIfManagerBlocked,verifyToken(['manager']),managerLoginController.fetchManagerDashboardData);
managerRoute.get('/fetchDashboardGraphData/:managerId/:selectedType/:selectedTime',checkIfManagerBlocked,verifyToken(['manager']),managerLoginController.fetchDashboardGraph);
managerRoute.get('/fetchDashboardPieChart/:managerId',checkIfManagerBlocked,verifyToken(['manager']),managerLoginController.fetchDashboardPieChart);
managerRoute.get(`/fetchDashboardBarChart/:selectedEvent`,checkIfManagerBlocked,verifyToken(['manager']),managerLoginController.fetchDashboardBarChart);
managerRoute.get('/fetchNotificationCount/:managerId',checkIfManagerBlocked,verifyToken(['manager']),managerLoginController.fetchNotificationCount);
managerRoute.get('/checkIfDateValid',checkIfManagerBlocked,verifyToken(['manager']),managerLoginController.checkDateValidation);
managerRoute.get('/fetchEventNames/:managerId',checkIfManagerBlocked,verifyToken(['manager']),managerLoginController.fetchEventNames);
managerRoute.post('/updateSeatInfo',checkIfManagerBlocked,verifyToken(['manager']),managerEventController.updateSeatInformation);



managerRoute.get('/fetchTodayBooking/:managerId',checkIfManagerBlocked,verifyToken(['manager']),bookingDetailsController.getTodaysBookingDetails);
managerRoute.get('/fetchTotalBooking/:managerId',checkIfManagerBlocked,verifyToken(['manager']),bookingDetailsController.getTotalBookingDetails);
managerRoute.get('/getUserNames',(req: Request, res: Response) => bookingDetailsController.getBookedUserDetails(req, res));
managerRoute.post('/create-chatSchema2',checkIfManagerBlocked,verifyToken(['manager']),bookingDetailsController.createChatSchema);
managerRoute.get('/fetchAllVerifier/:managerName',checkIfManagerBlocked,verifyToken(['manager']),verifeirDetailsController.getAllVerifiers);
managerRoute.get('/updateVerifierStatus/:verifierId',checkIfManagerBlocked,verifyToken(['manager']),verifeirDetailsController.updateVerifierStatus);

managerRoute.post('/addNewVerifier',checkIfManagerBlocked,verifyToken(['manager']),verifeirDetailsController.postNewVerifier);
managerRoute.get(`/fetchVerifierDetails/:verifierId`,checkIfManagerBlocked,verifyToken(['manager']),verifeirDetailsController.getSelectedVerifierData);
managerRoute.post('/updateVerifier',checkIfManagerBlocked,verifyToken(['manager']),verifeirDetailsController.updateVerifierData)



export default managerRoute;



