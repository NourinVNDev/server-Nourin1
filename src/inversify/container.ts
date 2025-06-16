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





export default container;