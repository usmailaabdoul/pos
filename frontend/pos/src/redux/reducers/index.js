import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import employeeReducer from './employeeReducer';
import authReducer from './authReducer';
import roleReducer from './roleReducers'

const rootReducer = combineReducers({
  category: categoryReducer,
  employee: employeeReducer,
  auth: authReducer,
  role: roleReducer
});

export default rootReducer;