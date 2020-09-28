import { combineReducers } from 'redux';
import itemReducer from './itemsReducer';
import categoryReducer from './categoryReducer';
import employeeReducer from './employeeReducer';
import authReducer from './authReducer';
import roleReducer from './roleReducers'

const rootReducer = combineReducers({
    category: categoryReducer,
    employee: employeeReducer,
    auth: authReducer,
    role: roleReducer,
    item: itemReducer,

});

export default rootReducer;