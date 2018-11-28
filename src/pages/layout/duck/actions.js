import Types from './types';

const fetchIndustries = (payload) => ({
    type: Types.FETCH_INDUSTRIES,
    payload
});

const switchIndustryHover = (payload) => ({
    type: Types.HOVER_INDUSTRY_CHANGE,
    payload
});

export default {
    fetchIndustries,
    switchIndustryHover
};
