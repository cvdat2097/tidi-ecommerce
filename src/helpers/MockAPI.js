import { product, category, branch, brand, industry } from './Datasource';


export default {
    Product: {
        getAll: () => {
            return new Promise((resolve, reject) => {
                const products = [...product];

                products.forEach((prd) => {
                    prd.category = category[prd.category_id];
                    prd.brand = brand[prd.brand_id];
                    prd.branch = branch[prd.branch_id];
                    prd.industry = industry[prd.industry_id];
                });

                resolve(JSON.stringify({ products, totalItems: products.length }));
            });
        },

        getSome: (offset, limit) => {
            return new Promise((resolve, reject) => {
                
                const products = [...product].slice(Number(offset), Number(offset) + Number(limit));


                products.forEach((prd) => {
                    prd.category = category[prd.category_id];
                    prd.brand = brand[prd.brand_id];
                    prd.branch = branch[prd.branch_id];
                    prd.industry = industry[prd.industry_id];
                });

                resolve(JSON.stringify({ products, totalItems: product.length }));
            });
        },

        add: (prd) => {
            return new Promise((resolve, reject) => {
                product.push(prd);

                resolve(true);
            });
        }
    }
};
