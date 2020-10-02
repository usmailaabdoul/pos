const baseUrl = '/customer'
export default class CustomerApi {
  constructor(api) {
    this.api = api
  }
  async customers() {
    try {
      let res = await this.api.get(`${baseUrl}/`)
      return res.data
    } catch (e) {
      throw e
    }
  }
  async addCustomer(obj) {
    try {
      let res = await this.api.post(`${baseUrl}/`, obj)
      return res.data
    } catch (e) {
      throw e
    }
  }

  async editCustomer(id, obj) {
    try {
      let res = await this.api.put(`${baseUrl}/${id}`, obj)
      return res.data
    } catch (e) {
      throw e
    }
  }

  async payCustomerDept(id, obj) {
    try {
      let res = await this.api.post(`${baseUrl}/${id}/pay`, obj)
      return res.data
    } catch (e) {
      throw e
    }
  }
}