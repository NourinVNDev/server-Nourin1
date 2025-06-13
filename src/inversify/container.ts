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

container.bind<IUserLoginService>(TYPES.IUserLoginService).to(UserLoginService);
container.bind<IUserLoginRepo>(TYPES.IUserLoginRepo).to(UserLoginRepository);
container.bind<UserLoginController>(UserLoginController).toSelf();

container.bind<IEventBookingService>(TYPES.IEventBookingService).to(EventBookingService);
container.bind<IEventBookingRepo>(TYPES.IEventBookingRepo).to(EventBookingRepository);
container.bind<EventBookingController>(EventBookingController).toSelf();


export default container;