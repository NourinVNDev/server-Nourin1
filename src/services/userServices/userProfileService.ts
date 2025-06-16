import { injectable,inject } from "inversify";
import { IUserProfileService } from "../../interfaces/userInterfaces/serviceInterfaces/IUserProfileService";
import TYPES from "../../inversify/types";
import { IUserProfileRepo } from "../../interfaces/userInterfaces/repositoryInterfaces/IUserProfileRepo";
@injectable()
export class UserProfileService implements IUserProfileService{
    constructor(
           @inject(TYPES.IUserProfileRepo) private _userProfileRepo:IUserProfileRepo
    ){}
    
 

}