import { Container} from "inversify";
import { UserLoginService } from "../services/userServices/loginService";
import { IUserLoginService } from "../interfaces/userInterfaces/serviceInterfaces/IUserLoginService";
import { UserLoginController } from "../controllers/userControllers/loginController";
const container=new Container();
import TYPES from "./types";
import { IUserLoginRepo } from "../interfaces/userInterfaces/repositoryInterfaces/IUserLoginRepo";
import { UserLoginRepository } from "../repositories/userRepository/loginRepository";
import { IEventBookingService } from "../interfaces/userInterfaces/serviceInterfaces/IEventBookingService";
import { EventBookingService } from "../services/userServices/eventBookingService";
import { IEventBookingRepo } from "../interfaces/userInterfaces/repositoryInterfaces/IEventBookingRepo";
import { EventBookingRepository } from "../repositories/userRepository/eventBookingRepository";
import { EventBookingController } from "../controllers/userControllers/eventBookingController";
import { IStripeService } from "../interfaces/userInterfaces/serviceInterfaces/IStripeService";
import { StripePaymentService } from "../services/userServices/stripePaymentService";
import { IStripeRepo } from "../interfaces/userInterfaces/repositoryInterfaces/IStripeRepo";
import { StripePaymentRepository } from "../repositories/userRepository/stripePaymentRepository";
import { StripePaymentController } from "../controllers/userControllers/stripePaymentController";
import { UserProfileService } from "../services/userServices/userProfileService";
import { IUserProfileService } from "../interfaces/userInterfaces/serviceInterfaces/IUserProfileService";
import { IUserProfileRepo } from "../interfaces/userInterfaces/repositoryInterfaces/IUserProfileRepo";
import { UserProfileRepository } from "../repositories/userRepository/userProfileRepository";
import { UserProfileController } from "../controllers/userControllers/userProfileController";
import { IRetryEventService } from "../interfaces/userInterfaces/serviceInterfaces/IRetryEventPaymentService";
import { RetryEventPaymentService } from "../services/userServices/retryPendingEventService";
import { IRetryEventRepo } from "../interfaces/userInterfaces/repositoryInterfaces/IRetryEventPaymentRepo";
import { RetryEventPaymentRepo } from "../repositories/userRepository/retryPendingEventRepository";
import { RetryEventPaymentController } from "../controllers/userControllers/retryPendingEventController";
import { INotificationVideoCallService } from "../interfaces/userInterfaces/serviceInterfaces/INotificationVideoCallService";
import { NotificationVideoCallService } from "../services/userServices/notificationVideoCallService";
import { INotificationVideoCallRepo } from "../interfaces/userInterfaces/repositoryInterfaces/INotificationVideoCallRepo";
import { NOtificationVideoCallRepository } from "../repositories/userRepository/notificationVideoCallRepository";
import { NotificationVideoCallController } from "../controllers/userControllers/notificationVideoCallController";
import { IMultiVerifierService } from "../interfaces/verifierInterfaces/serviceInterfaces/IMultiVerifierService";
import { MultiVerifierService } from "../services/verifierServices/multiVerifierService";
import { IMultiVerifierRepo } from "../interfaces/verifierInterfaces/repositoryInterfaces/IMultiVerifierRepo";
import { MultiVerifierRepo } from "../repositories/verifierRepository/multiVerifierRepository";
import { MultiVerifierController } from "../controllers/verifierControllers/multiVerifierController";
import { IAdminLoginService } from "../interfaces/adminInterfaces/serviceInterfaces/adminLoginService";
import { AdminLoginService } from "../services/adminServices/adminLoginService";
import { IAdminLoginRepo } from "../interfaces/adminInterfaces/repositoryInterfaces/adminLoginRepo";
import { AdminLoginRepository } from "../repositories/adminRepository/adminLoginRepository";
import { AdminLoginController } from "../controllers/adminControllers/loginController";
//user
container.bind<IUserLoginService>(TYPES.IUserLoginService).to(UserLoginService);
container.bind<IUserLoginRepo>(TYPES.IUserLoginRepo).to(UserLoginRepository);
container.bind<UserLoginController>(UserLoginController).toSelf();

container.bind<IEventBookingService>(TYPES.IEventBookingService).to(EventBookingService);
container.bind<IEventBookingRepo>(TYPES.IEventBookingRepo).to(EventBookingRepository);
container.bind<EventBookingController>(EventBookingController).toSelf();

container.bind<IStripeService>(TYPES.IStripeService).to(StripePaymentService);
container.bind<IStripeRepo>(TYPES.IStripeRepo).to(StripePaymentRepository);
container.bind<StripePaymentController>(StripePaymentController).toSelf();

container.bind<IUserProfileService>(TYPES.IUserProfileService).to(UserProfileService);
container.bind<IUserProfileRepo>(TYPES.IUserProfileRepo).to(UserProfileRepository);
container.bind<UserProfileController>(UserProfileController).toSelf();

container.bind<IRetryEventService>(TYPES.IRetryEventService).to(RetryEventPaymentService);
container.bind<IRetryEventRepo>(TYPES.IRetryEventRepo).to(RetryEventPaymentRepo);
container.bind<RetryEventPaymentController>(RetryEventPaymentController).toSelf();

container.bind<INotificationVideoCallService>(TYPES.INotificationVideoCallService).to(NotificationVideoCallService);
container.bind<INotificationVideoCallRepo>(TYPES.INotificationVideoCallRepo).to(NOtificationVideoCallRepository);
container.bind<NotificationVideoCallController>(NotificationVideoCallController).toSelf();

//verifier
container.bind<IMultiVerifierService>(TYPES.IMultiVerifierService).to((MultiVerifierService));
container.bind<IMultiVerifierRepo>(TYPES.IMultiVerifierRepo).to(MultiVerifierRepo);
container.bind<MultiVerifierController>(MultiVerifierController).toSelf();

//admin
container.bind<IAdminLoginService>(TYPES.IAdminLoginService).to(AdminLoginService);
container.bind<IAdminLoginRepo>(TYPES.IAdminLoginRepo).to(AdminLoginRepository);
container.bind<AdminLoginController>(AdminLoginController).toSelf();





export default container;