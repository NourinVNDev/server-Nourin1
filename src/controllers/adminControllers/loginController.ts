import { injectable,inject } from "inversify";
import TYPES from "../../inversify/types";
import { IAdminLoginService } from "../../interfaces/adminInterfaces/serviceInterfaces/adminLoginService";
@injectable()
export class AdminLoginController{
    constructor(
        @inject(TYPES.IAdminLoginService) private _adminLoginService:IAdminLoginService
    ){}

}