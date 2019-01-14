import Types from './types';

const INITIAL_STATE = {
    Header: {
        industries: [],
        currentIndustry: {},
        notificationMessage: '',
        notificationType: '',
    },
    Footer: {}
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

        case Types.SHOW_NOTIFICATION:
            return {
                ...state,
                Header: {
                    ...state.Header,
                    notificationMessage: action.payload.message,
                    notificationType: action.payload.type
                }
            };


        default:
            return state;
    }
}

export default layoutReducer;