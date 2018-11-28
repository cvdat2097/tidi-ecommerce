import { product, industry } from './Datasource';


export default {
    Product: {
        getAll: () => {
            return new Promise((resolve, reject) => {
                const products = [...product];


                resolve(JSON.stringify({ products, totalItems: products.length }));
            });
        },

        getSome: (offset, limit) => {
            return new Promise((resolve, reject) => {

                const products = [...product].slice(Number(offset), Number(offset) + Number(limit));


                resolve(JSON.stringify({ products, totalItems: product.length }));
            });
        },

        getOne: (id) => {
            return new Promise((resolve, reject) => {
                const prd = product[Number(id)];

                // prd.category = category[prd.category_id];
                // prd.brand = brand[prd.brand_id];
                // prd.branch = branch[prd.branch_id];
                // prd.industry = industry[prd.industry_id];

                resolve(JSON.stringify(prd));
            });
        },

        add: (prd) => {
            return new Promise((resolve, reject) => {
                product.push(prd);

                resolve(true);
            });
        },

        getAllIndustries() {
            return new Promise((resolve, reject) => {

                resolve(industry);

            });
        }
    },

    CART: {
        getCart: () => {
            return new Promise((resolve, reject) => {
                const cart = [
                    {
                        product: product[0],
                        amount: 2
                    },
                    {
                        product: product[1],
                        amount: 5
                    },
                    {
                        product: product[0],
                        amount: 1
                    }
                ];

                resolve(JSON.stringify([...cart, ...cart]));
            });
        }
    },


};
