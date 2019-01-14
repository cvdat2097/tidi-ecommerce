import Types from './types';

const fetchIndustries = (payload) => ({
    type: Types.FETCH_INDUSTRIES,
    payload
});

const switchIndustryHover = (payload) => ({
    type: Types.HOVER_INDUSTRY_CHANGE,
    payload
});

const showNotification = ({
    message,
    type
}) => ({
    type: Types.SHOW_NOTIFICATION,
    payload: {
        message,
        type
    }
})

export default {
    fetchIndustries,
    switchIndustryHover,
    showNotification
};