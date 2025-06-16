import { injectable,inject } from "inversify";
import TYPES from "../../inversify/types";
import { IUserProfileService } from "../../interfaces/userInterfaces/serviceInterfaces/IUserProfileService";

@injectable()
export class UserProfileController{
    constructor(
        @inject(TYPES.IUserProfileService) private _userProfileService:IUserProfileService
    ){}
    

}