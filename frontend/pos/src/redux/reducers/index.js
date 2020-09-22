import { combineReducers } from 'redux';

import categoryReducer from './categoryReducer';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({
  category: categoryReducer,
  token: tokenReducer,
});

export default rootReducer;