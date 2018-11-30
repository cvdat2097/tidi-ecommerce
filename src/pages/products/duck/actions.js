import Types from './types';

const fetchProducts = (products) => ({
    type: Types.FETCH_PRODUCTS,
    payload: products
});

const updateCategoryList = (cats) => ({
    type: Types.FETCH_CATEGORIES,
    payload: cats
});

const fetchBranches = (branches) => ({
    type: Types.FETCH_BRANCHES,
    payload: branches
})

export default {
    fetchProducts,
    updateCategoryList,
    fetchBranches
};
