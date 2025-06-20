import { Router } from "express";
import container from "../../inversify/container";
import { AdminLoginController } from "../../controllers/adminControllers/loginController";
import verifyToken from "../../middlewares/verifyToken.middleware";
import { AdminCategoryController } from "../../controllers/adminControllers/categoryController";
import { AdminOfferController } from "../../controllers/adminControllers/offerController";


const adminLoginController=container.get<AdminLoginController>(AdminLoginController);
const adminCategoryController=container.get<AdminCategoryController>(AdminCategoryController);
const adminOfferController=container.get<AdminOfferController>(AdminOfferController);

const adminRoute=Router();
adminRoute.post('/adminlogin',adminLoginController.createAdminData);
adminRoute.post('/adminlogin1',adminLoginController.adminLogin);
adminRoute.get('/admin/users',verifyToken(['admin']),adminLoginController.getUserDetails);
adminRoute.get('/admin/managers',verifyToken(['admin']),adminLoginController.getManagerDetails);

adminRoute.get('/admin/managerEvents/:managerId',verifyToken(['admin']),adminLoginController.getEventAndBookedDetails);
adminRoute.post('/admin/toggleIsBlock',verifyToken(['admin']),adminLoginController.postToggleIsBlock);
adminRoute.post('/admin/managerIsBlock',verifyToken(['admin']),adminLoginController.postManagerIsBlock);
adminRoute.get('/admin/fetchAdminWallet',verifyToken(['admin']),adminLoginController.getAdminWalletDetails);
adminRoute.post('/refresh-token',adminLoginController.reGenerateAdminAccessToken);
adminRoute.post('/admin/categoryIsBlock',verifyToken(['admin']),adminLoginController.postCategoryIsBlock);

adminRoute.get('/admin/fetchUserManagerCount',verifyToken(['admin']),adminLoginController.fetchAdminDashboardData);
adminRoute.get(`/fetchDashboardGraphData/:selectedType/:selectedTime`,verifyToken(['admin']),adminLoginController.fetchDashboardGraph);
adminRoute.get(`/fetchDashboardPieChart`,verifyToken(['admin']),adminLoginController.fetchDashboardPieChart);
adminRoute.get(`/fetchDashboardBarChart/:selectedEvent`,verifyToken(['admin']),adminLoginController.fetchDashboardBarChart);

adminRoute.get('/admin/category',verifyToken(['admin']),adminCategoryController.getCategoryDetails);
adminRoute.post('/admin/addCategory',verifyToken(['admin']),adminCategoryController.addEventCategoryDetails);
adminRoute.get('/admin/fetchSelectedCategory/:id',verifyToken(['admin']),adminCategoryController.fetchSelectedCategory);
adminRoute.post('/admin/editSingleCategory/:categoryId',verifyToken(['admin']),adminCategoryController.editSelectedCategory);

adminRoute.post('/addNewOffer',verifyToken(['admin']),adminOfferController.createNewOffer);
adminRoute.get('/getOffers',verifyToken(['admin']),adminOfferController.getAllOffers);
adminRoute.get('/getSelectedOffer/:offerId',verifyToken(['admin']),adminOfferController.getSelectedOfferDetails);
adminRoute.post('/updateOffer',verifyToken(['admin']),adminOfferController.updateOfferDetails);


export default adminRoute;
