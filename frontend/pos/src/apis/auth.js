const baseUrl = '/auth'
export default class AuthApi {
    constructor(api) {
        this.api = api
    }
    async login(obj) {
        try{
            let res = await this.api.post(`${baseUrl}/login`, obj)
            return res.data
        }catch(e){
            throw  e
        }
    }
}