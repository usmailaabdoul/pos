const baseUrl = '/role'
export default class CategoryApi {
  constructor(api) {
    this.api = api
  }
  async roles() {
    try {
      let res = await this.api.get(`${baseUrl}/`)
      return res.data
    } catch (e) {
      throw e
    }
  }
}