import { Router } from "express";
import { MultiVerifierController } from "../../controllers/verifierControllers/multiVerifierController";
import container from "../../inversify/container";
import verifyToken from "../../middlewares/verifyToken.middleware";
const verifierRoute=Router();
const verifierController=container.get<MultiVerifierController>(MultiVerifierController)



verifierRoute.get('/checkVerifierHaveAccount/:email',verifierController.checkVerifierHaveAccount);
verifierRoute.get('/resendOTP/:email',verifierController.sendResendOTP);
verifierRoute.get('/verifyOtp/:enteredOtp/:email',verifierController.verifyOTP);
verifierRoute.post('/verifierLogin',verifierController.postVerifierLogin);
verifierRoute.post('/refresh-token',verifierController.reGenerateVerifierAccessToken);
verifierRoute.get('/fetchEvents/:email',verifyToken(['verifier']),verifierController.getAllCompanyEvents);
verifierRoute.get('/fetchBookedDetails/:eventId',verifyToken(['verifier']),verifierController.getBookedDetails);
verifierRoute.get('/fetchSingleUser/:bookedId/:userName',verifyToken(['verifier']),verifierController.getSingleUserData);
verifierRoute.get('/markUserEntry/:bookedId/:userName',verifyToken(['verifier']),verifierController.markUserEntry);

export default verifierRoute;



