import { product, category, branch, brand, industry } from './Datasource';


export default {
    Product: {
        getAll: () => {
            return new Promise((resolve, reject) => {
                const products = [...product];

                products.map((prd) => {
                    prd.category = category[prd.category_id];
                    prd.brand = brand[prd.brand_id];
                    prd.branch = branch[prd.branch_id];
                    prd.industry = industry[prd.industry_id];

                    return prd;
                });

                resolve(JSON.stringify(products));
            });
        }
    }
};
