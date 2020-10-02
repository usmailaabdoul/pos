const baseUrl = '/report'
export default class ReportApi {
    constructor(api) {
        this.api = api
    }
    async sales(start, end, itemId, categoryId, rangeType) {
        try {
            let res = await this.api.get(`${baseUrl}/sales?start=${start}&end=${end}&itemId=${itemId}&categoryId=${categoryId}&rangeType=${rangeType}`)
            return res.data
        } catch (e) {
            throw e
        }
    }

    async profit(start, end, itemId, categoryId) {
        try {
            let res = await this.api.get(`${baseUrl}/profit?start=${start}&end=${end}&itemId=${itemId}&categoryId=${categoryId}`)
            return res.data
        } catch (e) {
            throw e
        }
    }

    async stats(start, end) {
        try {
            let res = await this.api.get(`${baseUrl}/stats?start=${start}&end=${end}`)
            return res.data
        } catch (e) {
            throw e
        }
    }

    async bestSelling(start, end) {
        try {
            let res = await this.api.get(`${baseUrl}/best?start=${start}&end=${end}`)
            return res.data
        } catch (e) {
            throw e
        }
    }

    async worstSelling(start, end) {
        try {
            let res = await this.api.get(`${baseUrl}/best?start=${start}&end=${end}`)
            return res.data
        } catch (e) {
            throw e
        }
    }

}