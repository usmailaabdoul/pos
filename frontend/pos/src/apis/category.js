const baseUrl = '/category'
export default class CategoryApi {
  constructor(api) {
    this.api = api
  }
  async getAllCategories() {
    try {
      let res = await this.api.get(`${baseUrl}`)
      return res.data
    } catch (e) {
      throw e
    }
  }
  async addCategory(name) {
    try {
      let res = await this.api.post(`${baseUrl}`, name)
      return res.data
    } catch (e) {
      throw e
    }
  }
  async deleteCategory(id) {
    try {
      let res = await this.api.delete(`${baseUrl}/${id}`)
      return res.data
    } catch (e) {
      throw e
    }
  }
  async editCategory(id, name) {
    try {
      let res = await this.api.put(`${baseUrl}/${id}`, name)
      return res.data
    } catch (e) {
      throw e
    }
  }
}