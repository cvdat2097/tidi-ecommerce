import { combineReducers } from 'redux';

import commonReducer from './pages/common/duck/reducers';
import layoutReducer from './pages/layout/duck/reducers';
import productsReducer from './pages/products/duck/reducers';


const rootReducer = combineReducers({
    common: commonReducer,
    layout: layoutReducer,
    products: productsReducer
});

export default rootReducer;
