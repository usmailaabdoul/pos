
import AuthApi from "./auth";
import {getApi} from './axios'
import CategoryApi from './category'
import RoleApi from './role';

class Apis {
    initialize(token) {
        this.token = token
        this.api = getApi(this.token)
        
        this.authApi = new AuthApi(this.api)
        this.categoryApi = new CategoryApi(this.api)
        this.roleApi = new RoleApi(this.api)
    }

}

let apis = new Apis()
export default apis