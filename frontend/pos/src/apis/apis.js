import AuthApi from "./auth";
import { getApi } from "./axios";
import CategoryApi from "./category";
import RoleApi from "./role";
import ItemApi from "./item";

class Apis {
  initialize(token) {
    this.token = token;
    this.api = getApi(this.token);

    this.authApi = new AuthApi(this.api);
    this.categoryApi = new CategoryApi(this.api);
    this.roleApi = new RoleApi(this.api);
    this.itemApi = new ItemApi(this.api);
  }
}

let apis = new Apis();
export default apis;
