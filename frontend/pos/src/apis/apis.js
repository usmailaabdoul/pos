
import AuthApi from "./auth";
import {getApi} from './axios'
import CategoryApi from './category'

class Apis {
    initialize(token) {
        this.token = token
        this.api = getApi(this.token)
        
        this.authApi = new AuthApi(this.api)
        this.categoryApi = new CategoryApi(this.api)
    }

}

let apis = new Apis()
export default apis