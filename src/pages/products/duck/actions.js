import Types from './types';

const fetchProducts = (products) => ({
    type: Types.FETCH_PRODUCTS,
    payload: products
});

export default {
    fetchProducts
};
