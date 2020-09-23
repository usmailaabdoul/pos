import { combineReducers } from 'redux';

import categoryReducer from './categoryReducer';
import employeeReducer from './employeeReducer';

const rootReducer = combineReducers({
  category: categoryReducer,
  employee: employeeReducer,
});

export default rootReducer;