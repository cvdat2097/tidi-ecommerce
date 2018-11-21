import { combineReducers } from 'redux';

import commonReducer from './pages/common/duck/reducers';
import layoutReducer from './pages/layout/duck/reducers';
import productsReducer from './pages/products/duck/reducers';
import checkoutReducer from './pages/checkout/duck/reducers';
import adminReducer from './pages/admin/duck/reducers';


const rootReducer = combineReducers({
    common: commonReducer,
    layout: layoutReducer,
    products: productsReducer,
    checkout: checkoutReducer,
    admin: adminReducer
});

export default rootReducer;
