import { combineReducers } from 'redux';

import categoryReducer from './categoryReducer';
import employeeReducer from './employeeReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  category: categoryReducer,
  employee: employeeReducer,
  auth: authReducer,
});

export default rootReducer;