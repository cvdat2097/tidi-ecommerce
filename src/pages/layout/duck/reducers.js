import Types from './types';

const INITIAL_STATE = {
    Header: {
        industries: [],
        currentIndustry: {}
    },
    Footer: {
    }
}

const layoutReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.FETCH_INDUSTRIES:
            return {
                ...state,
                Header: {
                    ...state.Header,
                    industries: action.payload
                }
            };

        case Types.HOVER_INDUSTRY_CHANGE:
            return {
                ...state,
                Header: {
                    ...state.Header,
                    currentIndustry: action.payload
                }
            };


        default:
            return state;
    }
}

export default layoutReducer;
