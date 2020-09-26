import { combineReducers } from 'redux';
import itemReducer from './itemsReducer';
import categoryReducer from './categoryReducer';
import employeeReducer from './employeeReducer';

const rootReducer = combineReducers({
    item: itemReducer,
    category: categoryReducer,
    employee: employeeReducer,
});

export default rootReducer;