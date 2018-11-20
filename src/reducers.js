import { combineReducers } from 'redux';

import commonReducer from './pages/common/duck/reducers';
import layoutReducer from './pages/layout/duck/reducers';


const rootReducer = combineReducers({
    common: commonReducer,
    layout: layoutReducer
});

export default rootReducer;
