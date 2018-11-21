import { combineReducers } from 'redux';

import commonReducer from './pages/common/duck/reducers';
import layoutReducer from './pages/layout/duck/reducers';
import productsReducer from './pages/products/duck/reducers';
import checkoutReducer from './pages/checkout/duck/reducers';


const rootReducer = combineReducers({
    common: commonReducer,
    layout: layoutReducer,
    products: productsReducer,
    checkout: checkoutReducer
});

export default rootReducer;
