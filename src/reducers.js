import { combineReducers } from 'redux';

import commonReducer from './pages/common/duck/reducers';


const rootReducer = combineReducers({
    common: commonReducer
});

export default rootReducer;
