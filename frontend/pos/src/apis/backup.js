const baseUrl = '/backup'
export default class BackupApi {
    constructor(api) {
        this.api = api
    }
    async latest() {
        try {
            let res = await this.api.get(`${baseUrl}/latest`)
            return res.data
        } catch (e) {
            throw e
        }
    }
    async create() {
        try {
            let res = await this.api.post(`${baseUrl}/`)
            return res.data
        } catch (e) {
            throw e
        }
    }
}